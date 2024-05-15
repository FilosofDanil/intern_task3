import React, {useMemo} from 'react';
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import getMessages from './intl';
import IntlProvider from "../../misc/providers/IntlProvider";
import EmployeeDefault from "./containers/EmployeeDefault";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "../../pages/employeeDefault/reducers/employee";
import {Provider} from "react-redux";

const store = configureStore(rootReducer);
function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <EmployeeDefault {...props} />
            </IntlProvider>
        </Provider>
    );
}

export default Index;