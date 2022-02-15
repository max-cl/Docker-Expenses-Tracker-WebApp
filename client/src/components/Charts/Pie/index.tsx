import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chartjs, { ChartConfiguration } from 'chart.js';
import { red, green, yellow, blue, orange, purple } from '@material-ui/core/colors';

// Components
import Spinner from '../../Common/Spinner';

// Material-UI
import Typography from '@material-ui/core/Typography';

// Styles
import { useStyles } from './styles';

const backGroundColors = [red[500], green[500], yellow[500], blue[500], orange[500], purple[500]];

export interface IPieProps {
    [key: string]: {
        labels: string[];
        value: number[];
        title: string;
        label: string;
    };
}

const imgpath_NO_DATA_FOUND = '/images/no_data_found.svg';

const Pie: React.FC<IPieProps> = ({ data }) => {
    // Material UI
    const classes = useStyles();
    // Local States
    const [chartInstance, setChartInstance] = useState<Chartjs>();
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    // Chart config
    const chartConfig = useMemo(() => {
        const config: ChartConfiguration = {
            type: 'doughnut',
            data: {
                labels: data === undefined ? [''] : data.labels,
                datasets: [
                    {
                        label: data === undefined ? '' : data.label,
                        borderColor: 'white',
                        backgroundColor: backGroundColors,
                        data: data === undefined ? [] : data.value,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: 'white',
                        boxWidth: 10,
                        fontSize: 10,
                    },
                },
                title: {
                    display: true,
                    text: data === undefined ? '' : data.title,
                    fontColor: 'white',
                },
            },
        };
        return config;
    }, [data]);

    useEffect(() => {
        const canvas = canvasRef;
        const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
        if (chartInstance !== undefined) {
            chartInstance!.destroy();
        }
        if (data !== undefined && ctx) {
            const newChartInstance = new Chartjs(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [data]);

    if (data === undefined) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />
            </div>
        );
    }
    if (Object.keys(data).length === 0) {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '45%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1" color="textPrimary" component="h3" align="center">
                        NO DATA FOUND
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={process.env.PUBLIC_URL + `${imgpath_NO_DATA_FOUND}`} className={classes.image} alt="no_data_found" />
                </div>
            </div>
        );
    }

    return (
        <div className={classes.chartContainer}>
            <canvas ref={canvasRef} width="100" height="100" role="chart"></canvas>
        </div>
    );
};

export default Pie;
