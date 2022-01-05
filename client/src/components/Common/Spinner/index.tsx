import React from 'react';

// Material UI
import Spinner from '@material-ui/core/CircularProgress';

const MySpinner: React.FC<{}> = () => {
    return <Spinner color="primary" size={80} />;
};

export default MySpinner;
