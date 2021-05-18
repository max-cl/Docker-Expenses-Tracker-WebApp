import React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// Styles
import { useStyles } from "./styles";

interface IProps {
    userInfo: {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
    };
    children: React.ReactNode;
}

const ProfileInformation: React.FC<IProps> = ({ userInfo, children }) => {
    // Material UI
    const classes = useStyles();

    return (
        <div className={classes.cardDetail}>
            <img src="https://fakeimg.pl/440x320/" alt="User image" className={classes.imgUser} />

            <div className={classes.userInfoContainer}>
                <Typography variant="h3" className={classes.title}>
                    {userInfo.first_name} {userInfo.last_name}
                </Typography>
                <div style={{ display: "grid", justifyContent: "center" }}>
                    <Typography variant="body2" className={classes.typeInfo}>
                        Username
                    </Typography>
                    <Typography variant="subtitle1">{userInfo.username}</Typography>
                </div>
                <div style={{ display: "grid", justifyContent: "center" }}>
                    <Typography variant="body2" className={classes.typeInfo}>
                        Email
                    </Typography>
                    <Typography variant="subtitle1">{userInfo.email}</Typography>
                </div>
            </div>
            <div className={classes.buttonsContainer}>{children}</div>
        </div>
    );
};

export default ProfileInformation;
