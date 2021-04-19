const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    // const header = req.session['authToken'];

    // if (header === null || header === undefined) {
    //     return res.status(401).json({msg: 'unauthorized'});
    // }
    // let payload;
    // try {

    //     payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    //     next();
    // }
    // catch (e) {
    //     return res.status(401).json({msg: 'unauthorized'});
    // }
    // if(req.header('Authorization') === 'xyz') {
    //     next();
    // } else {
    //     return res.status(401).json({msg: 'unauthorized'});
    // }
}

module.exports = {verify};