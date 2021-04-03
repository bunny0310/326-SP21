const express = require("express");
const {validateLoginForm} = require("./controller");

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('pages/template', {title: 'Dashboard', projects: [{title: 'Stock Trend Analyzer'}, {title: 'To Do List App'}, {title: 'Restaurant Menu App'}]}))
router.get('/', function(req, res) {
    res.render('pages/index');
});
router.get('/register', function(req, res) {
    res.render('pages/register', {title: 'Register'});
});
router.get('/login', function(req, res) {
    res.render('pages/login', {title: 'Login'});
});
router.get('/create-project', function(req, res) {
    res.render('pages/create-project', {title: 'Create Project'});
});
router.get('/edit-project', function(req, res) {
    res.render('pages/edit-project', {title: 'Edit Project'});
});

// endpoint for authentication 
router.post('/api/validate/:page', (req, res) => {
    const page = req.params['page'];
    let returnVal = -1;
    if(page === 'login') {
        returnVal = validateLoginForm(req.body);
    }
    if(returnVal === -1) {
        return res.status(400).json({"msg": "Invalid data or malformed request."});
    }
    return res.status(200).json({"msg": "Success, form valid!"});
})


module.exports = router; 