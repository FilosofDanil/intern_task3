import React from 'react';
import Typography from 'components/Typography';
import {Link} from 'react-router-dom';
import {useIntl} from "react-intl";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {createUseStyles} from "react-jss";
import {AiFillPieChart, AiOutlinePlus, AiOutlineStepBackward, AiTwotoneEdit} from "react-icons/ai";
import useTheme from "../../../misc/hooks/useTheme";
import {Button} from "@mui/material";


const getClasses = createUseStyles((theme) => ({

}));

const handleGoToEmployee = () =>{

}

const handleOpenEditMode = () =>{

}


function Default() {
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const {formatMessage} = useIntl();
    return (
        <div>
            <Typography variant="title"> {formatMessage({id: 'title'})}</Typography>
            <div>
                <Typography variant="body"> {formatMessage({id: 'description'})}</Typography>
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    startIcon={<AiFillPieChart />}
                    className={classes.backButton}
                    onClick={handleGoToEmployee}
                >
                    {formatMessage({id: 'toList'})}
                </Button>
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    startIcon={<AiTwotoneEdit/>}
                    className={classes.backButton}
                    onClick={handleOpenEditMode}
                >
                    {formatMessage({id: 'toMoreInfoPage'})}
                </Button>
            </div>
            <div>
                <Typography>{formatMessage({id: 'author'})}</Typography>
                <Typography>&copy; {formatMessage({id: 'reserved'})}</Typography>
            </div>
        </div>
    );
}

export default Default;
