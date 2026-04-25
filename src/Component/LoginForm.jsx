import { useState } from "react";
import { sendOtp } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm({ onOtpSent }) {
    const [mobile, setMobile] = useState("");
    const [serverOtp, setServerOtp] = useState("");

    const handleSendOtp = async () => {
        const res = await sendOtp({ mobile });

        setServerOtp(res.data.otp);

        onOtpSent(mobile, res.data.otp);
    };

    return (
        <div className="space-y-3">
            <Input
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <Button onClick={handleSendOtp}>Send OTP</Button>
        </div>
    );
}