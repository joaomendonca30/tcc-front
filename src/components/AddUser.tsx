import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { userCreate } from '../api/user'
import { toast } from 'react-toastify';


interface ModalProps {
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type initialValues = {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string 
    profile: 'Profissional da Saúde' | 'Recepcionista',
    council?: undefined | string;
    federativeUnit?: undefined | string;
}


export function AddUser({ isOpen, setOpenModal }: ModalProps) {

    const initialValues: initialValues = {
        userId: '',
        name: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        profile: 'Recepcionista',
        council: undefined,
        federativeUnit: undefined,
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
        const promisse = userCreate(processedValues)
        setOpenModal(!isOpen)
        toast.promise(promisse, {
            pending: 'Inserindo usuario',
            success: {
                render() {
                    action.setSubmitting(false);
                    setOpenModal(!isOpen)
                    return 'Usuario criado com sucesso'
                },
            },
            error: {
                render({ data }) {
                    action.setSubmitting(false)
                    setOpenModal(!isOpen)
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
                            Cadastro de Usuários
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
                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col'>
                                        <label className='text-primary text-base mr-2'>
                                            Nome Completo:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            E-mail:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            CPF:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='cpf'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.cpf} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Telefone:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber} />
                                    </div>                                    
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Perfil:
                                        </label>
                                        <select className='border rounded-md border-lightgray shadow-sm p-3'
                                            name='profile'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.profile}>
                                            <option> Selecione </option>
                                            <option> Recepcionista </option>
                                            <option> Profissional da Saúde </option>
                                        </select>
                                    </div>

                                    <div className='flex gap-8 items-end justify-items-end mb-5'>
                                        <div className='mt-2 flex flex-col w-2/6'>
                                            <label className='text-primary text-base mr-2'>
                                                Conselho:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='council'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.council} />
                                            </div>
                                    </div>      
                                    <div className='flex gap-8 items-end justify-items-end mb-5'>
                                        <div className='mt-2 flex flex-col w-2/6'>
                                            <label className='text-primary text-base mr-2'>
                                                UF:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='federativeUnit'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.federativeUnit} />                                                                                    
                                            
                                        </div>                                       
                                    </div>


                                    <div className='flex justify-end'>
                                        <button
                                            className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto'
                                            type="submit" disabled={isSubmitting}>
                                            Cadastrar
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