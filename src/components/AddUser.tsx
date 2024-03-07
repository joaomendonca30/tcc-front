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


const AddUser: React.FC = () => {

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

        setTimeout(function(){ window.location.href='/list/users' }, 1500);
        window.alert("Usuário Adicionado Com Sucesso")

    }



    return (
        <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
            <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                <div className='flex justify-end'>
                    <a
                        href='/list/users'>
                        <img src={closeButton} />
                    </a>
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


}
export default AddUser