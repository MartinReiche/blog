import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import {Dispatch, SetStateAction} from "react";

export type User = {
    isAuthenticated: boolean
    isAdmin: boolean
    listening?: boolean
}

const defaultUser: User = {
    isAdmin: false,
    isAuthenticated: false,
    listening: false
}

const AuthContext = React.createContext<{ user: User, setUser: Dispatch<SetStateAction<User>>}>({
    user: defaultUser,
    setUser: () => {}
})

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({children}: InferProps<typeof AuthProvider.propTypes>) {
    const [user, setUser] = React.useState(defaultUser);

    // when the app loads
    React.useEffect(() => {
        // retrieve the user object and if there is one, load the whole firebase stuff and check auth status
        const user: User = JSON.parse(localStorage.getItem('user') as string);
        if (user?.isAuthenticated) checkAuthentication();
    },[])

    React.useEffect(() => {
        if (user.isAuthenticated && !user.listening) checkAuthentication();
    },[user])

    const checkAuthentication = async () => {
        const {getFirebase} = await import('../../utils/getFirebase');
        const {getAuth, onAuthStateChanged, getIdTokenResult} = await import('firebase/auth');
        const auth = getAuth(getFirebase());
        onAuthStateChanged(auth,async (user) => {
            if (user) {
                const idTokenResult = await getIdTokenResult(user);
                const userState = {isAuthenticated: true, isAdmin: !!idTokenResult.claims.admin};
                setUser({...userState, listening: true});
                localStorage.setItem('user', JSON.stringify(userState));
            } else {
                setUser({...defaultUser, listening: true});
                localStorage.setItem('user', JSON.stringify({ isAuthenticated: false, isAdmin: false}));
            }
        })
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;