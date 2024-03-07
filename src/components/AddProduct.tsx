import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { productCreate } from '../api/stock'
import { toast } from 'react-toastify';



interface ModalProps {
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type iniatialValues = {
    productId: string;
    name: string;
    quantity: string | number;
    producer: string;
    type: 'farmaco' | 'instrumento',
    startDate: undefined | string;
    endDate: undefined | string;
}


const AddProduct: React.FC = () => {

    const initialValues: iniatialValues = {
        productId: '',
        name: '',
        quantity: '',
        producer: '',
        type: 'farmaco',
        startDate: undefined,
        endDate: undefined,
    }

    const handleSubmit = async (values: typeof initialValues, action: any) => {
        const { name, quantity, producer, type, startDate, endDate } = values

        let startDateProcessed = null
        let endDateProcessed = null

        if (startDate) {
            startDateProcessed = new Date(startDate.toString())
        }

        if (endDate) {
            endDateProcessed = new Date(endDate.toString())
        }
        const quantityProcessed = Number(quantity);

        const processedValues = {
            name,
            quantity: quantityProcessed,
            producer,
            type,
            startDate: startDateProcessed,
            endDate: endDateProcessed,
        }
        const promisse = await productCreate(processedValues)
        console.log(processedValues)
        

        setTimeout(function(){ window.location.href='/list/stock' }, 1500);
        window.alert("Produto Adicionado Com Sucesso")

    }
    return (
        <div className='flex items-start justify-center fixed top-0 left-0 w-full min-h-screen bg-black z-50 bg-opacity-70 px-3 py-5 max-h-full overflow-y-auto'>
            <div className='bg-white p-8 rounded w-11/12 md:w-5/12'>
                <div className='flex justify-end'>
                    <a
                        href='/list/stock'>
                        <img src={closeButton} />
                    </a>
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-lg font-roboto text-primary font-semibold'>
                        Cadastro de Produtos
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
                                        Nome do Produto:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Fabricante:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='producer'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.producer} />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Quantidade:
                                    </label>
                                    <input className='border rounded-md border-lightgray shadow-sm p-2'
                                        name='quantity'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.quantity} />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <label className='text-primary text-base mr-2'>
                                        Classificação:
                                    </label>
                                    <select className='border rounded-md border-lightgray shadow-sm p-3'
                                        name='type'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.type}>
                                        <option> Selecione </option>
                                        <option> Farmaco </option>
                                        <option> Instrumento </option>
                                    </select>
                                </div>

                                <div className='flex gap-8 items-end justify-items-end mb-5'>
                                    <div className='mt-2 flex flex-col w-2/6'>
                                        <label className='text-primary text-base mr-2'>
                                            Data de Fabricação:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            type='date'
                                            min="2018-01-01"
                                            name='startDate'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.startDate} />
                                    </div>
                                    <div className='mt-2 flex flex-col w-2/6'>
                                        <label className='text-primary text-base mr-2'>
                                            Data de Validade:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            type='date'
                                            min="2018-01-01"
                                            name='endDate'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.endDate} />
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

export default AddProduct;
