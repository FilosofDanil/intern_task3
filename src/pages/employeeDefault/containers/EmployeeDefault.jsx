import React, {useEffect, useState} from 'react';
import Typography from "../../../components/Typography";
import {useIntl} from "react-intl";
import Item from "../../../components/Item";
import {AiFillCaretDown, AiFillCaretUp, AiOutlinePlus} from "react-icons/ai";
import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";
import storage from 'misc/storage';


import exportFunctions from "../../employeeDefault/actions/employee";
import {useDispatch, useSelector} from "react-redux";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const getClasses = createUseStyles((theme) => ({
    Button: {
        visibility: 'visible',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: '0.1fr 0.1fr',
    },
    buttonText: {
        marginLeft: theme.spacing(1),
        textAlign: 'center',
    },
    emptyBlock: {
        height: '40px',
        width: '100%',
        backgroundColor: 'grey',
        border: `2px solid black`,
        marginBottom: theme.spacing(2),
        position: 'relative',
        visibility: 'hidden',
    },
    paginationButton: {
        visibility: 'visible',
    },
    additionalButton: {
        position: 'absolute',
        top: '0',
        left: '0',
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
    error:{
        color: "red",
        border: '2px solid red',
    },
}));

function EmployeeDefault() {
    const {theme} = useTheme();
    const {formatMessage} = useIntl();
    const classes = getClasses({theme});
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state.employeeList);
    const isDeleted = useSelector((state) => state.deleteEmployee);
    const totalPages = useSelector(state => state.totalPages)
    const isLoaded =  useSelector(state => state.isLoaded)
    const [pageCount, setPageCount] = useState(0)
    const [isMinSalaryValid, setIsMinSalaryValid] = useState(true)
    const [isMaxSalaryValid, setIsMaxSalaryValid] = useState(true)
    const [list, setList] = useState([])
    const [filters, setFilters] = useState({
        minSalary: '',
        maxSalary: '',
        surname: '',
        name: '',
    })

    useEffect(() => {
        const page = Number(storage.getItem('page'))
        const filterState = JSON.parse(storage.getItem('filters'))
        if(page && filterState ) {
            setPageCount(page)
            setFilters(filterState)
            dispatch(exportFunctions.fetchEmployees(page, filterState));
        } else if(filterState){
            setFilters(filterState)
            dispatch(exportFunctions.fetchEmployees(pageCount, filterState));
        }else if(page){
            setPageCount(page)
            dispatch(exportFunctions.fetchEmployees(page, filters));
        }
        else {
            dispatch(exportFunctions.fetchEmployees(pageCount, filters));
        }
    }, [dispatch]);

    useEffect(() => {

        if(isDeleted.isDeleted){
            deleteEmployee(isDeleted.id)
        }
    }, [isDeleted]);

    useEffect(() => {
        setList(employeeList)
    }, [employeeList]);

    const deleteEmployee = (id) => {
        setList((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddEmployee = () => {
        window.location.href = `${pagesURLs[pages.employeeInfoPage]}`;
    };

    const handleFilterSubmit = () => {
        if(validate()){
            storage.setItem('filters', JSON.stringify(filters));
            dispatch(exportFunctions.fetchEmployees(pageCount, filters));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
            setFilters((prevState) => ({
                ...prevState,
                [name]: value,
            }));
    };

    const handlePaginationNext = () => {
        if(pageCount<totalPages){
            setPageCount(pageCount+1)
            storage.setItem("page", pageCount+1)
            dispatch(exportFunctions.fetchEmployees(pageCount+1, filters));
        }
    }
    const handlePaginationPrevious = () => {
        if(pageCount>0){
            setPageCount(pageCount-1)
            storage.setItem("page", pageCount-1)
            dispatch(exportFunctions.fetchEmployees(pageCount-1, filters));
        }
    }
    const validate = () =>{
        let isValid = true
        if(filters.minSalary){
            if(isNaN(filters.minSalary)){
                setIsMinSalaryValid(false)
                isValid = false
            } else {
                setIsMinSalaryValid(true)
            }
        }else {
            setIsMinSalaryValid(true)
        }
        if(filters.maxSalary){
            if(isNaN(filters.maxSalary)){
                setIsMaxSalaryValid(false)
                isValid = false
            } else {
                setIsMaxSalaryValid(true)
            }
        }else {
            setIsMaxSalaryValid(true)
        }
        return isValid
    }

    if (!isLoaded) {
        return (
            <Typography variant="title" align="center">
                {formatMessage({id: 'loading'})}
            </Typography>
        );
    }
    return (
        <div>
            <Typography variant="title" align="center">
                {formatMessage({id: 'title'})}
            </Typography>
            <div className={classes.filterContainer}>
                {isMinSalaryValid && <input
                    type="text"
                    name="minSalary"
                    placeholder={formatMessage({id: 'filter_minSalary'})}
                    value={filters.minSalary || ''}
                    onChange={handleChange}
                    className={classes.filterInput}
                />}
                {!isMinSalaryValid && <input
                    type="text"
                    name="minSalary"
                    placeholder={formatMessage({id: 'filter_minSalary'})}
                    value={filters.minSalary || ''}
                    onChange={handleChange}
                    className={`${classes.filterInput} ${classes.error}`}
                />}

                {isMaxSalaryValid && <input
                    type="text"
                    name="maxSalary"
                    placeholder={formatMessage({id: 'filter_maxSalary'})}
                    value={filters.maxSalary || ''}
                    onChange={handleChange}
                    className={classes.filterInput}
                />}
                {!isMaxSalaryValid && <input
                    type="text"
                    name="maxSalary"
                    placeholder={formatMessage({id: 'filter_maxSalary'})}
                    value={filters.maxSalary || ''}
                    onChange={handleChange}
                    className={`${classes.filterInput} ${classes.error}`}
                />}


                <input
                    type="text"
                    name="name"
                    placeholder={formatMessage({id: 'filter_name'})}
                    value={filters.name || ''}
                    onChange={handleChange}
                    className={classes.filterInput}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder={formatMessage({id: 'filter_surname'})}
                    value={filters.surname || ''}
                    onChange={handleChange}
                    className={classes.filterInput}
                />
                <button onClick={handleFilterSubmit} className={classes.filterButton}>{formatMessage({id: 'filter_Button'})}</button>
            </div>
            <ol>
                {isLoaded && list.map((item, index) => (
                    <Item key={index} employee={item}/>
                ))}
                <div className={classes.emptyBlock} >
                    <div className={classes.gridContainer}>
                        <div className={`${classes.Button} `} onClick={handlePaginationNext}>
                            <AiFillCaretDown/> <span className={classes.buttonText}>...</span>
                        </div>
                        <div className={`${classes.Button} `} onClick={handlePaginationPrevious}>
                            <AiFillCaretUp/> <span className={classes.buttonText}>...</span>
                        </div>
                    </div>

                </div>
                <div className={classes.emptyBlock}>
                    <div className={`${classes.Button} ${classes.additionalButton}`}
                         onClick={handleAddEmployee}>
                        <AiOutlinePlus/>
                        <span className={classes.buttonText}>{formatMessage({id: 'addEmployee'})}</span>
                    </div>
                </div>
            </ol>
        </div>
    );
}

export default EmployeeDefault;
