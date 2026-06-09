import otpGenerator from "otp-generator";
export const generateOTP = () => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
};
//# sourceMappingURL=otp.generate.util.js.map