const express = require("express");

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


module.exports = router; 