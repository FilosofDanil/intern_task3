import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Typography from "../../../components/Typography";
import {createUseStyles} from 'react-jss';
import {useIntl} from "react-intl";
import {Button} from "@mui/material";
import {AiOutlineStepBackward, AiTwotoneEdit, AiTwotoneHome} from "react-icons/ai";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {useDispatch, useSelector} from "react-redux";
import exportFunctions from "../actions/employeeInfo";
import {Notify} from 'notiflix/build/notiflix-notify-aio';

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
    leftBorder: {
        borderLeft: '4px solid black',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderRight: '4px solid black',

    },
    text: {},
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
    superContainer: {
        padding: '20px',
        width: 'fit-content',
        display: 'grid',
        justifyContent: 'center',
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
    black: {
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
    error: {
        color: "red",
        border: '2px solid red',
    },
    errorMsg: {
        color: "red"
    }
});

const EmployeeMoreInfo = () => {
    const {formatMessage} = useIntl();
    const {id} = useParams();
    const classes = useStyles();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isFormSent, setIsFormSent] = useState(false)
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSurnameValid, setIsSurnameValid] = useState(true);
    const [isSalaryValid, setIsSalaryValid] = useState(true);
    const [isJobValid, setIsJobValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employee);
    const companies = useSelector((state) => state.companies)
    const create = useSelector(state => state.create);
    const update = useSelector(state => state.update);
    const [editedEmployee, setEditedEmployee] = useState({
        name: '',
        surname: '',
        salary: '',
        hiringDate: '',
        job: '',
        company: {
            name: '',
        },
    });
    useEffect(() => {
        if (id) {
            dispatch(exportFunctions.fetchEmployeeById(id))
        } else {
            setIsEditModalOpen(true)
        }

        dispatch(exportFunctions.fetchCompanies())
    }, [id])

    useEffect(() => {
        if (isFormSent){
            if (update.isUpdated) {
                Notify.success('Successfully updated employee')
            } else {
                Notify.failure('Failed to update employee')
                setIsEditModalOpen(true)
            }
        }
        setIsFormSent(false)
    }, [update]);

    useEffect(() => {
        if (isFormSent) {
            if (create.isCreated) {
                Notify.success('Created new employee')
            } else {
                Notify.failure('Cannot create new employee')
                setIsEditModalOpen(true)
            }
        }
        setIsFormSent(false)
    }, [create]);

    const handleGoHome = () => {
        window.location.href = `${pagesURLs[pages.defaultPage]}`;
    };
    const handleGoToEmployee = () => {
        window.location.href = `${pagesURLs[pages.employeeDefaultPage]}`;
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        if (!id) {
            window.location.href = `${pagesURLs[pages.employeeDefaultPage]}`;
        }
    };
    const handleOpenEditModal = () => {
        if (employee && employee.company) {
            setEditedEmployee({
                name: employee.name,
                surname: employee.surname,
                salary: employee.salary,
                hiringDate: employee.hiringDate,
                job: employee.job,
                company: {
                    name: employee.company.name,
                },
            })
        }
        setIsEditModalOpen(true);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'companyName') {
            editedEmployee.company.name = value
            setEditedEmployee((prevEmployee) => ({
                ...prevEmployee,
            }));
        } else {
            setEditedEmployee((prevEmployee) => ({
                ...prevEmployee,
                [name]: value,
            }));
        }
    };

    const handleSaveChanges = (e) => {
        if (validate()) {
            if (id || employee.id) {
                dispatch(exportFunctions.fetchUpdateEmployee(employee.id, editedEmployee))
            } else {
                dispatch(exportFunctions.fetchCreateEmployee(editedEmployee))
            }
            setIsFormSent(true)
            setIsEditModalOpen(false);
        } else {
            e.preventDefault();
            Notify.failure('Invalid data provided')
        }
    };

    const validate = () => {
        let isValid = true
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!editedEmployee.name || editedEmployee.name.trim() === '') {
            setIsNameValid(false)
            isValid = false
        } else {
            setIsNameValid(true)
        }
        if (!editedEmployee.surname || editedEmployee.surname.trim() === '') {
            setIsSurnameValid(false)
            isValid = false
        } else {
            setIsSurnameValid(true)
        }
        if (!editedEmployee.salary || isNaN(editedEmployee.salary) || editedEmployee.salary <= 0) {
            setIsSalaryValid(false)
            isValid = false
        } else {
            setIsSalaryValid(true)
        }
        if (!editedEmployee.job || editedEmployee.job.trim() === '') {
            setIsJobValid(false)
            isValid = false
        } else {
            setIsJobValid(true)
        }
        if (!regexDate.test(editedEmployee.hiringDate)) {
            setIsDateValid(false)
            isValid = false
        } else {
            setIsDateValid(true)
        }
        return isValid
    }

    const handleClear = (e) => {
        e.preventDefault();
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
            {!employee || !employee.company && (
                <div>
                    <Typography variant="title" align="center">
                        {formatMessage({id: 'loading'})}
                    </Typography>
                </div>
            )}
            {employee && employee.company && (
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
                </div>
            )}
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
                                    {formatMessage({id: 'employee_name'})}
                                </label>
                                {isNameValid && <input
                                    className={classes.formInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedEmployee.name}
                                    onChange={handleChange}
                                />}
                                {!isNameValid && <input
                                    className={`${classes.formInput} ${classes.error}`}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedEmployee.name}
                                    onChange={handleChange}

                                />}
                                {!isNameValid && <p className={classes.errorMsg}>Please enter a valid name</p>}
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="surname">
                                    {formatMessage({id: 'employee_surname'})}
                                </label>
                                {isSurnameValid && <input
                                    className={classes.formInput}
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={editedEmployee.surname}
                                    onChange={handleChange}
                                />}
                                {!isSurnameValid && <input
                                    className={`${classes.formInput} ${classes.error}`}
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={editedEmployee.surname}
                                    onChange={handleChange}
                                />}
                                {!isSurnameValid && <p className={classes.errorMsg}>Please enter a valid surname</p>}
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="salary">
                                    {formatMessage({id: 'employee_salary'})}
                                </label>
                                {isSalaryValid && <input
                                    className={classes.formInput}
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={editedEmployee.salary}
                                    onChange={handleChange}
                                />}
                                {!isSalaryValid && <input
                                    className={`${classes.formInput} ${classes.error}`}
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={editedEmployee.salary}
                                    onChange={handleChange}
                                />}
                                {!isSalaryValid && <p className={classes.errorMsg}>Please enter a valid salary</p>}

                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="hiringDate">
                                    {formatMessage({id: 'employee_hiring_date'})}
                                </label>
                                {isDateValid && <input
                                    className={classes.formInput}
                                    type="text"
                                    id="hiringDate"
                                    name="hiringDate"
                                    value={editedEmployee.hiringDate}
                                    onChange={handleChange}
                                />}
                                {!isDateValid && <input
                                    className={`${classes.formInput} ${classes.error}`}
                                    type="text"
                                    id="hiringDate"
                                    name="hiringDate"
                                    value={editedEmployee.hiringDate}
                                    onChange={handleChange}
                                />}
                                {!isDateValid && <p className={classes.errorMsg}>Please enter a valid date</p>}
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="job">
                                    {formatMessage({id: 'employee_job'})}
                                </label>
                                {isJobValid && <input
                                    className={classes.formInput}
                                    type="text"
                                    id="job"
                                    name="job"
                                    value={editedEmployee.job}
                                    onChange={handleChange}
                                />}
                                {!isJobValid && <input
                                    className={`${classes.formInput} ${classes.error}`}
                                    type="text"
                                    id="job"
                                    name="job"
                                    value={editedEmployee.job}
                                    onChange={handleChange}
                                />}
                                {!isJobValid && <p className={classes.errorMsg}>Please enter a valid job</p>}
                            </div>
                            <div className={classes.formGroup}>
                                <label className={classes.formLabel} htmlFor="companyName">
                                    {formatMessage({id: 'employee_company_name'})}
                                </label>
                                <select
                                    className={classes.formSelect}
                                    id="companyName"
                                    name="companyName"
                                    value={editedEmployee.company.name}
                                    onChange={handleChange}
                                >
                                    {companies.map((company, index) => (
                                        <option key={index} value={company.name}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={classes.formButtonContainer}>
                                <button className={`${classes.formButton} ${classes.black}`}
                                        onClick={handleCloseEditModal}>
                                    {formatMessage({id: 'editBack'})}
                                </button>
                                <button className={`${classes.formButton} ${classes.red}`} onClick={handleClear}>
                                    {formatMessage({id: 'editClear'})}
                                </button>
                                {id && <button className={`${classes.formButton} ${classes.black}`}
                                                     onClick={handleSaveChanges}>
                                    {formatMessage({id: 'editSave'})}
                                </button>}
                                {!id && <button className={`${classes.formButton} ${classes.black}`}
                                                     onClick={handleSaveChanges}>
                                    {formatMessage({id: 'createSave'})}
                                </button>}
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeMoreInfo;
