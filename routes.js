const express = require("express");
const {validateLoginForm, validateRegisterForm, validateProjectForm, getProjects, insertProject, authorize} = require("./controller");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/dashboard', (req, res) => {
    getProjects().
    then((data) => {
        let arr = [];
        for(let obj of data) {
            arr.push({title: obj['name']});
        }
        res.render('pages/template', { 
            title: 'Dashboard', 
            prod_url: process.env.PRODUCTION_URL, 

            projects: arr})
        })
    .catch((err) => {
        console.log(err);
        res.render('pages/template', { 
            title: 'Dashboard', 
            prod_url: process.env.PRODUCTION_URL, 
            projects: [{ title: 'Internal Server Error' }]})
        });  
    });
router.get('/', function (req, res) {
    res.render('pages/index', {title: 'Home Page'});
});
router.get('/register', function (req, res) {
    res.render('pages/register', { title: 'Register'});
});
router.get('/login', function (req, res) {
    res.render('pages/login', { title: 'Login'});
});
router.get('/create-project', function (req, res) {
    res.render('pages/create-project', { title: 'Create Project'});
});
router.get('/edit-project', function (req, res) {
    res.render('pages/edit-project', { title: 'Edit Project'});
});

// endpoint for authentication 
router.post('/api/validate/:page', (req, res) => {
    const page = req.params['page'];
    console.log(page);
    let returnVal = -1;
    if (page === 'login') {
        returnVal = validateLoginForm(req.body);
    }
    if (page === 'register') {
        returnVal = validateRegisterForm(req.body);
    }
    if(page === 'edit-project' || page === 'create-project'){
        returnVal = validateProjectForm(req.body);
    }
    if (returnVal === -1) {
        return res.status(400).json({ "msg": "Invalid data or malformed request." });
    }
    return res.status(200).json({ "msg": "Success, form valid!" });
})

//api endpoints for performing database operations
router.get('/api/projects',  (req, res) => {
    getProjects()
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json({"err" : err});
    })
})

router.post('/api/projects', (req, res) => {
    const status = validateProjectForm(req.body);
    if(status == -1) {
        return res.status(400).json({msg: "Incorrectly formated data"});
    }
    insertProject(req.body)
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json({"err" : err});
    })
});

router.post('/api/auth', (req, res) => {
    const formData = req.body; 
    authorize(formData)
    .then((data) => {
        if(data.status === 201){
            return res.status(data.status).json({msg: data.msg});
        }
        return res.status(data.status).json({msg: "unauthorized"});
    })
});

router.post('/api/verifyToken', (req, res) => {
    const token = req.body.token;
    try {
        jwt.verify(token, 'secret1234');
        return res.status(200).json({msg: "Token verified!"});
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({msg: "Invalid or malformed token"});
    }
})

module.exports = router;