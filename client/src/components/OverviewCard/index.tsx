import React from 'react';

// Material UI
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Components
import Card from '../Common/Card';
import Spinner from '../Common/Spinner';

// Styles
import { useStyles } from './styles';

export interface IProps {
    [key: string]: {
        amount: number;
        title: string;
        description: string;
        imgpath: string;
    }[];
}

const imgpath_NO_DATA_FOUND = '/images/no_data_found.svg';

const OverviewCard: React.FC<IProps> = ({ data }) => {
    // Material UI
    const classes = useStyles();

    if (data.length === 0) {
        return (
            <div className={classes.containerSpinner}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className={classes.container}>
            {data.map((d, index) => (
                <>
                    {d === undefined ? (
                        <Card key={index} customClasses={classes.card}>
                            <CardContent>
                                <Typography variant="subtitle1" color="textPrimary" component="h3" align="center">
                                    NO DATA FOUND
                                </Typography>
                                <div className={classes.containerNotFound}>
                                    <img
                                        src={process.env.PUBLIC_URL + `${imgpath_NO_DATA_FOUND}`}
                                        className={classes.image}
                                        alt="no_data_found"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card key={index} customClasses={classes.card}>
                            <CardContent className={classes.content}>
                                <img src={process.env.PUBLIC_URL + `${d.imgpath}`} className={classes.image} alt={d.title} />
                                <div className={classes.infoContent}>
                                    <div>
                                        <Typography gutterBottom variant="h1" component="h1" className={classes.amountText}>
                                            $ {d.amount}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1" color="textPrimary" component="h3" className={classes.title}>
                                            {d.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" component="p" className={classes.description}>
                                            {d.description}
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            ))}
        </div>
    );
};

export default OverviewCard;
