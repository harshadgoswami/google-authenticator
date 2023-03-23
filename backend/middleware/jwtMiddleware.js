const jwt = require("jsonwebtoken");

const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      'supersecret',
      {  algorithms: ["HS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
});

const jwtMiddleware = async (req, res, next) => {

    if(!req.session.token){
        return res.json({ status: false, message: "UnAuthorized" });
    }

   
    if(req.session.token != req.headers.token){
        return res.json({ status: false, message: "UnAuthorized" });
    }

    req.userId = await verifyJwtToken(req.session.token);

    next();
}

module.exports = jwtMiddleware;