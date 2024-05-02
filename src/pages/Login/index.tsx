import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import logo from '../../assets/UClinic_logo.png'
import { Formik } from 'formik';
import { baseURL } from '../../config';
import { Md5 } from "ts-md5";

type initialValues = {
    password: string;
    email: string;

}


const usuarios = {
    userId: "",
    name: "",
    email: "",
    cpf: "",
    phoneNumber: "",
    profile: '',
    council: "",
    federativeUnit: "",
    password: ""
}

const usuariosLogado = {
    userId: "21",
    name: "Gabriella Accarini",
    email: "gabi@gmail.com",
    cpf: "431569853",
    phoneNumber: "11685365698",
    profile: 'Administrativo',
    council: "123",
    federativeUnit: "SP",
    password: "uclinic123"
}


const Login: React.FC = () => {

    localStorage.setItem('@welcome-app/loggedUser', JSON.stringify(usuarios))

    const [loggedUser, setLoggedUser] = useState<any>("");

    const getUserLoggedIn = useCallback(async (email?: string, password?: string) => {
            
    }, [])


    useEffect(() => {
        if (loggedUser != "") {
            console.log("usuário logado é" + loggedUser)
        }
    }, [loggedUser])


    const initialValues: initialValues = {
        password: '',
        email: '',
    }

    const handleSubmit = async (values: typeof initialValues, action: any) => {
        const { password, email } = values

        const newPassword = Md5.hashStr(password)

        console.log(email + newPassword)
        await getUserLoggedIn(email, newPassword)

        console.log("teste -> " +loggedUser)
            axios.post(`${baseURL}\login`,
                {
                    email: email,
                    password: password
                })
                .then((response) => {
                    localStorage.setItem('@welcome-app/loggedUser', JSON.stringify(response.data))
                    setTimeout(function () { window.location.href = '/schedule' }, 1500);
                    //setLoggedUser(response)
                    //console.log("teste novo -> "+ response)
                })
    //    if (loggedUser != "") {
    //        localStorage.setItem('@welcome-app/loggedUser', JSON.stringify(loggedUser))

    //        setTimeout(function () { window.location.href = '/schedule' }, 1500);
    //    } else {
    //        window.alert("Ou o e-mail, ou a senha está incorreto. Tente novamente.")
     //       localStorage.setItem('@welcome-app/loggedUser', JSON.stringify(usuariosLogado))
       // }
    }


    return (
        <div>
            <div className="flex items-center justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-secondary px-3 py-5 max-h-full overflow-y-auto">
                <div className="w-6/12 md:w-5/12">
                    <div className='bg-white p-8 rounded-2xl shadow-md'>
                        <div className="flex justify-center">
                            <p className='text-primary text-2xl mr-2 font-semibold'> Login </p>
                        </div>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit} target="_self">
                                        <div className='flex flex-col mt-4'>
                                            <label className='text-primary text-base mr-2'>
                                                E-mail:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='email'
                                                type='email'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                placeholder="Digite o  e-mail"
                                                required />
                                        </div>
                                        <div className='flex flex-col mt-4'>
                                            <label className='text-primary text-base mr-2'>
                                                Senha:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='password'
                                                type='password'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                placeholder='Digite a senha'
                                                required />
                                        </div>
                                        <div className='flex justify-end mt-5'>
                                            <button
                                                className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto'
                                                type="submit" disabled={isSubmitting}>
                                                Entrar
                                            </button>
                                        </div>
                                    </form>


                                )}
                            </Formik>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login;