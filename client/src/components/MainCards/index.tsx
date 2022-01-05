import React from 'react';

// Components
import Card from '../Common/Card';

// Styles
import { useStyles } from './styles';

export interface IProps {
    chart1: React.ReactNode;
    chart2: React.ReactNode;
    chart3: React.ReactNode;
    chart4: React.ReactNode;
    chart5: React.ReactNode;
}

const MainCards: React.FC<IProps> = ({ chart1, chart2, chart3, chart4, chart5 }) => {
    // Material UI
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card customClasses={classes.card}>{chart1}</Card>
            <Card customClasses={classes.card}>{chart2}</Card>
            <Card customClasses={classes.card}>{chart3}</Card>
            <Card customClasses={classes.card}>{chart4}</Card>
            <Card customClasses={classes.card}>{chart5}</Card>
        </div>
    );
};

export default MainCards;
