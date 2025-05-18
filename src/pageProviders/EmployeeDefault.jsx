import React from 'react';
import PageContainer from "./components/PageContainer";
import EmployeeDefaultPage from "../pages/employeeDefault";

const EmployeeDefault = (props) => {
    return (
        <PageContainer>
            <EmployeeDefaultPage {...props} />
        </PageContainer>
    );
}

export default EmployeeDefault;