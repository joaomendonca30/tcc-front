import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik } from 'formik';
import { patientCreate } from '../api/patient';



type initialValues = {
    patientId: string;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string
    dateOfBirth: undefined | string,
    healthInsurance: string;
    planNumber: undefined | string;
    specialNotes?: string
}



const AddPatient: React.FC = () => {

    const initialValues: initialValues = {
        patientId: '',
        name: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        dateOfBirth: undefined,
        healthInsurance: '',
        planNumber: '',
        specialNotes: ''
    }

    const handleSubmit = (values: typeof initialValues, action: any) => {
        const { name, email, cpf, phoneNumber, dateOfBirth, healthInsurance, planNumber, specialNotes } = values

        let dateOfBirthProcessed = null

        if (dateOfBirth) {
            dateOfBirthProcessed = new Date(dateOfBirth.toString())
        }

        const processedValues = {
            name,
            email,
            cpf,
            phoneNumber,
            dateOfBirth: dateOfBirthProcessed,
            healthInsurance,
            planNumber,
            specialNotes
        }

        console.log(processedValues)
        const promisse = patientCreate(processedValues)

        setTimeout(function () { window.location.href = '/list/patients' }, 1500);
        window.alert("Paciente Adicionado Com Sucesso")

    }



    return (
        <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
            <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                <div className='flex justify-end'>
                    <a
                        href='/list/patients'>
                        <img src={closeButton} />
                    </a>
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-lg font-roboto text-primary font-semibold'>
                        Cadastro de Pacientes
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
                                        value={values.name}
                                        placeholder='Digite o nome'
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
                                        placeholder='Digite o e-mail'
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
                                        placeholder='Digite o CPF'
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
                                        placeholder='Digite o Telefone'
                                        required />
                                </div>

                                
                                    <div className='mt-2 flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Data de Nascimento:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            type='date'                                         
                                            name='dateOfBirth'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dateOfBirth}
                                            required />
                                    </div>
                                
                                
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Convênio:
                                        </label>
                                        <select className='border rounded-md border-lightgray shadow-sm p-3'
                                            name='healthInsurance'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.healthInsurance}
                                            required>
                                            <option> Selecione </option>
                                            <option> Particular </option>
                                            <option> Amil </option>
                                            <option> Notredame Intermédica </option>
                                            <option> Bradesco </option>
                                            <option> Sul América </option>
                                            <option> Hapvida </option>
                                            <option> Unimed </option>
                                            <option> GreenLine </option>
                                            <option> São Cristóvão </option>
                                            <option> Transmontano </option>
                                            <option> Careplus </option>
                                            <option> Porto Seguro </option>
                                            <option> Omint </option>
                                            <option> Outro </option>
                                        </select>
                                    </div>
                                

                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Número da carteirinha:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='planNumber'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.planNumber}
                                        placeholder='Digite o número da carteirinha'
                                    />
                                </div>

                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Observações:
                                    </label>
                                    <textarea className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='specialNotes'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.specialNotes}
                                        placeholder='Bloco para anotações'
                                    />
                                </div>


                                <div className='flex justify-end'>
                                    <button
                                        className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto mt-3'
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
export default AddPatient