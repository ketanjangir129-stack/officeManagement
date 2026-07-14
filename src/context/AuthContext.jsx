import {createContext,useContext,useState} from "react";

import { ref, get, update } from "firebase/database";
import { db } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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

            localStorage.setItem(
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
            await update(
                ref(db, `employees/${id}`),
                {
                    isOnline: true
                }
            );
            

            const employeeData = {
                id,
                role: "employee",
                employeeId:
                    data.employeeId
            };

            localStorage.setItem(
                "user",
                JSON.stringify(employeeData)
            );

            localStorage.setItem(
                "employeeId",
                id
            );

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

        localStorage.removeItem("user");
        localStorage.removeItem("employeeId");
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