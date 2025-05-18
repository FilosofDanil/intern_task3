import React from 'react';
import PageContainer from "./components/PageContainer";
import EmployeeMoreInfoPage from "../pages/employeeMoreInfo";

const EmployeeMoreInfo = (props) => {
    return (
        <PageContainer>
            <EmployeeMoreInfoPage {...props} />
        </PageContainer>
    );
};

export default EmployeeMoreInfo;