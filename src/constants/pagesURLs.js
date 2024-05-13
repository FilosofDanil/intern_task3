import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.employeeDefaultPage]: `${config.UI_URL_PREFIX}/${pages.employeeDefaultPage}`,
  [pages.employeeInfoPage]: `${config.UI_URL_PREFIX}/${pages.employeeInfoPage}`,
};

export default result;
