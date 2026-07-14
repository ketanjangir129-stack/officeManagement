import { useState } from "react";
import { ref, update } from "firebase/database";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function ChangePasswordModal({employee,onClose,}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChangePassword = async () => {
        if (currentPassword !== employee.password) {
            toast.error("Current password incorrect");
            return;
        }

        if (!newPassword.trim()) {
            toast.error("Password cannot be empty");
            return;
        }

        if (newPassword.trim().length < 6) {
            toast.error( "Password must be at least 6 characters" );
            return;
        }

        try {
            await update(
                ref(db, `employees/${employee.id}`),
                {
                    password: newPassword,
                    passwordChanged: true,
                }
            );

            toast.success(
                "Password changed successfully"
            );

            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update password");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 shadow-2xl">

                {/* Header */}

                <div className="border-b border-slate-700 px-6 py-5">

                    <h2 className="text-xl font-bold text-white">
                        Change Password
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Update your account password
                    </p>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Current Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showCurrentPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value.replace(/\s/g, ""))
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-600
                                    bg-slate-900
                                    px-4
                                    py-3
                                    pr-12
                                    text-white
                                    placeholder:text-slate-500
                                    outline-none
                                    focus:border-violet-500
                                    focus:ring-4
                                    focus:ring-violet-500/20
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword(
                                        !showCurrentPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                {showCurrentPassword ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </button>

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            New Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showNewPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value.replace(/\s/g, ""))
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-600
                                    bg-slate-900
                                    px-4
                                    py-3
                                    pr-12
                                    text-white
                                    placeholder:text-slate-500
                                    outline-none
                                    focus:border-violet-500
                                    focus:ring-4
                                    focus:ring-violet-500/20
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(
                                        !showNewPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                {showNewPassword ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </button>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-5">

                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            border-slate-600
                            px-5
                            py-2.5
                            font-medium
                            text-slate-300
                            transition
                            hover:bg-slate-700
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleChangePassword}
                        className="
                            rounded-xl
                            bg-violet-600
                            px-5
                            py-2.5
                            font-medium
                            text-white
                            transition
                            hover:bg-violet-700
                            cursor-pointer
                        "
                    >
                        Update Password
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ChangePasswordModal;