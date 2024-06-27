import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    basketIcon: {
        cursor: 'pointer'
    },
});

const BasketIcon = ({ onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.basketIcon} onClick={onClick}>
            <AiOutlineDelete size="2em" />
        </div>
    );
};

export default BasketIcon;
