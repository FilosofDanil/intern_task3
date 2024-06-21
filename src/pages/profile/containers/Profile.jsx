import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { createUseStyles } from "react-jss";
import Typography from "../../../components/Typography";
import useTheme from "../../../misc/hooks/useTheme";
import exportFunctions from "../actions/profile";
import config from "../../../config";
import LoginConfirmation from "../../../components/loginconfirmation";

const getClasses = createUseStyles((theme) => ({

}));

const ProfilePage = () => {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const {
        BACKEND_SERVICE,
    } = config;
    const { formatMessage } = useIntl();
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const dispatch = useDispatch();
    const isAuth =  useSelector((state) => state.isAuth);
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        if (isAuth){
            setIsConfirmationOpen(false)
        } else {
            setIsConfirmationOpen(true)
        }
        dispatch(exportFunctions.fetchProfile());
    }, [isAuth]);

    const handleLogin = () => {
        // Redirect to the authorization server
        window.location.href = `${BACKEND_SERVICE}/oauth/authenticate`;
    };

    const handleCancel = () => {
        setIsConfirmationOpen(false)
    };

    return (
        <div>
            {isAuth && (
                <div>
                    <Typography variant="title">{formatMessage({ id: 'title' })}</Typography>
                    <Typography variant="title">{profile.name}</Typography>
                    <Typography variant="title">{profile.email}</Typography>
                </div>
            )}
            {isConfirmationOpen && <LoginConfirmation onConfirm={handleLogin} onCancel={handleCancel}/>}
        </div>
    );
};

export default ProfilePage;