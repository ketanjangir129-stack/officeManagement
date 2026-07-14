import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ref, get } from "firebase/database";
import { db } from "../../firebase/firebase";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!username.trim()) {
            toast.error("Username / Employee ID is required");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }

        try {

            const result = await login(
                username,
                password
            );

            if (!result.success) {
                toast.error("Invalid Credentials");
                return;
            }

            toast.success("Login Successful");

            if (result.role === "admin") {
                navigate("/employees");
            }

            if (result.role === "employee") {
                const employeeId = sessionStorage.getItem("employeeId");

                const snapshot = await get(
                    ref(db, `employees/${employeeId}`)
                );

                if (snapshot.exists() && !snapshot.val().passwordChanged) {
                    toast.warning("Please update your password");
                }

                navigate("/employee/tasks");
            }

        } catch (error) {

            console.error(error);
            toast.error("Login Failed");
        }
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) return;
        if (user.role === "admin") {
            navigate("/employees");
        }
        if (user.role === "employee") {
            navigate("/employee/tasks");
        }
    }, []);


    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Office Management
                </h1>

                <p className="text-center text-slate-500 mb-8">
                    Login as Admin or Employee
                </p>

                {/* Username / Employee ID */}

                <input
                    type="text"
                    placeholder="Admin Username or EMP001"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value.replace(/\s/g, ""))
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-500"
                />

                {/* Password */}
                <div className="relative mt-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value.replace(/\s/g, ""))
                        }
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-500"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600 cursor-pointer"
                    >
                        {showPassword ? (
                            <FiEyeOff size={20} />
                        ) : (
                            <FiEye size={20} />
                        )}
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full mt-5 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 cursor-pointer"
                >
                    Login
                </button>
            </div>

        </div>
    );
}

export default Login;