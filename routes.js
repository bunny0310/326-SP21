const express = require("express");
const { verify } = require("./middleware");
const {projectsCountCache} = require("./app-config");


const {
    validateLoginForm,
    validateRegisterForm,
    validateProjectForm,
    getProjects,
    insertProject,
    updateProject,
    deleteProject,
    authorize,
    registerUser,
    getProjectCount,
    getProject
} = require("./controller");

const jwt = require('jsonwebtoken');
const { restart, reset } = require("nodemon");
const router = express.Router();


router.get('/dashboard', (req, res) => {
    res.render('pages/template', {
        title: 'Dashboard'
    })
});
router.get('/404', (req, res) => {
    res.render('partials/notfound');
});
router.get('/500', (req, res) => {
    res.render('partials/internalservererror');
});
router.get('/viewProjects/:id', (req, res) => {
    res.render('pages/view-project', {
        title: 'View Project'
    })
})
router.get('/', function (req, res) {
    res.render('pages/index', { title: 'Home Page' });
});
router.get('/register', function (req, res) {
    res.render('pages/register', { title: 'Register' });
});
router.get('/login', function (req, res) {
    res.render('pages/login', { title: 'Login' });
});
router.get('/create-project', function (req, res) {
    res.render('pages/create-project', { title: 'Create Project' });
});
router.get('/edit-project/:id', function (req, res) {
    res.render('pages/edit-project', { title: 'Edit Project' });
});

// endpoint for authentication 
router.post('/api/validate/:page', (req, res) => {
    const page = req.params['page'];
    let returnVal = -1;
    if (page === 'login') {
        returnVal = validateLoginForm(req.body);
    }
    if (page === 'register') {
        returnVal = validateRegisterForm(req.body);
    }
    if (page === 'project') {
        returnVal = validateProjectForm(req.body);
    }
    if (returnVal === -1) {
        return res.status(400).json({ msg: "Invalid data or malformed request." });
    }
    return res.status(200).json({ msg: "Success, form valid!" });
});

//api endpoints for performing database operations
router.get('/api/projects', verify, (req, res) => {
    let page = parseInt(req.query.page);
    if (page === null || page === undefined || !(/^\d+$/.test(page))) {
        page = 1;
    }
    getProjects(req.user.userId, page)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(500).json({ "err": err });
        })
});

router.get("/api/projects/:id", verify, (req, res) => {
    const id = req.params["id"];

    getProject(req.user.userId, id)
        .then((data) => {
            return data === undefined || data === null ? res.status(404).json({ msg: "project not found!" }) : res.status(200).json({ data: data });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: err });
        })
});

//removing project from database
router.delete("/api/projects/:id", verify, (req, res) => {
    const projectId = req.params["id"];

    deleteProject(req.user.userId, projectId)
        .then((rowCount) => {
            if (rowCount === 1) {
                const projectsCount = projectsCountCache.get(req.user.userId);
                projectsCountCache.put(req.user.userId, projectsCount - 1);
                return res.status(200).json({ data: req.body });
            }
            return res.status(404).json({ msg: "Project not found!" });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: err });
        });
});

router.post('/api/projects', (req, res) => {
    const status = validateProjectForm(req.body);
    if (status === -1) {
        return res.status(400).json({ err: "Incorrectly formated data" });
    }
    token = req.header('authToken');
    insertProject(req.body, token)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(500).json({ "err": err });
        })
});


router.put('/api/edit-project/:id', verify, (req, res) => {
    const projectId = req.params['id'];

    updateProject(req.body, projectId, req.user.userId)
        .then((rowCount) => {
            if (rowCount === 1)
                return res.status(200).json({ data: req.body });
            return res.status(404).json({ msg: "Project not found!" });
        })
        .catch((err) => {
            return res.status(500).json({ "err": err });
        });
});

// for login
router.post('/api/auth', (req, res) => {
    const formData = req.body;
    authorize(formData)
        .then((data) => {
            return res.status(data.status).json({ msg: data.msg });
        })
});

router.post('/api/verifyToken', (req, res) => {
    const token = req.body.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ msg: "Token verified!" });
    }
    catch (err) {
        return res.status(401).json({ msg: "Invalid or malformed token" });
    }
});

// for register
router.post('/api/register', (req, res) => {
    const formData = req.body;
    registerUser(formData)
        .then((data) => {
            return res.status(data.status).json({ msg: data.msg });
        })
});

// for getting projects count
router.get('/api/getProjectsCount', verify, (req, res) => {
    getProjectCount(req.user.userId)
        .then((data) => {
            return res.status(200).json({ "msg": data });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ "msg": err });
        })
});

module.exports = router;