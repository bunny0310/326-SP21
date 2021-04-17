const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

if (window.localStorage.getItem("PM-326-authToken") === null) {
    redirect(site + 'login');
}
const loggedInUser = parseJwt(window.localStorage.getItem("PM-326-authToken"));

if (loggedInUser === null) {
    redirect(site + 'login');
}

$(document).ready(() => {
    console.log($('.topnav a#right'));
    $(".topnav a#right").remove();
    $(".topnav").append("<span id='right'>Welcome " + loggedInUser.name + "</span>");
});