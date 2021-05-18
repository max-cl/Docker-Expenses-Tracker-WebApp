import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import BarChart from '../../Charts/Bar';
import PieChart from '../../Charts/Pie';
import LineChart from '../../Charts/Line';
import OverviewCard from '../../OverviewCard';
import MainCards from '../../MainCards';

// Actions
import { getDashboardData } from '../../../redux/thunks/dashboard.thunk';
import { getExpenses } from '../../../redux/thunks/expenses.thunk';

// Types
import { RootState } from '../../../redux/reducers';

// Styles
import { useStyles } from './styles';

const Dashboard: React.FC<{}> = () => {
    // React router
    let history = useHistory();
    // Material UI
    const classes = useStyles();
    // To use the actions
    const dispatch = useDispatch();

    // Global States (Redux Store)
    const userInfo = useSelector((state: RootState) => state.auth.user);
    const dashboardData = useSelector((state: RootState) => state.dashboard.dashboardData);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        } else {
            if (Object.keys(userInfo).length > 0) {
                dispatch(getDashboardData(userInfo.user_id));
                dispatch(getExpenses(userInfo.user_id));
            }
        }
    }, [isAuthenticated, userInfo, history, dispatch]);

    return (
        <div className={classes.mainContainer}>
            <OverviewCard
                data={[
                    dashboardData.highestCategory,
                    dashboardData.lowestCategory,
                    dashboardData.totalToday,
                    dashboardData.mostSpending,
                    dashboardData.currentMonthBudget,
                    dashboardData.moneySaved,
                ]}
            />
            <MainCards
                chart1={<PieChart data={dashboardData.topFiveCategoriesYearly} />}
                chart2={<BarChart data={dashboardData.monthlyBudgets} />}
                chart3={<BarChart data={dashboardData.weeksOfTheYear} />}
                chart4={<LineChart data={dashboardData.totalMonthsYearly} />}
                chart5={<LineChart data={dashboardData.currentWeek} />}
            />
        </div>
    );
};

export default Dashboard;
