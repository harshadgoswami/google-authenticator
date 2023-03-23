const express = require("express");
const app = express();
const { authenticator } = require("otplib");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const saltRounds = 10;
const SENDGRIDAPIKEY = process.env.SENDGRIDAPIKEY;
const SENDEREMAIL = process.env.SENDEREMAIL;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRIDAPIKEY);
const jwtMiddleware = require("../middleware/jwtMiddleware");

const userRoute = express.Router();

let User = require("../model/User");
const { default: mongoose } = require("mongoose");

userRoute.route("/register").post(async (req, res, next) => {
  const secret = authenticator.generateSecret();
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const obj = {
    email: req.body.email,
    password: hash,
    secret: secret,
  };

  User.create(obj, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //generate qr and put it in session
      QRCode.toDataURL(
        authenticator.keyuri(obj.email, "2FA Node App", secret),
        (err, url) => {
          if (err) {
            throw err;
          }

          req.session.userId = data._id.toString();

          return res.json({
            status: true,
            message: "success",
            data: { qr: url },
          });
          //return res.redirect('/sign-up-2fa')
        }
      );
    }
  });
});

userRoute.route("/generateqr/:id").get(async (req, res, next) => {
  let user = await User.findOne({ secret: req.params.id });

  if (!user) {
    return res.json({ status: false, message: "wrong request!" });
  }

  const secret = authenticator.generateSecret();

  await User.updateOne(
    { _id: mongoose.Types.ObjectId(user._id.toString()) },
    { tempSecret: secret }
  );

  QRCode.toDataURL(
    authenticator.keyuri(user.email, "2FA Node App", secret),
    (err, url) => {
      if (err) {
        throw err;
      }

      req.session.userId = user._id.toString();

      return res.json({ status: true, message: "success", data: { qr: url } });
    }
  );
});

userRoute.route("/login").post(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ status: false, message: "Login Failed" });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({ status: false, message: "Login Failed" });
  }

  req.session.qr = null;
  req.session.userId = user._id.toString();

  return res.json({ status: true, message: "Login success." });
  //return res.redirect(successUrl)
});

userRoute.route("/checklogin").get(jwtMiddleware, async (req, res, next) => {
  let user = await User.findOne({ _id: mongoose.Types.ObjectId(req.userId) });

  if (!user) {
    return res.json({ status: false, message: "Not verified" });
  }

  return res.json({
    status: true,
    message: "Login success.",
    data: { email: user.email },
  });
  //return res.redirect(successUrl)
});

userRoute.route("/logout").get(jwtMiddleware, async (req, res, next) => {
  console.log(req.userId); //DEBUG

  let user = await User.findOne({ _id: mongoose.Types.ObjectId(req.userId) });

  if (!user) {
    return res.json({ status: false, message: "Not verified" });
  }

  req.session.token = null;
  req.session.destroy();

  return res.json({ status: true, message: "Logout success." });
  //return res.redirect(successUrl)
});

userRoute.route("/verify").post(async (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ status: false, message: "Verification Failed" });
  }

  let user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.session.userId),
  });

  const code = req.body.code;

  if (!authenticator.check(code, user.secret)) {
    return res.json({ status: false, message: "Wrong Otp is entered." });
  }

  req.session.token = jwt.sign(user._id.toString(), "supersecret");

  return res.json({
    status: true,
    message: "Verification success!!",
    data: { token: req.session.token },
  });
});

userRoute.route("/forgot-2fa").get(async (req, res, next) => {
  console.log("DEBUG : FORGOT 2FA STARTED");

  if (!req.session.userId) {
    return res.json({ status: false, message: "Verification Failed" });
  }

  let user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.session.userId),
  });

  if (!user) {
    return res.json({ status: false, message: "Verification Failed" });
  }

  let html = `<div>
        <h3>Hi User</h3>
        <div>
        <div>copy the following link to reset your google authentications</div>
            <div><span>http://localhost:3000/#/reset-2fa/${user.secret}</span></div>
        </div>
        <div>thanks</div>
        <h4>Harshad goswami</h4>
    </div>`;

  const msg = {
    to: user.email, // Change to your recipient
    from: SENDEREMAIL, // Change to your verified sender
    subject: "Resetting Forgot 2FA",
    html: html,
  };

  try {
    console.log("DEBUG: BEFORE SENDING EMAIL ", msg);

    let { response, error } = await sgMail.send(msg);

    console.log("DEBUG: HERE AFTER SENDING EMAIL", response, error);

    if (error) {
      console.error("DEBUG", error);
      return res.json({ status: false, message: "email sends failed" });
    }

    if (response) {
      console.log(response[0].statusCode);
      console.log(response[0].headers);

      return res.json({ status: true, message: "success" });
    }

    return res.json({ status: true, message: "success" });
  } catch (err) {
    console.log("error here1", err.message);
    console.log(JSON.stringify(err));

    return res.json({ status: false, message: "email sends failed" });
  }
});

userRoute.route("/reset-2fa/:id").post(async (req, res) => {
  let user = await User.findOne({ secret: req.params.id });
  const code = req.body.code;

  if (!user) {
    return res.json({ status: false, message: "failed" });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({ status: false, message: "Wrong request!" });
  }

  if (!authenticator.check(code, user.tempSecret)) {
    return res.json({ status: false, message: "Wrong Otp is entered." });
  }

  await User.updateOne(
    { _id: mongoose.Types.ObjectId(user._id.toString()) },
    { secret: user.tempSecret, tempSecret: null }
  );

  return res.json({ status: true, message: "Reset Success" });
});

module.exports = userRoute;
