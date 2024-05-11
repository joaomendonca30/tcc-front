import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { serviceCreate } from '../api/service'




interface ModalProps {
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type iniatialValues = {
    serviceId: string;
    name: string;
    serviceCost: string | number;
    endDate: undefined | string;
}


const AddService: React.FC = () => {

    const initialValues: iniatialValues = {
        serviceId: '',
        name: '',
        serviceCost: '',
        endDate: '',
    }

    const handleSubmit = async (values: typeof initialValues, action: any) => {
        const { name, serviceCost, endDate } = values

        const processedValues = {
            name,
            serviceCost,
            endDate,
        }
        console.log(processedValues)
        const promisse = await serviceCreate(processedValues)



        setTimeout(function () { window.location.href = '/list/services' }, 1500);
        window.alert("Serviço Adicionado Com Sucesso")

    }
    return (
        <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
            <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                <div className='flex justify-end'>
                    <a
                        href='/list/services'>
                        <img src={closeButton} />
                    </a>
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-lg font-roboto text-primary font-semibold'>
                        Cadastro de Serviços
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
                                        Nome do Serviço:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        placeholder='Digite o nome do serviço'
                                        required />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Preço:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='serviceCost'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.serviceCost}
                                        placeholder='Digite o valor do serviço'
                                        required />
                                </div>

                                <div className='flex gap-8 items-end justify-items-end mb-5'>
                                    <div className='mt-2 flex flex-col w-2/6'>
                                        <label className='text-primary text-base mr-2'>
                                            Tempo de duração do processedimento (horas:minutos):
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            type='time'
                                            min="00:00"
                                            max="10:00"
                                            name='endDate'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.endDate}
                                            placeholder='Selecione o tempo de duração'
                                        />
                                    </div>
                                </div>


                                <div className='flex justify-end'>
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

export default AddService;
