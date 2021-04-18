const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

if (window.localStorage.getItem("PM-326-authToken") !== null) {
    $.post(
        site + 'api/verifyToken',
        { token: window.localStorage.getItem("PM-326-authToken") }, (data) => {
            const loggedInUser = parseJwt(window.localStorage.getItem("PM-326-authToken"));
    
            if (loggedInUser !== null) {
                redirect(site + 'dashboard');
            }
        });
}
