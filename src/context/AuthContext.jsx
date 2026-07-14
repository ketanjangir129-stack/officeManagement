import {createContext,useContext,useState} from "react";

import { ref, get, update, onDisconnect } from "firebase/database";
import { db } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    const login = async (
        username,
        password
    ) => {

        // ADMIN LOGIN

        const adminSnapshot =
            await get(ref(db, "admins"));

        const admins =
            adminSnapshot.val() || {};

        const admin =
            Object.values(admins).find(
                (item) =>
                    item.username === username &&
                    item.password === password
            );

        if (admin) {

            const adminData = {
                role: "admin",
                username
            };

            sessionStorage.setItem(
                "user",
                JSON.stringify(adminData)
            );

            setUser(adminData);

            return {
                success: true,
                role: "admin"
            };
        }

        // EMPLOYEE LOGIN

        const employeeSnapshot =
            await get(ref(db, "employees"));

        const employees =
            employeeSnapshot.val() || {};

        const employee =
            Object.entries(employees).find(
                ([id, data]) =>
                    data.employeeId === username &&
                    data.password === password
            );

        if (employee) {

            const [id, data] = employee;

            // Make Employee Active / Online
            const employeeRef = ref(db,`employees/${id}`);

            await update(employeeRef, {
                isOnline: true
            });

            // Auto Offline when connection closes
            onDisconnect(employeeRef).update({
                isOnline: false
            });

            const employeeData = {
                id,
                role: "employee",
                employeeId:
                    data.employeeId
            };

            sessionStorage.setItem("user",JSON.stringify(employeeData));

            sessionStorage.setItem("employeeId",id);

            setUser(employeeData);

            return {
                success: true,
                role: "employee"
            };
        }

        return {
            success: false
        };
    };

    const logout = () => {

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("employeeId");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);