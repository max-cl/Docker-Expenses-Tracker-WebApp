import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Material UI
// CssBaseline to protect basic browser styles
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import AppBarInteraction from './components/Containers/AppBarInteraction';

// Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Actions
import { loadUser } from './redux/thunks/auth.thunk';

// Utils
import { PrivateRoute } from './utils';

// Pages
import Error from './pages/Error';

const App: React.FC<{}> = () => {
    // Redux
    const dispatch = useDispatch();

    // function getResolution() {
    //     alert(
    //         "Your screen resolution is: " +
    //             window.screen.width * window.devicePixelRatio +
    //             "x" +
    //             window.screen.height * window.devicePixelRatio,
    //     );
    // }

    useEffect(() => {
        // getResolution();
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect exact to="/app/dashboard" />} />
                    <Route exact path="/app" render={() => <Redirect exact to="/app/dashboard" />} />
                    <PrivateRoute path="/app" component={AppBarInteraction} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/resetpassword/:token" component={ResetPassword} />
                    <Route path="*" component={Error} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
