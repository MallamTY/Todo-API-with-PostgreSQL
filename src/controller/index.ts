import authController from "./auth.controller";


const logIn = authController.SignIn;
const refresh = authController.Refresh;


export const Auth = {
    logIn,
    refresh

}