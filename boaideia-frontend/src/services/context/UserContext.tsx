import { createContext, Dispatch, SetStateAction, useState } from "react";
import Cookies from 'js-cookie';
import { TLogin, TUser } from "../../types";
import Api from "../api/Api";

type TUserContext = {
    getUser: () => TUser | null;
    login: (user: TLogin) => Promise<boolean>;
    logout: () => void;
    isLogged: () => boolean;
}

export const UserContext = createContext({} as TUserContext)

export function UserProvider({ children }: { children: any }) {

    const [user, setUser] = useState<TUser>({
        id: 0,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        numberOfVotation: 0,
        rank: 0,
        token: ''
    })

    const login = async (loginForm: TLogin) => {
        const { login, password } = loginForm;
        try {
            const user = await Api.logar({ login, password })
            Api.setToken(user.token);
            setUser(user);
            Cookies.set('user', JSON.stringify(user));
            return true;

        } catch (ex) {
            console.log(ex);
            return false;
        }

    }

    const logout = () => {
        console.log("sdfsd");
        Cookies.remove("user");
        Api.clearToken();
        setUser({} as TUser);
    }

    const isLogged = () => !!getUserFromContextOrCookie();

    const getUserFromContextOrCookie = () => {
        if (user.token)
            return user;
        const userString = Cookies.get("user");
        if (userString) {
            var recoverUser = JSON.parse(userString) as TUser
            setUser(recoverUser);
            return recoverUser;
        }
        return null;
    }

    return (
        <UserContext.Provider value={{
            getUser: getUserFromContextOrCookie,
            login,
            logout,
            isLogged
        }}>
            {children}
        </UserContext.Provider>
    )
}
