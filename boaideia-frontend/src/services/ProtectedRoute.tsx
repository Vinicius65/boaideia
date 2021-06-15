import { Router } from "next/router";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }: { router: Router, children: any }) => {

    const context = useContext(UserContext);
    const user = context.getUser();
    const isAuthenticated = !!user ? true : false;

    enum routers { HOME = "", LOGIN = "login", REGISTER = "register" }
    const unprotectedRoutes = [
        routers.HOME,
        routers.LOGIN,
        routers.REGISTER
    ];

    let pathIsProtected = !unprotectedRoutes.find(r => r.toString() == router.pathname);

    if (isBrowser() && !isAuthenticated && pathIsProtected) {
        router.push(routers.LOGIN);
    }

    return children;
};

export default ProtectedRoute;