const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RaghavOpBolte'

const fetchuser = (req, res, next)=>{
    //get user from jwt token and ad id in req
    const token = req.header('auth-token')
    if (!token){
        return res.status(401).send({ errors: "please authenticate valid token" });
    }
    try {
        const verify = jwt.verify(token, JWT_SECRET)
        req.user = verify.user
        next()  
    } catch (error) {
        console.error();
        return res.status(401).send({ errors: "please authenticate valid token" })
    }
}

module.exports = fetchuser