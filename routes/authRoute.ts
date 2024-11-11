import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/github",
  passport.authenticate("github", { scope: [ "user:email" ] }));

router.get("/github/callback", 
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/dashboard");
});

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);


/////////////////// Error messages handle ///////////////////////

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   passport.authenticate("local", (err: Error | null, user: Express.User | null, info: any) => {

//     if (err) {
//       console.error(err);
//       return res.render("login", {
//         generalError: "An error occurred. Please try again later.",
//         emailError: "",
//         passwordError: "",
//         email: email || ""
//       });
//     }

//     if (!user) {
//       let generalErrorMessage = "Invalid email or password";

//       if (!email || !password) {
//         generalErrorMessage = "Please provide both email and password.";
//       }

//       return res.render("login", {
//         generalError: generalErrorMessage,
//         emailError: "",
//         passwordError: "",
//         email: email || ""
//       });
//     }

//     req.login(user, (loginErr) => {
//       if (loginErr) {
//         console.error(loginErr);
//         return res.render("login", {
//           generalError: "An error occurred. Please try again later.",
//           emailError: "",
//           passwordError: "",
//           email: email || ""
//         });
//       }
//       return res.redirect("/dashboard");
//     });
//   })(req, res);
// });

///////////////////////////////////////////////////////////////////

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;