const jwt = require("jsonwebtoken")
function verifyTocken(req, res, next) {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    const token = req.headers.authorization?.split(" ")[1];// Bearer TOKEN
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
/** allow only each user update his data  */
function verifyTokenAndAuthorization(req, res, next) {
    verifyTocken(req, res, () => {
        if (req.user.id === req.params.id)

            next();
        else {
            return res.status(403).json({ message: "you are not allowed " })
        }
    })
}

function verifyadmin(req, res, next) {
    verifyTocken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "only admin allowed" })
        }
    })
}
/*
req.user.role هو الدور اللي موجود في الـ JWT token (مثلاً "student", "instructor", "admin").

الكود يتحقق هل هذا الدور موجود ضمن الأدوار المسموح بها (roles.includes(req.user.role)).

إذا لا → يرفض الوصول (403).

إذا نعم → يستمر (next())
// مسموح فقط للطلاب
routers.put("/student-action/:id", verifyTocken, authorizeRoles("student"), student.studentAction);

// مسموح للمدرسين و admins
routers.put("/instructor-action/:id", verifyTocken, authorizeRoles("instructor", "admin"), instructor.action);
*/
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}
function verifystudent(req, res, next) {
    verifyTocken(req, res, () => {

        if (req.user.role === "student")
            next();
        else
            res.status(403).json({
                messaage: "Access denied, only students allowed"
            })
    })
}
module.exports = {
    verifyTocken,
    verifyTokenAndAuthorization,
    authorizeRoles,
    verifyadmin,
    verifystudent

}