import React from 'react';


import { createUseStyles } from 'react-jss';
import {AiOutlineInfoCircle} from "react-icons/ai";


const useStyles = createUseStyles({
    infoIcon: {
        cursor: 'pointer'
    },
});

const MoreInfoIcon = ({ onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.infoIcon} onClick={onClick}>
            <AiOutlineInfoCircle size="2em"/>
        </div>
    );
};

export default MoreInfoIcon;