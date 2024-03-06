import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { scheduleCreate } from '../api/schedule'
import { toast } from 'react-toastify';


interface ModalProps {
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type initialValues = {
    userId: string,
    start: string | undefined,
    end: string | undefined,
    title: string,
    scheduleType: "Primeira consulta" | "Retorno" | "Procedimento"
}


const AddSchedule: React.FC = () => {

    const initialValues: initialValues = {
        userId: '',
        start: undefined,
        end: undefined,
        title: '',
        scheduleType: "Primeira consulta"
    }

    const handleSubmit = (values: typeof initialValues, action: any) => {
        const { userId, start, end, title, scheduleType } = values

        const processedValues = {
            userId,
            start,
            end,
            title,
            scheduleType
        }

        console.log(processedValues)

        const promisse = scheduleCreate(processedValues)
        //setOpenModal(!isOpen)
        toast.promise(promisse, {
            pending: 'Inserindo Evento',
            success: {
                render() {
                    action.setSubmitting(false);
                    //setOpenModal(!isOpen)
                    return 'Evento criado com sucesso'
                },
            },
            error: {
                render({ data }) {
                    action.setSubmitting(false)
                    //setOpenModal(!isOpen)
                    return 'Algo deu Errado'
                }
            }
        })

    }



    return (
        <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
            <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                <div className='flex justify-end'>
                    <a
                        href='/'>
                        <img src={closeButton} />
                    </a>
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-lg font-roboto text-primary font-semibold'>
                        Novo Agendamento
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
                                        Nome do Profissional:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='title'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-primary text-base mr-2'>
                                        Nome do Paciente:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='title'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title} />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Tipo de Consulta:
                                    </label>
                                    <select className='border rounded-md border-lightgray shadow-sm p-3'
                                        name='scheduleType'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.scheduleType}>
                                        <option> Selecione </option>
                                        <option> Primeira consulta </option>
                                        <option> Retorno </option>
                                        <option> Procedimento </option>
                                    </select>
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Horário de Início:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        type='date'
                                        min="2024-01-01"
                                        name='start'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.start} />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Horário de Termino:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        type='date'
                                        min="2024-01-01"
                                        name='end'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.end} />

                                </div>

                                <div className='flex justify-end mt-3'>
                                    <button
                                        className='border border-primary px-6 py-2 rounded-full bg-primary text-white text-roboto hover:bg-white hover:text-black transition duration-200'
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
export default AddSchedule