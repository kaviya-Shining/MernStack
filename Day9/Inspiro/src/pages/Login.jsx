import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Github, Twitter } from "lucide-react";
import toast from "react-hot-toast";
import "../styles/global.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        toast.success("Welcome to Inspiro!");
        navigate("/home");
    };

    const socialLogin = (provider) => {
        toast.success(`Logging in with ${provider}...`);
        setTimeout(() => navigate("/home"), 1000);
    };

    return (
        <motion.div
            className="page-container login-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="login-card">
                <div className="brand">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="brand-logo">✨</motion.div>
                    <h1>Inspiro</h1>
                    <p>Your daily quotes & inspiration</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        <LogIn size={20} /> Continue with Email
                    </button>
                </form>

                <div className="divider"><span>or social login</span></div>

                <div className="social-logins">
                    <button onClick={() => socialLogin("Github")} className="btn-social github">
                        <Github size={20} /> GitHub
                    </button>
                    <button onClick={() => socialLogin("Twitter")} className="btn-social twitter">
                        <Twitter size={20} /> Twitter
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
