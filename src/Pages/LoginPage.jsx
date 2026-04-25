import { useState } from "react";
import LoginForm from "../Component/LoginForm";
import OTPForm from "../Component/OTPForm";

export default function LoginPage() {
  const [mobile, setMobile] = useState(null);
  const [otp, setOtp] = useState(null);

  return (
    <div className="flex justify-center mt-20">
      {!mobile ? (
        <LoginForm
          onOtpSent={(mob, otp) => {
            setMobile(mob);
            setOtp(otp);
          }}
        />
      ) : (
        <OTPForm mobile={mobile} serverOtp={otp} />
      )}
    </div>
  );
}