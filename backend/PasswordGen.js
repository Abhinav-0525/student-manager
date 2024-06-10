const length = 10;
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()\/?";
const numset = "0123456789";

function generatePassword() {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function generateOtp() {
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += numset.charAt(Math.floor(Math.random() * numset.length));
    }
    return otp;
}

module.exports = {
    passGen : generatePassword,
    otpGen : generateOtp
} 