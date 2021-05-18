import React, { useState } from 'react';
import clsx from 'clsx';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Interface
import { IProps } from './interfaces';

// Styles
import { useStyles } from './styles';

// Components
import MenuAccount from '../MenuAccount';

const MyToolBar: React.FC<IProps> = ({ open, handleDrawer, title, fullName }) => {
    // Material UI
    const classes = useStyles();

    // // Local States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ fontWeight: 800 }} noWrap>
                        {title}
                    </Typography>
                    <div style={{ position: 'absolute', right: 72 }}>
                        <Typography variant="subtitle1">{fullName}</Typography>
                    </div>
                    <MenuAccount anchorEl={anchorEl} handleMenu={handleMenu} handleClose={handleClose} />
                </Toolbar>
            </AppBar>
        </>
    );
};

export default MyToolBar;
