const redirect = (url) => {
    window.location = url;
};

const loading = "<span class=\"spinner-border spinner-border-sm\"></span>       ";
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
    console.log(formData);
    post('validate/register', 'dashboard', formData);
    return false;
};

const validateCreateProject = () => {
    $("button#create-project-button").prepend(loading);
    const formData = formatData($("form#project-form"));
    console.log(formData);
    const failureFunction = (xhr) => {
        const msg = JSON.parse(xhr.responseText).msg;
        flash(msg, 2250, "error");
    };

    const successFunction = (data) => {
        post('projects', formData, (data) => { redirect(site + 'dashboard') }, failureFunction);
    };
    post('validate/create-project', formData, successFunction, failureFunction);
    return false;
}

const validateEditProject = () => {
    $("button#edit-project-button").prepend(loading);
    const formData = formatData($("form#project-form"));
    post('edit-project', 'dashboard', formData);
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

const post = (endpoint, formData, successFunction, failureFunction) => {
    $.post(site + 'api/' + endpoint, formData, successFunction).fail(failureFunction);
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

