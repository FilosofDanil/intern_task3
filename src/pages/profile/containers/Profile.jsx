import useTheme from "../../../misc/hooks/useTheme";
import {useIntl} from "react-intl";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import exportFunctions from "../actions/profile";
import Typography from "../../../components/Typography";
import {createUseStyles} from "react-jss";

const getClasses = createUseStyles((theme) => ({

}));

const ProfilePage = () => {
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(exportFunctions.fetchProfile())
    }, [profile])

    return (
        <div>
            <Typography variant="title"> {profile.name}</Typography>
        </div>
    );
}

export default ProfilePage;