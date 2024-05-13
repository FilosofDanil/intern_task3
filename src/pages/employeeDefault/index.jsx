import React, {useMemo} from 'react';
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import getMessages from './intl';
import IntlProvider from "../../misc/providers/IntlProvider";
import EmployeeDefault from "./containers/EmployeeDefault";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "../../pages/employeeDefault/reducers/employee";

const store = configureStore(rootReducer);
function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages} store={store}>
            <EmployeeDefault {...props} />
        </IntlProvider>
    );
}

export default Index;