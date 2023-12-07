const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { request } = require("http");
const crypto = require("crypto");
const sendMail = require("../utilities/email").sendMail;
const validator = require("validator")



exports.signUp = async (req, res) => {
    try {
        let email = req.body.email;
        let pass = req.body.password;
        let passConfirm = req.body.passwordConfirm;

        // 1-Check if the mail is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email..." })
        }

        // 2-Check if the mail is already in use
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(409).json({ message: "Email already in use!" })
        }

        // 3.1-Check if the passwords match
        if (pass !== passConfirm) {
            return res.status(400).json({ message: "Passwords do not match!" })
        }
        // const hashedPassword = await bcrypt.hash(pass, 12);

        // 3.2-Check password length
        if (!(pass.length >= 8 && pass.length <= 30)) {
            return res.status(400).json({ message: "Password length is not within the required terms [8-30]" })
        }

        // 4-All is well, create a new user
        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(201).json({ message: "User created successfully!", data: { newUser } })
    } catch (err) {
        console.log(err);
    }
};

exports.login = async (req, res) => {
    try {

        // 1-Check if email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Account doesnt exist." });
        }
        // 2-Check if password is matching
        // const passFunc = await bcrypt.compare(req.body.password, user.password);
        if (!(await user.checkPassword(req.body.password, user.password))) {
            return res.status(400).json({ message: "You have entered wrong credentails" })
        }

        // 3-Login

        return res.status(200).json({ message: "You have successfully logged in!" })

    } catch (err) {
        console.log(err);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        // 1-Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User with the provided email doesn't exist." })
        }
        // 2-Create reset token to send through email
        const resetToken = user.generatePasswordResetToken();

        let resetTokenValue;
        resetToken.then((resolvedValue) => {
            resetTokenValue = resolvedValue;
            console.log(resetTokenValue);
        }).catch((error) => {
            console.log(error);
        })

        await user.save({ validateBeforeSave: false });

        // 3- send token through email
        // example URL - http://localhost:3001/api/auth/resetPassword/84fbh8otbajgbuawbgtvu4nt

        // 3.1-Create the URL

        const url = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetTokenValue}`;

        // 3.2-Create the email
        const msg = `Forgot your password? Reset it by visiting the following link: ${url}`;
        try {
            await sendMail({
                email: user.email,
                subject: "Password Reset Token (Valid for 10 minutes)",
                message: msg
            });

            res.status(200).json({ message: "The reset link was delivered successfully!" })
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            res.status(500).json({ message: "An error has occurred while sendnig the email, please try again in a moment." })
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}

exports.resetPassword = async (req, res) => {
    try {

        // 1-Get the user 
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        // console.log(hashedToken);
        const user = User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })
        console.log(user);

        // 2-Check if user exists
        if (!user) {
            return res.status(400).json({ message: "The token is invalid or expired. Please request a new one..." });
        }

        // 3-Check password requirements (length)
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: "Password length is too short" })
        }
        if (req.body.password.length > 30) {
            return res.status(400).json({ message: "Password length is too Long" })
        }

        // 4-Check if new passwords match
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({ message: "Passwords don't match" })
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordDateChangedAt = Date.now();

        // await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password changed successfully!" })

    } catch (err) {
        console.log(err);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: users })
    } catch (err) {
        res.status(404).json({ message: "No users" })
    }
}