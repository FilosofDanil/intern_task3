import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Typography from "../../../components/Typography";
import { createUseStyles } from 'react-jss';
import {useIntl} from "react-intl";
import {Button} from "@mui/material";
import {AiOutlineStepBackward, AiTwotoneEdit, AiTwotoneHome} from "react-icons/ai";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const useStyles = createUseStyles({
    container: {
        padding: '20px',
        backgroundColor: 'grey',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '28px',
        borderRadius: '12px',
        transition: 'background-color 0.3s',
        width: 'fit-content',
        height: "30vh",
        margin: 'auto',
        marginTop: '20px',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '25px',
        marginTop: '20px',
    },
    label: {
        textAlign: 'right',
        marginRight: '10px',

    },
    leftBorder:{
        borderLeft: '4px solid black',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderRight: '4px solid black',

    },
    text: {
    },
    buttonContainer: {
        display: 'flex',
        marginTop: '20px',
    },
    backButton: {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '24px',
        color: 'black',
        backgroundColor: 'grey',
        border: '2px solid black',
        borderRadius: '5px',
        padding: '10px 20px',
        '&:hover': {
            border: `3px solid yellow`,
            transform: 'scale(1.3)',
            fontWeight: 'bold',
            color: 'yellow',
        },
        transition: 'transform 0.4s',

    },
    superContainer:{
        padding: '20px',
        width: 'fit-content',
        display: 'grid',
        justifyContent:'center',
        height: "auto",
        margin: 'auto',

    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '50%',
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '20px',
    },
    modalTitle: {
        fontSize: '24px',
        fontWeight: 'bold',

    },
    closeButton: {
        cursor: 'pointer',
    },
    red: {
        backgroundColor: 'red',
    },
    black:{
        backgroundColor: 'black',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '10px',
    },
    formLabel: {
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '18px',
    },
    formInput: {
        padding: '5px',
        fontSize: '16px',
        border: '1px solid black',
        borderRadius: '5px',
        outline: 'none',
    },
    formButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    formButton: {
        padding: '10px 20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: 'yellow',
            color: 'black',
        },
    },
});

const EmployeeMoreInfo = () => {
    const { formatMessage } = useIntl();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const employee = JSON.parse(searchParams.get('employee'));
    const classes = useStyles();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({
        name: employee.name,
        surname: employee.surname,
        salary: employee.salary,
        hiringDate: employee.hiringDate,
        job: employee.job,
        company: {
            name: employee.company.name,
        },
    });
    const handleGoHome = () => {
        window.location.href = `${pagesURLs[pages.defaultPage]}`;
    };
    const handleGoToEmployee = () => {
        window.location.href = `${pagesURLs[pages.employeeDefaultPage]}`;
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };
    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        // Handle saving changes here
        console.log('Saved changes:', editedEmployee);
        setIsEditModalOpen(false);
    };

    const handleClear = () => {
        setEditedEmployee({
            name: '',
            surname: '',
            salary: '',
            hiringDate: '',
            job: '',
            company: {
                name: '',
            },
        });
    };

    return (
        <div>
            <Typography variant="title" align="center">
                {formatMessage({id: 'title'})}
            </Typography>
            <div className={classes.superContainer}>
                <div className={classes.container}>
                    <div className={classes.gridContainer}>
                        <div className={`${classes.infoItem} ${classes.leftBorder}`}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_name'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.name}
                            </div>
                        </div>
                        <div className={classes.infoItem}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_surname'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.surname}
                            </div>
                        </div>
                        <div className={`${classes.infoItem} ${classes.leftBorder}`}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_salary'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.salary}
                            </div>
                        </div>
                        <div className={classes.infoItem}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_hiring_date'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.hiringDate}
                            </div>
                        </div>
                        <div className={`${classes.infoItem} ${classes.leftBorder}`}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_job'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.job}
                            </div>
                        </div>
                        <div className={classes.infoItem}>
                            <div className={classes.label}>
                                {formatMessage({id: 'employee_company_name'})}:
                            </div>
                            <div className={classes.text}>
                                {employee.company.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<AiTwotoneHome/>}
                        className={classes.backButton}
                        onClick={handleGoHome}
                    >
                        {formatMessage({id: 'backButton'})}
                    </Button>
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<AiOutlineStepBackward/>}
                        className={classes.backButton}
                        onClick={handleGoToEmployee}
                    >
                        {formatMessage({id: 'toEmployees'})}
                    </Button>
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<AiTwotoneEdit/>}
                        className={classes.backButton}
                        onClick={handleOpenEditModal}
                    >
                        {formatMessage({id: 'editButton'})}
                    </Button>
                </div>
            </div>
            {isEditModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <div className={classes.modalHeader}>
                            <div className={classes.modalTitle}>
                                {formatMessage({id: 'editTitle'})}
                            </div>
                        </div>
                        <form className={classes.form}>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="name">
                                    {formatMessage({ id: 'employee_name' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedEmployee.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="surname">
                                    {formatMessage({ id: 'employee_surname' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={editedEmployee.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="salary">
                                    {formatMessage({ id: 'employee_salary' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={editedEmployee.salary}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="hiringDate">
                                    {formatMessage({ id: 'employee_hiring_date' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="hiringDate"
                                    name="hiringDate"
                                    value={editedEmployee.hiringDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="job">
                                    {formatMessage({ id: 'employee_job' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="job"
                                    name="job"
                                    value={editedEmployee.job}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="companyName">
                                    {formatMessage({ id: 'employee_company_name' })}
                                </label>
                                <input
                                    className={classes.formInput}
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={editedEmployee.company.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.formButtonContainer}>
                                <button className={`${classes.formButton} ${classes.black}`} onClick={handleCloseEditModal}>
                                    {formatMessage({ id: 'editBack' })}
                                </button>
                                <button className={`${classes.formButton} ${classes.red}`} onClick={handleClear}>
                                    {formatMessage({ id: 'editClear' })}
                                </button>
                                <button className={`${classes.formButton} ${classes.black}`} onClick={handleSaveChanges}>
                                    {formatMessage({ id: 'editSave' })}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeMoreInfo;
