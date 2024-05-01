import api from "./axios";

export interface LoginModel {
    email: string,
    password: string
}

export const getUserLoggedIn = async (payload: LoginModel) => {
    const { data } = await api.request({
        method: 'POST',
        url: `login/${payload.email}`,
        data: payload       
    });
    
};