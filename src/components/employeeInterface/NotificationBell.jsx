import {useState,useEffect} from "react";
import { FiBell, FiClock, FiX } from "react-icons/fi";
import { subscribeNotifications } from "../../services/notificationService";
import { subscribeTasks } from "../../services/taskService";

function NotificationBell(){

    const employeeId = localStorage.getItem("employeeId");
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [tasks, setTasks] = useState({});

    const getTimeAgo = (timestamp) => {
        const seconds = Math.floor(
            (Date.now() - timestamp) / 1000
        );

        if (seconds < 60)
            return "Just now";

        if (seconds < 3600)
            return `${Math.floor(
            seconds / 60
            )} min ago`;

        if (seconds < 86400)
            return `${Math.floor(
            seconds / 3600
            )} hour ago`;

        return `${Math.floor(
            seconds / 86400
        )} day ago`;
    };
    
    useEffect(() => {
        if (!employeeId) return;
        const unsubscribe = subscribeNotifications(employeeId,(data) => {
                    const list =
                        Object.entries(data).map(
                            ([id, value]) => ({
                                id,
                                ...value,
                            })
                    );
                    setNotifications(list.reverse());
                }
            );
        return () => unsubscribe();
    }, [employeeId]);
    useEffect(() => {
        const unsubscribe = subscribeTasks((data) => {
            setTasks(data);
        });

        return () => unsubscribe();
    }, []);

    return(
        <div className="relative">

            <button 
                onClick={() =>setShowPopup(!showPopup)}
                className="relative cursor-pointer"
            >
                <FiBell size={24} />
                {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>
            {showPopup && (
                <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl z-50">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-gradient-to-r from-violet-50 to-purple-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                                <FiBell size={18} />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800">
                                    Notifications
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Recent updates
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPopup(false)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                        >
                            <FiX size={18} />
                        </button>

                    </div>

                    {/* Body */}
                    <div className="max-h-[300px] overflow-y-auto hide-scrollbar">

                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                                    <FiBell size={28} />
                                </div>

                                <p className="mt-4 font-medium text-slate-600">
                                    No Notifications
                                </p>

                                <p className="text-sm text-slate-400">
                                    You're all caught up
                                </p>

                            </div>
                        ) : (

                            notifications.map((notification) => (

                                <div
                                    key={notification.id}
                                    className="border-b border-slate-100 p-4 transition hover:bg-violet-50/50"
                                >

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3">
                                            <div>
                                                <div
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        notification.type === "unassign"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-violet-100 text-violet-700"
                                                    }`}
                                                >
                                                    {notification.message}
                                                </div>

                                                <h4 className="mt-2 font-semibold text-slate-800">
                                                    {tasks[notification.taskId]?.title || "Task"}
                                                </h4>
                                            </div>

                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                                            <FiClock size={12} />
                                            {getTimeAgo(notification.createdAt)}
                                        </div>

                                    </div>

                                </div>
                            ))

                        )}

                    </div>

                </div>
            )}
        </div>
    )
}
export default NotificationBell;