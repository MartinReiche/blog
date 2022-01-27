import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import getFirebase from "../../utils/getFirebase";
import {getAuth} from 'firebase/auth';
import {Dispatch, SetStateAction} from "react";

type User = {
    isAuthenticated: boolean
    isAdmin: boolean
    uid?: string
    displayName?: string
    isLoading: boolean
}

const defaultUser: User = {
    isAdmin: false,
    isAuthenticated: false,
    isLoading: true
}

const AuthContext = React.createContext<{ user: User, setUser: Dispatch<SetStateAction<User>>}>({
    user: defaultUser,
    setUser: () => {}
})

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({children}: InferProps<typeof AuthProvider.propTypes>) {
    const [user, setUser] = React.useState(defaultUser);

    React.useEffect(() => {
        const auth = getAuth(getFirebase());


        const cancelAuthListener = auth
            .onAuthStateChanged(async function(user) {
                if (user) {
                    const { claims } = await user.getIdTokenResult();
                    setUser({
                        isAuthenticated: true,
                        isAdmin: !!claims.admin || false,
                        uid: user.uid,
                        displayName: user.displayName || '',
                        isLoading: false
                    });
                } else {
                    setUser({ ...defaultUser, isLoading: false });
                }
            });
        return function cleanup() {
            cancelAuthListener();
        }
    },[])

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