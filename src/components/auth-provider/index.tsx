import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import getFirebase from "../../utils/getFirebase";

type User = {
    isAuthenticated: boolean
    isAdmin: boolean
    uid?: string
    name?: string
}

const defaultUser: User = {
    isAdmin: false,
    isAuthenticated: false
}

const AuthContext = React.createContext(defaultUser);
export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({children}: InferProps<typeof AuthProvider.propTypes>) {
    const [user, setUser] = React.useState(defaultUser);

    React.useEffect(() => {
        const { auth } = getFirebase();

        const cancelAuthListener = auth
            .onAuthStateChanged(async function(user) {
                if (user) {
                    const { claims } = await user.getIdTokenResult()
                    setUser({
                        isAuthenticated: true,
                        isAdmin: !!claims.admin || false,
                        uid: claims.user_id as string,
                        name: claims.name as string || ''
                    });
                } else {
                    setUser(defaultUser);
                }
            });
        return function cleanup() {
            cancelAuthListener();
        }
    },[])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;