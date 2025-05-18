import React from 'react';
import { createUseStyles } from 'react-jss';
import { AiOutlineDelete } from 'react-icons/ai';

const useStyles = createUseStyles({
    modalBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
    },
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        margin: '0 10px',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
    },
    confirmButton: {
        backgroundColor: 'green',
        color: 'white',
    },
});

const LoginConfirmation = ({ onConfirm, onCancel }) => {
    const classes = useStyles();

    return (
        <div className={classes.modalBackground}>
            <div className={classes.modalContainer}>
                <p>Login</p>
                <div className={classes.buttonContainer}>
                    <div className={classes.button} onClick={onCancel}>Back</div>
                    <div className={`${classes.button} ${classes.confirmButton}`} onClick={onConfirm}>Login</div>
                </div>
            </div>
        </div>
    );
};

export default LoginConfirmation;
