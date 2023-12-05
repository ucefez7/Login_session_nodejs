var express = require("express");
var router = express.Router();
const nocache = require("nocache");

const credential = {
  email: "ucefez@gmail.com",
  password: "ucefez123",
};
router.use(nocache());

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.render("base", { title: "Login System" });
  }
});

//login user
router.post("/login", (req, res) => {
  if (req.body.email !== credential.email) {
    res.render("base", { logout: "Invalid Email" });
  } else if (req.body.password !== credential.password) {
    res.render("base", { logout: "Invalid Password" });
  } else {
    if (
      req.body.email === credential.email &&
      req.body.password === credential.password
    ) {
      req.session.user = credential;
      res.redirect("/dashboard");
    }
  }
});

//route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    // if session created & value inside user it return the response
    res.render("dashboard", { user: req.session.user.email });
  } else {
    //   res.send("Unauthorize User")
    res.redirect("/");
  }
});

// router for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", {
        title: "Login",
        logout: "Logged out successfully.",
      });
    }
  });
});

module.exports = router;