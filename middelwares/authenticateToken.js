var jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request heade
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token"+token);
    if (token == null) return res.status(401).json({ auth: false, message: 'No token provided' } )
  
    jwt.verify(token, process.env.SECRET, (err) => {
      console.log(err)
      if (err) return res.status(403).json({ auth: false, message: 'failed to authenticate token' } )
      next() 
    })
  }

module.exports = authenticateToken;
