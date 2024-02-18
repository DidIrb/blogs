
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center p-3">
            <div className="w-96 min-h-60 border border-gray-300 dark:border-none rounded-lg p-6">
                <Outlet />
            </div>
        </div>
    );
}

export const AdminLayout = () => {
    return (
        <div className="w-screen p-3">
            <h1>Admin View</h1>
            <Outlet />
            <h2>footer</h2>
        </div>
    );
}
