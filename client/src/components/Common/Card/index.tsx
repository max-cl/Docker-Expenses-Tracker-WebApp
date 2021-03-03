import React from "react";
import clsx from "clsx";

// Material UI
import Card from "@material-ui/core/Card";

// Interface
import { IProps } from "./interfaces";

// Styles
import { useStyles } from "./styles";

const MyCard: React.FC<IProps> = ({ children, customClasses }) => {
    // Material UI
    const classes = useStyles();

    return <Card className={clsx(classes.root, customClasses)}>{children}</Card>;
};

export default MyCard;
