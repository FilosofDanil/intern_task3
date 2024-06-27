import React, {useMemo} from 'react';
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import getMessages from './intl';
import IntlProvider from "../../misc/providers/IntlProvider";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "../../pages/profile/reducers/profile";
import {Provider} from "react-redux";
import Profile from "./containers/Profile";

const store = configureStore(rootReducer);
function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <Profile {...props} />
            </IntlProvider>
        </Provider>
    );
}

export default Index;