const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const header = req.session['authToken'];

    if (header === null || header === undefined) {
        return res.status(401).json({msg: 'unauthorized'});
    }
    let payload;
    try {

        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (e) {
        return res.status(401).json({msg: 'unauthorized'});
    }
}

const verifyFrontEnd = (req, res, next) => {
    const header = req.session['authToken'];
    
    if (header === null || header === undefined) {
        return res.redirect('/login');
    }
    let payload;
    try {
        payload = jwt.verify(header, 'secret1234');
        next();
    }
    catch (e) {
        console.log(e);
        return res.redirect('/login');
    }
}

module.exports = {verify, verifyFrontEnd};