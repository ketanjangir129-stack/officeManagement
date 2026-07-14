import { Navigate} from "react-router-dom";

function AdminProtectedRoute({children}) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user ||user.role !== "admin") {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default AdminProtectedRoute;