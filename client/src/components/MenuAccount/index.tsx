import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material UI
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";

// Actions
import { logout } from "../../redux/thunks/auth.thunk";

// Interface
import { IProps } from "./interfaces";

const MenuAccount: React.FC<IProps> = ({ anchorEl, handleMenu, handleClose }) => {
    // Redux
    const dispatch = useDispatch();

    // Router
    const history = useHistory();

    const items = [
        { id: 0, label: "Profile", func: () => history.push("/app/profile") },
        { id: 1, label: "Logout", func: () => dispatch(logout(history)) },
    ];

    return (
        <div style={{ position: "absolute", right: 24 }}>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item) => (
                    <MenuItem onClick={item.func} key={item.id}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuAccount;
