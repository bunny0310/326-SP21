
if (window.localStorage.getItem("PM-326-authToken") !== null) {
    redirect(site + 'dashboard');
}

$.post(
    site + 'api/verifyToken', 
    {token: window.localStorage.getItem("PM-326-authToken")}, (data) => {
        redirect(site + 'dashboard');
    });

    const loggedInUser = parseJwt(window.localStorage.getItem("PM-326-authToken"));

    if (loggedInUser !== null) {
        redirect(site + 'dashboard');
    }