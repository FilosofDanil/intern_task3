import useTheme from "../../../misc/hooks/useTheme";
import {useIntl} from "react-intl";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import exportFunctions from "../actions/profile";
import Typography from "../../../components/Typography";
import {createUseStyles} from "react-jss";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const getClasses = createUseStyles((theme) => ({

}));

const ProfilePage = () => {
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState(true);
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(exportFunctions.fetchProfile())
        checkProfile()
    }, [])

    const checkProfile = () => {
       if(!profile){
           setIsAuth(false)
       } else {
           setIsAuth(true);
       }
    };

    return (
        <div>
            {!isAuth && (
                <div>
                    <Typography variant="title"> {formatMessage({id: 'title'})}</Typography>
                </div>
            )}
            {isAuth && (
                <div>
                    <Typography variant="title"> {formatMessage({id: 'title'})}</Typography>
                    <Typography variant="title"> {profile.name}</Typography>
                    <Typography variant="title"> {profile.email}</Typography>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;