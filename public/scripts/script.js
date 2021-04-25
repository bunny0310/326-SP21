const redirect = (url) => {
    window.location = url;
};

const loading = "<span class=\"spinner-border spinner-border-sm loading\"></span>";
const validateLogin = () => {
    $("button#login-button").prepend(loading);
    const formData = formatData($("form#login-form"));
    const failureFunction = (xhr) => {
        const msg = JSON.parse(xhr.responseText).msg;
        flash(msg, 2250, "error");
    };

    const successFunction = (data) => {
        post('auth', formData, (data) => {
            window.localStorage.setItem("PM-326-authToken", data.msg);
            redirect(site + 'dashboard');
        }, failureFunction);
    };

    post('validate/login', formData, successFunction, failureFunction);
    return false;
};

const validateRegister = () => {
    $("button#register-button").prepend(loading);
    const formData = formatData($("form#register-form"));
    const failureFunction = (xhr) => {
        const msg = JSON.parse(xhr.responseText).msg;
        flash(msg, 2250, "error");
    };

    const successFunction = (data) => {
        post('register', formData, (data) => {
            flash("Success! Redirecting to the login page....", 2250, "success");
            setTimeout(() => { redirect(site + 'login') }, 2250);
        }, failureFunction);
    };
    post('validate/register', formData, successFunction, failureFunction);
    return false;
};

const validateCreateProject = () => {
    $("button#create-project-button").prepend(loading);
    let formData = formatData($("form#project-form"));
    const successFunction = (data) => {
        post('projects', formData, (data) => { redirect(site + 'dashboard') }, failureFunction, window.localStorage.getItem("PM-326-authToken"));
    };
    const failureFunction = (xhr) => {
        const msg = JSON.parse(xhr.responseText);
        console.log(msg);
        flash(msg["err"]["name"], 2250, "error");
    };
    post('validate/project', formData, successFunction, failureFunction);
    return false;
}

const validateEditProject = () => {
    $("button#edit-project-button").prepend(loading);
    const formData = formatData($("form#project-form"));
    const projectId = window.location.pathname.split('/')[2];

    const failureFunction = (xhr) => {
        if(xhr.status == 401) {
            removeToken();
            redirect('/login');
        }
        flash(JSON.stringify(xhr), 5000, "error");
        $(".loading").remove();
    }

    const successFunction = (d) => {
        const nestedSuccessFunction = (data) => {
            flash("Project successfully updated!", 3000, "success");
            $("#project-name").val(data.data['project-name']);
            $("#project-description").val(data.data['project-description']);
            $(".loading").remove();
        }
        put('edit-project/' + projectId, formData, nestedSuccessFunction, failureFunction, window.localStorage.getItem("PM-326-authToken"));
    }
    
    post('validate/project', formData, successFunction, failureFunction, window.localStorage.getItem("PM-326-authToken"));
    return false;
}

const formatData = (data) => {
    var arr = {};
    data = data.serializeArray();
    for (var i = 0; i < data.length; i++) {
        arr[data[i]['name']] = data[i]['value'];
    }
    return arr;
};

const post = (endpoint, formData, successFunction, failureFunction, header = null) => {
    $.ajax({
        url: site + 'api/' + endpoint,
        type: 'post',
        data: formData,
        headers: {
            "authToken": header
        },
        dataType: 'json',
    })
    .done(successFunction)
    .fail(failureFunction);
}

const get = (endpoint, successFunction, failureFunction, header = null) => {
    $.ajax({
        url: site + 'api/' + endpoint,
        type: 'get',
        headers: {
            "authToken": header
        },
        dataType: 'json',
    })
    .done(successFunction)
    .fail(failureFunction);;
}

const put = (endpoint, formData, successFunction, failureFunction, header = null) => {
    $.ajax({
        url: site + 'api/' + endpoint,
        type: 'put',
        data: formData,
        headers: {
            "authToken": header
        },
        dataType: 'json',
    })
    .done(successFunction)
    .fail(failureFunction);
}

const flash = (msg, delay, type) => {
    $('.toast').on('show.bs.toast', () => {
        $('.toast').css("opacity", "0.7");
    })
    $('.toast').toast({
        delay: delay
    });
    $('.toast').toast('show');
    $(".toast .toast-body").text(msg);
    $(".toast").addClass(type);

    $("span.spinner-border").remove();
}

const removeToken = () => {
    window.localStorage.removeItem("PM-326-authToken");
}

//global variables
const getUrl = window.location;
const site = getUrl.protocol + "//" + getUrl.host + "/";

