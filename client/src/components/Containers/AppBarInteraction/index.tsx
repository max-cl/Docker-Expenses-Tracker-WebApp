import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";

// Pages
import Dashboard from "../../../pages/Dashboard";
import Expense from "../../../pages/Expenses";
import Profile from "../../../pages/Profile";

// Components
import MyDrawer from "../../Drawer";
import MyToolBar from "../../ToolBar";

// Router
import { PrivateRoute } from "../../../utils";

// Styles
import { useStyles } from "./styles";

// Types
import { RootState } from "../../../redux/reducers";

const sectionsInfo = [
    { label: "Dashboard", path: "/app/dashboard" },
    { label: "Expenses", path: "/app/expenses" },
    { label: "Profile", path: "/app/profile" },
];

const AppBarInteraction: React.FC<{}> = () => {
    // Material UI
    const classes = useStyles();
    // Local States
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Dashboard");
    // Global States
    const userInfo = useSelector((state: RootState) => state.auth.user);

    const handleDrawer = () => setOpen(!open);
    const onSectionClick = (label: string) => setTitle(label);

    return (
        <div className={classes.root}>
            <MyToolBar open={open} handleDrawer={handleDrawer} title={title} fullName={`${userInfo.first_name} ${userInfo.last_name}`} />
            <MyDrawer open={open} handleDrawer={handleDrawer} sectionsInfo={sectionsInfo} onSectionClick={onSectionClick}>
                <Switch>
                    <PrivateRoute exact path="/app/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/app/expenses" component={Expense} />
                    <PrivateRoute exact path="/app/profile" component={Profile} />
                </Switch>
            </MyDrawer>
        </div>
    );
};

export default AppBarInteraction;
