import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";

// Material UI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import TableChartIcon from "@material-ui/icons/TableChart";

// Interface
import { IProps } from "./interfaces";

// Styles
import { useStyles } from "./styles";

const MyDrawer: React.FC<IProps> = ({ open, handleDrawer, sectionsInfo, onSectionClick, children }) => {
    // Material UI
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawer}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                </div>

                <Divider />

                <List>
                    {sectionsInfo.map((d, index) => (
                        <ListItem button key={d.label} component={Link} to={d.path} onClick={() => onSectionClick(d.label)}>
                            <ListItemIcon>{index % 2 === 0 ? <BarChartIcon /> : <TableChartIcon />}</ListItemIcon>
                            <ListItemText primary={d.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </>
    );
};

export default MyDrawer;
