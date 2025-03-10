// Middleware to check if a user is logged in
function requireUser(req, res, next) {
     if (!req.user){
       return res.status(401).json({
      name: "UnauthorizedError",
      message: "All users must be logged in to perform this action",
     });
    }
     next();
     };
    
    // export of require user
    module.exports = {
      requireUser, 
    };
