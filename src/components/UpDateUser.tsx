import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { userUpdate } from '../api/user'
import { toast } from 'react-toastify';
import { UserModel } from '../api/user';

interface UpdateUserProps {
    user?: UserModel
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type iniatialValues = {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string 
    profile: 'Profissional da Saúde' | 'Recepcionista' | string,
    council: undefined | string ;
    federativeUnit: undefined | string ;
}


export function UpDateUser({ user, isOpen, setOpenModal }: UpdateUserProps) {

    if (user === undefined) {
        toast.error(`usuario inválido`)
        setOpenModal(!isOpen)
        return <></>
    }


    const initialValues: iniatialValues = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
        council: user.council?.toString(),
        federativeUnit: user.federativeUnit?.toString(),
    }



    const handleSubmit = (values: typeof initialValues, action: any) => {
        const { name, email, cpf, phoneNumber, profile, council, federativeUnit } = values

        const processedValues = {
            name,
            email,
            cpf,
            phoneNumber,
            profile,
            council,
            federativeUnit
        }

        console.log(processedValues)
        const promisse = userUpdate(user.userId, processedValues)
        console.log(processedValues)

        toast.promise(promisse, {
            pending: 'Editando usuario',
            success: {
                render() {
                    action.setSubmitting(false);
                    setOpenModal(!isOpen);
                    return 'Usuario alterado com sucesso';
                },
            },
            error: {
                render({ data }) {
                    action.setSubmitting(false)
                    return 'Algo deu Errado'
                }
            }
        })

    }


    if (isOpen) {
        return (
            <div className='fixed top-0 right-0 bottom-0 left-0 bg-lightgray opacity-90 sm:opacity-100'>
                <div className='fixed top-1/4 sm:top-0 left-1/4 sm:left-0 right-1/4  sm:right-0  sm:bottom-0 border border-white rounded-3xl sm:rounded bg-white p-5 shadow-lg'>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setOpenModal(!isOpen)}>
                            <img src={closeButton} />
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <h2 className='text-lg font-roboto text-primary font-semibold'>
                            Edição de Usuarios
                        </h2>
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
                                            placeholder={user.name} />
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
                                            placeholder={user.email} />
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
                                            placeholder={user.cpf} />
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
                                            placeholder={user.phoneNumber} />
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
                                        >
                                            <option value={values.profile} disabled selected> {user.profile} </option>
                                            <option> Selecione </option>
                                            <option> Recepcionista </option>
                                            <option> Profissional da Saúde </option>
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
                                            placeholder={user.council?.toString()} />
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
                                            placeholder={user.federativeUnit?.toString()} />
                                    </div>
                                

                                    <div className='flex justify-end'>
                                        <button
                                            className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto'
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
        )

    } else {
        return <></>
    }
}