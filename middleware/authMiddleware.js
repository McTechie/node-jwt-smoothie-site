// custom middleware to authenticate using jwt present in requests (stored in browser)

const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, 'the techie secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth };