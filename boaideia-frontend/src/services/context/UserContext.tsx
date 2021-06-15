import { createContext, Dispatch, SetStateAction, useState } from "react";
import Cookies from 'js-cookie';
import { TUser } from "../../types";

type TUserContext = {
    getUser: () => TUser | null;
    setUser: (user: TUser) => void
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

    const setUserAndSaveOnCookie = (user: TUser) => {
        setUser(user);
        Cookies.set('user', JSON.stringify(user));
    }

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
            setUser: setUserAndSaveOnCookie
        }}>
            {children}
        </UserContext.Provider>
    )
}
