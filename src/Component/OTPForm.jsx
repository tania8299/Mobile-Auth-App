import { useState, useContext } from "react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OTPForm({ mobile, serverOtp }) {
    const [otp, setOtp] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const verifyOtp = async () => {
        if (otp !== serverOtp) {
            alert("Invalid OTP");
            return;
        }

        const res = await login({ mobile });

        if (res.data.user) {
            loginUser(res.data.token);
            navigate("/home");
        } else {
            navigate("/register");
        }
    };

    return (
        <div className="space-y-3">
            <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={verifyOtp}>Verify OTP</Button>
        </div>
    );
}