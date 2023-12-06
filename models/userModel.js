const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 30
    },
    // passwordConfirm: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minLength: 8,
    //     maxLength: 30
    // },
    passwordDateChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return (next);
        }
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    } catch (err) {
        console.log(err);
    }
});

userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.generatePasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.passwordResetExpires = Date.now() + 10*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);

//User -> users
