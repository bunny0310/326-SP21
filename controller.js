const { postgresCon } = require("./config");
const jwt = require('jsonwebtoken');

const validateLoginForm = (data) => {
    const email = data['email'], password = data['password'];
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    // check if email or password are empty
    if (email === '' || password === '' || email === undefined || password === undefined || email === null || password === null) {
        return -1;
    }
    //make sure email is of right format
    if (!emailRegex.test(email)) {
        return -1;
    }
    if (password.length < 6) {
        return -1;
    }
    return 1;
};

const validateRegisterForm = (data) => {
    const firstName = data['first-name'], lastName = data['last-name'], email = data['email'],
        password = data['password'], confirmPassword = data['confirm-password'];
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    //check if any of the fields (except confirmPassword) are empty
    if (firstName === '' || lastName == '' || email === '' || password == ''
        || firstName === undefined || lastName == undefined || email === undefined || password == undefined
        || firstName === null || lastName == null || email === null || password == null) {
        return -1;
    }
    //makes sure email is of the right format
    if (!emailRegex.test(email)) {
        return -1;
    }
    if (confirmPassword !== password || password.length < 6) {
        return -1;
    }
    return 1;
};

const validateProjectForm = (data) => {
    console.log(data);
    const projectName = data['project-name'], projectDescription = data['project-description'];
    //check if any of the fields are empty
    if (projectName === '' || projectDescription === '' || projectName == undefined || projectDescription === undefined
        || projectName === null || projectDescription === null) {
        return -1;
    }
    return 1;
}

const getProjects = async () => {
    const projects = [];
    try {
        let res = await postgresCon().query("SELECT * from projects");
        for (let row of res.rows) {
            projects.push(row);
        }
        return projects;
    }
    catch (err) {
        console.log(err);
    }
}

const insertProject = async (data) => {
    try {
        const str = "INSERT INTO projects (\"name\", \"description\", \"userId\") VALUES ('" + data['project-name'] + "', '" + data["project-description"] + "', 1)";
        let res = await postgresCon().query(str);
        return 1;
    }
    catch (err) {
        console.log(err);
        return -1;
    }
}

const authorize = async (data) => {
    try {
        const email = data['email'], password = data['password'];
        let res = await postgresCon().query("SELECT * from users WHERE email = '" + email + "' AND password = '" + password + "'");
        if (res.rows.length === 1) {
            const payload = {
                userId: res.rows[0].id,
                email: res.rows[0].email,
                name: res.rows[0].firstName + ' ' + res.rows[0].lastName
            }

            let accessToken = jwt.sign(payload, 'secret1234', {
                algorithm: "HS256",
                expiresIn: 7200
            });

            return { msg: accessToken, status: 201 };
        }
        return { msg: 'failed', status: 401 };
    } catch (err) {
        console.log(err);
        return { msg: err, status: 500 };
    }
}

const registerUser = async (data) => {
    try {
        const firstName = data['first-name'];
        const lastName = data['last-name'];
        const email = data['email'];
        const password = data['password'];

        await postgresCon().query("INSERT INTO users (\"firstName\",\"lastName\", \"email\", \"password\") VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "')");
        return {msg: "success", status: 200};
    } 
    catch (err) {
        console.log(err);
        return {msg: err, status: 500};
    }
}

module.exports = 
{ 
    validateLoginForm, 
    validateRegisterForm, 
    validateProjectForm, 
    getProjects, 
    insertProject, 
    authorize,
    registerUser
};