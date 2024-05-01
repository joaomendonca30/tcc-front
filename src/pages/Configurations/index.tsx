import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from 'formik';
import { UserModel, userUpdate } from '../../api/user'
import { Md5 } from "ts-md5";


const Configuration: React.FC = () => {
    const userString = localStorage.getItem('@welcome-app/loggedUser');

    let userObj: any = null

    if (userString !== null) {
        userObj = JSON.parse(userString)
    }

    type iniatialValues = {
        userId: string;
        name: string;
        email: string;
        cpf: string;
        phoneNumber: string
        profile: 'Profissional da Saúde' | 'Recepcionista' | 'Administrativo' | string,
        council: undefined | string;
        federativeUnit: undefined | string;
        password: string
        passwordConfirm: string
    }

    const initialValues: iniatialValues = {
        userId: userObj.userId,
        name: userObj.name,
        email: userObj.email,
        cpf: userObj.cpf,
        phoneNumber: userObj.phoneNumber,
        profile: userObj.profile,
        council: userObj.council?.toString(),
        federativeUnit: userObj.federativeUnit?.toString(),
        password: userObj.password,
        passwordConfirm: userObj.password,

    }

    const handleSubmit = async (values: typeof initialValues, action: any) => {
        const { name, email, cpf, phoneNumber, profile, council, federativeUnit, password, passwordConfirm } = values

        let newPassword = ''

        if (password == passwordConfirm) {
            newPassword = password

            const newPasswordHash = Md5.hashStr(newPassword)

            const processedValues = {
                name,
                email,
                cpf,
                phoneNumber,
                profile,
                council,
                federativeUnit,
                password: newPasswordHash
            }

            console.log(processedValues)
            const promisse = await userUpdate(userObj.userId, processedValues)
            console.log(processedValues)

            localStorage.setItem('@welcome-app/loggedUser', JSON.stringify({
                userId: userObj.userId,
                name: name,
                email: email,
                cpf: cpf,
                phoneNumber: phoneNumber,
                profile: profile,
                council: council,
                federativeUnit: federativeUnit,
                password: newPasswordHash
            }))

            setTimeout(function () { window.location.reload(); }, 1500);
            window.alert("Usuário Atualizado Com Sucesso")
        } else {
            window.alert("As senhas digitadas não são iguais. Tente novamente")
        }
    }

    return (
        <div>
            <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 mb-8 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-lg text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Configuração de Perfil
                </h1>

                <div className="flex flex-col justify-center items-center p-5">
                    <div className="w-3/5">
                        <div className="flex justify-center items-center mb-8">
                            <span>Dados Pessoais </span>
                        </div>
                        <div className='mt-12'>
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
                                        <div className='flex flex-col'>
                                            <label className='text-primary text-base mr-2'>
                                                Nome do Usuario:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                placeholder="Digite o nome"
                                                required />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                E-mail:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='email'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                placeholder="Digite o e-mail"
                                                required />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                CPF:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='cpf'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.cpf}
                                                placeholder="Digite o CPF"
                                                required />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Telefone:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='phoneNumber'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phoneNumber}
                                                placeholder="Digite o Telefone"
                                                required />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Perfil
                                            </label>

                                            <select className='border rounded-md border-lightgray shadow-sm p-3'
                                                name='profile'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.profile}
                                                required
                                            >
                                                <option value={values.profile} disabled selected> {userObj.profile} </option>
                                                <option> Selecione </option>
                                                <option> Recepcionista </option>
                                                <option> Profissional da Saúde </option>
                                                <option> Administrativo </option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                N Conselho:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='council'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.council}
                                                placeholder="Digite o número do conselho" />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                UF:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='federativeUnit'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.federativeUnit}
                                                placeholder="Digite a Unidade Federativa" />
                                        </div>


                                        <div className="flex justify-center items-center mb-5 mt-5">
                                            <span> Acesso </span>
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Senha:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='password'
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                placeholder="Digite a nova senha" />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <label className='text-primary text-base mr-2'>
                                                Confirmação da senha:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                name='passwordConfirm'
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.passwordConfirm}
                                                placeholder="Digite a nova senha novamente" />
                                        </div>


                                        <div className='flex justify-end mt-5'>
                                            <button
                                                className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                                type="submit" disabled={isSubmitting}>
                                                Atualizar
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

export default Configuration;