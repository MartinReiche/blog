import * as React from "react";
import Button from "@mui/material/Button";
import {useLocation} from "@reach/router";
import {getAuth} from 'firebase/auth';


import {useAuth} from "../auth-provider";
import Link from "../link";


export default function DashboardNavigation() {
    const [onDashboard, setOnDashboard] = React.useState(false);
    const {user} = useAuth();
    const {pathname} = useLocation();

    React.useEffect(() => {
        const {pathname} = location;
        if (pathname.match(/\/*(de|en)*\/app\/dashboard\/*/gi)) {
            setOnDashboard(true);
        } else {
            setOnDashboard(false);
        }
    }, [pathname])

    const handleLogoutClick = () => {
        getAuth().signOut();
    }

    // render nothing if user is not admin
    if (!user.isAdmin) return null;
    // render logout button if on dashboard
    if (onDashboard) {
        return (
            <Button
                sx={{my: 2, color: 'secondary.light', display: 'block'}}
                onClick={handleLogoutClick}
            >
                Logout
            </Button>
        )
    }
    // render link to dashboard if somewhere else
    return (
        <Link to="/app/dashboard/">
            <Button
                sx={{my: 2, color: 'secondary.light', display: 'block'}}
            >
                Dashboard
            </Button>
        </Link>
    )
}