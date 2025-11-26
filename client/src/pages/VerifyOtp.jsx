import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const LENGTH = 6;
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // email passed through navigate
  const email = location.state?.email || "";

  const [values, setValues] = useState(Array(LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // if no email → redirect back to register
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, idx) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;

    const next = [...values];
    next[idx] = digit;
    setValues(next);

    if (idx < LENGTH - 1) {
      setTimeout(() => inputsRef.current[idx + 1]?.focus(), 0);
    }
  };

  const submitOtp = async () => {
    setError("");

    const otpString = values.join("");

    if (otpString.length !== 6 || values.includes("")) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpString }),
        }
      );

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      // On success → go to login page
      navigate("/login", {
        state: { verified: true },
      });

    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        
        <div className="p-8 sm:p-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-3 shadow-lg">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Verify your account</h2>
            <p className="text-sm text-slate-500">
              Enter the 6-digit code sent to{" "}
              <span className="text-emerald-600 font-semibold">{email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {values.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={val}
                onChange={(e) => handleChange(e, i)}
                maxLength={1}
                inputMode="numeric"
                className={`w-12 h-14 text-center text-lg font-bold rounded-lg border shadow-sm outline-none transition 
                ${val ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-slate-300"}`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-center text-sm mb-2">{error}</p>
          )}

          {/* Verify Button */}
          <button
            onClick={submitOtp}
            disabled={loading}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition ${
              loading
                ? "bg-emerald-400"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            }`}
          >
            Verify
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="px-6 py-4 bg-slate-50 text-center text-sm text-slate-500">
          Protected by enterprise-grade security • Groovo
        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;
