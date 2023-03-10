import express from "express";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminValidation,
  passResetValidation,
} from "../middlewares/joiMiddleware.js";
import {
  createNewAdmin,
  findAdmin,
  updateAdmin,
} from "../models/admin/AdminModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  newAccountEmailVerificationEmail,
  resetPasswordNotification,
} from "../utils/nodemailer.js";

//admin user loging
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const user = await findAdmin({ email });

    if (user?._id) {
      const isPassMatch = comparePassword(password, user.password); //user.password is bcrypt password
      console.log(isPassMatch);

      if (isPassMatch) {
        user.password = undefined;
        user._v = undefined;
        console.log(user);
        res.json({
          status: "success",
          message: " login succesfully",
          user,
        });
        return;
      }
      res.json({
        status: "error",
        message: "Invalid login details!",
      });
    }
  } catch (error) {
    next(error);
  }
});

// admin user registration
router.post("/register", newAdminValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    req.body.emailVerificationCode = uuidv4();

    const result = await createNewAdmin(req.body);

    if (result?._id) {
      const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;

      resetPasswordNotification(uniqueLink, result);

      res.json({
        status: "success",
        message:
          "We have send a verification email. Please check your email, including junk folder, and follow the instruction to activate your account.",
      });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to create a new user has been registered",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is already account exist associated with this email";
      error.errorCode = 200;
    }
    next(error);
  }
});

//admin user email verification.
router.post("/verify", emailVerificationValidation, async (req, res, next) => {
  try {
    const { email, emailVerification } = req.body;
    //chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true

    const obj = {
      status: "active",
      isEmailVerified: true,
      emailVerificationCode: "",
    };

    const user = await updateAdmin(req.body, obj);
    if (user?._id) {
      //send email notification
      emailVerifiedNotification(user);

      res.json({
        status: "success",
        message: "Your account has been verified. You may login now",
      });

      return;
    }

    res.json({
      status: "error",
      message: "The link is invalid or expired.",
    });
  } catch (error) {
    next(error);
  }
});

// otp request
router.post("/request-otp", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        status: "error",
        message: "Invalid request",
      });
    }

    const user = await findUser({ email });

    if (user?._id) {
      //create otp,
      const token = numString(6);
      const obj = {
        token,
        associate: email,
      };
      //store opt and emial in new tabale called sessions
      const result = await createNewSession(obj);

      if (result?._id) {
        //send that otp to their email
        emailOtp({ email, token });

        return res.json({
          status: "success",
          message:
            "We have sent you an OTP to your email, chek your email and fill up the form below.",
        });
      }
    }

    res.json({
      status: "error",
      message: "Wrong email",
    });
  } catch (error) {
    next(error);
  }
});

// password reset request
router.post("/reset-password", passResetValidation, async (req, res, next) => {
  try {
    const { email, opt, password } = req.body;

    const deletedToke = await deleteSession({ email, opt });

    if (deletedToke?._id) {
      //encrypt password and/update user password
      const user = await updateAdmin(
        { email },
        { password: hashPassword(password) }
      );

      if (user?._id) {
        //send email notification
        passwordUpdateNotification(user);

        return res.json({
          status: "success",
          message: "You password has been updated successfully",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to update your password. Invalid or expired token",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
