const redirect = (url) => {
    window.location = url;
};
const loading = "<span class=\"spinner-border spinner-border-sm\"></span>       ";
const validateForm = () => {
    $("button.login").prepend(loading);
    const data = $("form#login-form").serializeArray();
    var returnArray = {};
    for (var i = 0; i < data.length; i++){
        returnArray[data[i]['name']] = data[i]['value'];
    }
    $.post('http://localhost:5000/api/validate/login', returnArray, (data) => {
        redirect('http://localhost:5000/dashboard');
    }).fail((xhr) => {
        const msg = JSON.parse(xhr.responseText).msg;
        flash(msg, 2250, "error");
        $("span.spinner-border").remove();
    });
    return false;
}

const flash = (msg, delay, type) => {
    $('.toast').on('show.bs.toast', () => {
        $('.toast').css("opacity", "0.5");
    })
    $('.toast').toast({
        delay: delay
    });
    $('.toast').toast('show');
    $(".toast .toast-body").text(msg);
    $(".toast").addClass(type);
}

