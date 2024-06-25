
//  Import Functions
const SMSService = require("../services/sms.service");
const TelegramService = require('../services/telegram.service');

const firebase = require("../services/firebase.service") // Firebase Service
const mail = require("../services/mail.service") // Mail Service
const telegram = TelegramService() // Telegram Service
const sms = SMSService() // SMS Service


// Send OTP
const sendOtp =  async (req, res) => {
    const token = await sms.sendOtp(req.body.mobile);
    res.json({ token: token });
}


// Verify User OTP
const verifyOtp = async(req, res) => {
    const { data } = req.body
    const token = decodeURIComponent(req.body?.token);
    const otp = req.body?.otp;
    const isVaild = sms.verifyOTP({ token, otp });
    if(isVaild){
        await telegram.sendBooking(data)
        await mail.sendBooking(data)
        const bookingFbID = await firebase.saveBooking(data)
        res.status(200).json({ msg: "Verified", status: 200, bookingFbID })
    }else{
        res.status(401).json({msg: "Otp failed", status: 401})
    }
}


module.exports = {
    sendOtp,
    verifyOtp
}