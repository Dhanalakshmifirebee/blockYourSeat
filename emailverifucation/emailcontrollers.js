const nodemailer = require("nodemailer");
const Token = require("./token.module");
const { User, validate } = require("./email.module");
const crypto = import("crypto");
const express = require("express");
const router = express.Router();

const sendEmail = async (email, subject, text) => {
  try {
    console.log("data");
    const transporter = nodemailer.createTransport({
      service:"gmail",
      host: process.env.HOST,
      port: 587,
      secure: true,
      auth: {
        user: "dhanamcse282@gmail.com",
        pass: "dhanam282",
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

const postMail = async function(req,res) {
    console.log(process.env.BASE_URL);
    try {
        // let payload = {
            
        // }
        // const { error } = validate(req.body);
        // console.log(error);
        // if (error) return res.status(400).send(error.details[0].message);
    
        let user = await User.findOne({ email: req.body.email });
        if (user)
          return res.status(400).send("User with given email already exist!");
          
        user = await new User({
          name: req.body.name,
          email: req.body.email,
        }).save();
        console.log(user);
        
        // let token = await new Token({
        //   userId: user._id,
        //   token: crypto.randomBytes(32).toString("hex"),
        // }).save();
        // console.log(token);
        // const message = `${process.env.BASE_URL}/user/verify/${user._id}/${token.token}`;
        const message = "BlockYourSeat"
        await sendEmail(user.email, "Verify Email", message);
        res.send("An Email sent to your account please verify");
      } catch (error) {
        res.status(400).send("An error occured");
      }
}

const getVerify = async function(req,res){
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
    
        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);
    
        res.send("email verified sucessfully");
      } catch (error) {
        res.status(400).send("An error occured");
      }
}

module.exports = {
    sendEmail:sendEmail,
    postMail: postMail,
    getVerify: getVerify
};