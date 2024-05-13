import React, {useEffect, useState} from 'react';
import Typography from "../../../components/Typography";
import {useIntl} from "react-intl";
import Item from "../../../components/Item";
import {AiOutlinePlus} from "react-icons/ai";
import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";

import exportFunctions from "../../employeeDefault/actions/employee";
import {useDispatch, useSelector} from "react-redux";

const getClasses = createUseStyles((theme) => ({
    addButton: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: `2px solid black`,
        backgroundColor: `grey`,
        transition: 'transform 0.4s',
        '&:hover': {
            border: `3px solid yellow`,
            transform: 'scale(1.1)',
            fontWeight: 'bold',
            color: 'yellow',
        },
        marginBottom: theme.spacing(2),
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        marginLeft: theme.spacing(1),
        textAlign: 'center',
    },
    emptyBlock: {
        height: '100px',
        width: '100%',
        backgroundColor: 'grey',
        border: `2px solid black`,
        marginBottom: theme.spacing(2),
        position: 'relative',
        visibility: 'hidden',
    },
    addEmployeeButton: {
        position: 'absolute',
        top: '0',
        left: '0',
        visibility: 'visible',
    },
    filterContainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    filterInput: {
        marginRight: '10px',
        fontSize: '0.825vw',
        padding: '5px',
    },
    filterButton: {
        fontSize: '0.825vw',
        padding: '10px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    filterButtonHover: {
        backgroundColor: 'darkblue',
    },
}));

function EmployeeDefault() {
    const { theme } = useTheme();
    const { formatMessage } = useIntl();
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const classes = getClasses({ theme });
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state.employeeList);

    useEffect(() => {
        dispatch(exportFunctions.fetchEmployees());
    }, [dispatch]);

    const deleteEmployee = (selfLink) => {
        // setList((prev) => prev.filter((item) => item.selfLink !== selfLink));
    };

    const handleAddEmployee = () => {

    };

    const handleFilterSubmit = () => {

    };

    if (!employeeList) {
        return (
            <Typography variant="title" align="center">
                {formatMessage({ id: 'loading' })}
            </Typography>
        );
    }
    return (
        <div>
            <Typography variant="title" align="center">
                {formatMessage({id: 'title'})}
            </Typography>
            <div className={classes.filterContainer}>
                <input
                    type="text"
                    name="minSalary"
                    placeholder="Мінімальна зарплата"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className={classes.filterInput}
                />
                <input
                    type="text"
                    name="maxSalary"
                    placeholder="Максимальна зарплата"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className={classes.filterInput}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Ім'я"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.filterInput}
                />
                <input
                    type="text"
                    name="companyName"
                    placeholder="Назва компанії"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={classes.filterInput}
                />
                <button onClick={handleFilterSubmit} className={classes.filterButton}>Відфільтрувати</button>
            </div>
            <ol>
                {employeeList.map((item, index) => (
                    <Item key={index} employee={item} onDelete={deleteEmployee}/>
                ))}
                <div className={classes.emptyBlock}>
                    <div className={`${classes.addButton} ${classes.addEmployeeButton}`} onClick={handleAddEmployee}>
                        <AiOutlinePlus/>
                        <span className={classes.buttonText}>Додати співробітника</span>
                    </div>
                </div>
            </ol>
        </div>
    );
}

export default EmployeeDefault;
