import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import useTheme from "../../misc/hooks/useTheme";
import BasketIcon from "../icons/BasketIcon";
import DeleteConfirmation from '../deleteconfirmation/DeleteConfirmation';
import MoreInfoIcon from "../icons/MoreInfoIcon";
import pagesURLs from "../../constants/pagesURLs";
import * as pages from "../../constants/pages";

const getClasses = createUseStyles(theme => ({
    container: {
        position: 'relative',
        padding: theme.spacing(2),
        border: `2px solid black`,
        backgroundColor: `grey`,
        transition: 'transform 0.4s',
        '&:hover': {
            transform: 'scale(1.1)',
            border: `3px solid yellow`,
            '& div': {
                fontWeight: 'bold',
                color: 'yellow'
            }
        },
        marginBottom: theme.spacing(2),
    },
    basketIcon: {
        position: 'absolute',
        top: '2px',
        right: '7px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    moreInfoButton: {
        position: 'absolute',
        bottom: '2px',
        right: '7px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    containerHovered: {
        '&:hover $basketIcon, $moreInfoButton': {
            opacity: 1,
        },
    },
}));

const Item = ({employee, deleteFunc}) => {
    const {theme} = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const classes = getClasses({theme});

    const handleMoreInfo = () => {
        window.location.href = `${pagesURLs[pages.employeeInfoPage]}?employee=${JSON.stringify(employee)}`;
    };

    const handleDelete = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirm = () => {
        fetch(employee.selfLink, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setIsConfirmationOpen(false);
                    deleteFunc(employee.selfLink)
                } else {

                }
                setIsConfirmationOpen(false);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                setIsConfirmationOpen(false);
            });
    };

    const handleCancel = () => {
        setIsConfirmationOpen(false);
        setIsHovered(false);
    };


    if (isConfirmationOpen) {
        return <DeleteConfirmation onConfirm={handleConfirm} onCancel={handleCancel}/>
    }

    return (
        <div
            className={`${classes.container} ${isHovered ? classes.containerHovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div className={classes.basketIcon} onClick={handleDelete}>
                    <BasketIcon/>
                </div>
            )}
            {isHovered && (
                <div className={classes.moreInfoButton} onClick={handleMoreInfo}>

                    <MoreInfoIcon/>


                </div>
            )}
            <div>Name: {employee.name}</div>
            <div>Surname: {employee.surname}</div>
            {isConfirmationOpen && <DeleteConfirmation onConfirm={handleConfirm} onCancel={handleCancel}/>}

        </div>
    );
};

export default Item;
