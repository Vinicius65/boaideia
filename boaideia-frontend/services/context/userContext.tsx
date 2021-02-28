import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TUser } from "../../types";
import Cookies from 'js-cookie';

type TUserContext = {
    getUser: () => TUser | null;
    setUser: (user: TUser) => void
}

export const UserContext = createContext({} as TUserContext)

export default function UserProvider({ children }) {

    const [user, setUser] = useState<TUser>({
        email: '',
        id: 0,
        name: '',
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
            { children}
        </UserContext.Provider>
    )
}
