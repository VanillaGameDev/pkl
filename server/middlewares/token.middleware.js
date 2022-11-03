const jwt = require("jsonwebtoken")

const TokenMiddleWare = {
    async checkUser (req,res,next){
        try {
            const token = req.headers.authorization.split(' ')[1];
    
            if(!token){
                return res.json({status:'bad', msg:'token tidak di temukan!' })}
            
                const decodedToken = await jwt.decode(token, process.env.TOKEN_KEYWORD, (err) => {
                    if(err){
                        return res.json({status:'bad', msg:'unathorized or invalid token'})
                    }
                })
           
                if(!decodedToken){
                     return res.json({status:'bad', msg:'unathorized'})
                } 
                
                 
                next()
        } catch (error) {
            console.log(error.message)
            
        }
    },
    async checkAdmin(req, res, next ){
        try {
            const token = req.headers.authorization?.split(" ")[1];
      
            if (!token) {
              return res.json({ status: "bad", msg: "Token not found" });
            }
               
           const decodedToken = await jwt.decode(token, process.env.ADMIN_KEYWORD, (err) => {
            if(err){
                return res.json({status:'bad', msg:'unathorized or invalid token'})
            }
        })
        console.log(decodedToken)
    
    
        if (!decodedToken) {
            return res.json({ status: "bad", msg: "Unauthorized" });
          }
    
          if (decodedToken.user.username !== "admin1") {
            return res.json({
              status: "bad",
              msg: "User Bukan Admin",
            });
          }
    
          next();
    
        } catch (error) {
            console.log(error.message)
            
        }
    },
    async checkAll(req,res,next){
         try {
        const token = req.headers.authorization?.split(" ")[1];
  
        if (!token) {
          return res.json({ status: "bad", msg: "Token not found" });
        }
           
       const decodedAsAdminToken = await jwt.decode(token, process.env.ADMIN_KEYWORD)
       const decodedAsUserToken = await jwt.decode(token, process.env.TOKEN_KEYWORD)
 


    if (!decodedAsAdminToken || !decodedAsUserToken) {
        return res.json({ status: "bad", msg: "Unauthorized" });
      }
 decodedAsAdminToken ? 
  (req.admin = decodedAsAdminToken.admin) :
  (req.user = decodedAsUserToken.user)
  

      next();

    } catch (error) {
        console.log(error.message)
        
    }

    }
}


module.exports = TokenMiddleWare