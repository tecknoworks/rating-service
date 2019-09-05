const axios = require('axios')

module.exports = async function(req, res, next){
    const authorizationHeaader = req.headers.authorization;
    
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        
        try {   
            let response = await axios.get(`http://localhost:3007/auth/authorise?token=${token}`)    
            req.userId=response.data.userId;

            next();
        } catch (error) {
          res.send(401);
        }
    }
    else
        res.send(401);
}