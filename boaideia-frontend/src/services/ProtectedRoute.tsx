import { Router } from "next/router";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }: { router: Router, children: any }) => {

    const context = useContext(UserContext);

    enum routers { STARTUP = "/", LOGIN = "/login", REGISTER = "/register", RECOVER = '/recover' }
    const unprotectedRoutes = [
        routers.STARTUP,
        routers.LOGIN,
        routers.REGISTER,
        routers.RECOVER
    ];

    let pathIsProtected = !unprotectedRoutes.find(r => r.toString() == router.pathname);

    if (isBrowser() && !context.isLogged() && pathIsProtected) {
        router.push(routers.STARTUP);
    }

    return children;
};

export default ProtectedRoute;