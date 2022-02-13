import React from 'react';
import clsx from 'clsx';

// Material UI
import Modal from '@material-ui/core/Modal';

// Styles
import { useStyles } from './styles';

// Interfaces
import { IProps } from './interfaces';

const MyModal: React.FC<IProps> = ({ open, handleModal, children }) => {
    const classes = useStyles();

    return (
        <Modal open={open} onClose={handleModal} aria-labelledby="modal" aria-describedby="modal">
            <div className={clsx(classes.paper, classes.content)}>{children}</div>
        </Modal>
    );
};

export default MyModal;
