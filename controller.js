
const validateLoginForm = (data) => {
    const email = data.email, password = data.password;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    // check if email or password are empty
    if(email === '' || password === '' || email === undefined || password === undefined || email === null || password === null) {
        return -1;
    }
    if(!regex.test(email)) {
        return -1;
    }
    if(password.length < 6) {
        return -1;
    }
    return 1;
};

module.exports = {validateLoginForm};