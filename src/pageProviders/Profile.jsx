import React from 'react';
import PageContainer from "./components/PageContainer";
import ProfilePage from "../pages/profile";

const Profile = (props) => {
    return (
        <PageContainer>
            <ProfilePage {...props} />
        </PageContainer>
    );
};

export default Profile;