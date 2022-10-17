const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'PROJET_6_OPENCLASSROOM');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   }
   catch(e){
       return res.status(500).json({e})
   }
}