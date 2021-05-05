import AccessToPageService from './access-to-page-service';
import UserService from './user-service';
import OperationService from './operation-service';
import { createContext } from 'react';
import LoginService from './login-service';

const userService = new UserService();
const loginService = new LoginService(userService);
const operationService = new OperationService(userService);
const accessToPageService = new AccessToPageService();

const Services = createContext({
    userService,
    loginService,
    operationService,
    accessToPageService
});

export default Services;
