import * as React from "react";
import PropTypes, {InferProps} from 'prop-types';
import Button from "@mui/material/Button";
import {useLocation} from "@reach/router";
import {getAuth} from 'firebase/auth';
import {useAuth} from "../auth-provider";
import Link from "../link";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";

export default function DashboardNavigation({type}: InferProps<typeof DashboardNavigation.propTypes>) {
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
            type === 'button' ? (
                <Button
                    sx={{my: 2, color: 'inherit', display: 'block'}}
                    onClick={handleLogoutClick}
                >
                    Logout
                </Button>
            ) : (
                <MenuItem onClick={handleLogoutClick}>
                    <Typography>
                        Logout
                    </Typography>
                </MenuItem>
            )
        )
    }
    // render link to dashboard if somewhere else
    return (
        type === 'button' ? (
            <Link to="/app/dashboard/" sx={{ color: 'inherit' }}>
                <Button
                    sx={{my: 2, color: 'inherit', display: 'block'}}
                >
                    Dashboard
                </Button>
            </Link>
        ) : (
            <Link to="/app/dashboard/">
                <MenuItem>
                    Dashboard
                </MenuItem>
            </Link>
        )
    )
}

DashboardNavigation.propTypes = {
    type: PropTypes.oneOf(['menu', 'button'])
}

DashboardNavigation.defaultProps = {
    type: "button"
}