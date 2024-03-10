import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { userDelete } from '../api/user'
import { UserModel } from '../api/user';


interface DeleteProfessionalProps {
    professional?: UserModel
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
    council: undefined | string;
    federativeUnit: undefined | string;
}


export function DeleteProfessional({ professional, isOpen, setOpenModal }: DeleteProfessionalProps) {

    if (professional === undefined) {
        return <></>
    }


    const initialValues: iniatialValues = {
        userId: professional.userId,
        name: professional.name,
        email: professional.email,
        cpf: professional.cpf,
        phoneNumber: professional.phoneNumber,
        profile: professional.profile,
        council: professional.council?.toString(),
        federativeUnit: professional.federativeUnit?.toString(),
    }



    const handleSubmit = async (values: typeof initialValues, action: any) => {
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

        const promisse = await userDelete(professional.userId)


        setTimeout(function () { window.location.reload(); }, 1500)
        window.alert("Profissional Deletado Com Sucesso")
    }


    if (isOpen) {
        return (
            <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
                <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setOpenModal(false)}>
                            <img src={closeButton} />
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <h2 className='text-lg font-roboto text-primary font-semibold'>
                            Detalhes do Profissional
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
                                            Nome do Profissional:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            placeholder="Digite o nome"
                                            disabled />
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
                                            disabled />
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
                                            disabled />
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
                                            disabled />
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
                                            placeholder="Digite o número do conselho" 
                                            disabled/>
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
                                            placeholder="Digite a Unidade Federativa" 
                                            disabled/>
                                    </div>
                                    <div className='flex justify-end mt-3'>
                                        <button
                                            className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
                                            type="submit" disabled={isSubmitting}>
                                            Deletar
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
