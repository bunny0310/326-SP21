const express = require("express");

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('pages/template', {users: ["John", "Paul", "Ringo"]}))
router.get('/', function(req, res) {
    res.render('pages/index');
});
router.get('/register', function(req, res) {
    res.render('pages/register');
});
router.get('/login', function(req, res) {
    res.render('pages/login');
});
router.get('/create-project', function(req, res) {
    res.render('pages/create-project');
});
router.get('/edit-project', function(req, res) {
    res.render('pages/edit-project');
});


module.exports = router; 