import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { productUpdate } from '../api/stock'
import { toast } from 'react-toastify';
import { StockModel } from '../api/stock';
import { locale } from 'moment';

interface UpdateProductProps {
    product?: StockModel
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type iniatialValues = {
    name: string;
    quantity: string | number;
    producer: string;
    type: 'farmaco' | 'instrumento' | string,
    startDate: undefined | string;
    endDate: undefined | string;
}


export function UpDateProduct({ product, isOpen, setOpenModal }: UpdateProductProps) {

    if (product === undefined) {
        return <></>
    }


    const initialValues: iniatialValues = {
        name: product.name,
        quantity: product.quantity,
        producer: product.producer,
        type: product.type,
        startDate: product.startDate?.toString(),
        endDate: product.endDate?.toString(),
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

        const promisse = await productUpdate(product.productId, processedValues)
        console.log(processedValues)


        
        setTimeout(function(){ window.location.reload(); }, 1500);
        window.alert("Produto Atualizado Com Sucesso")
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
                            Edição de Produtos
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
                                            Nome do Produto:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            placeholder={product.name} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Fabricante:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='producer'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.producer}
                                            placeholder={product.producer} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Quantidade:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='quantity'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.quantity}
                                            placeholder={product.quantity.toString()} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-base mr-2'>
                                            Classificação:
                                        </label>

                                        <select className='border rounded-md border-lightgray shadow-sm p-3'
                                            name='type'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.type}
                                        >
                                            <option value={values.type} disabled selected> {product.type} </option>
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
                                                type='text'
                                                min="2018-01-01"
                                                name='startDate'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.startDate}
                                                placeholder={product.startDate?.toString()}
                                            />
                                        </div>
                                        <div className='mt-2 flex flex-col w-2/6'>
                                            <label className='text-primary text-base mr-2'>
                                                Data de Validade:
                                            </label>
                                            <input className='border rounded-md border-lightgray shadow-sm p-2'
                                                type='text'
                                                min="2018-01-01"
                                                name='endDate'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.endDate}
                                                placeholder={product.endDate?.toString()}
                                            />
                                        </div>
                                    </div>


                                    <div className='flex justify-end'>
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
        )

    } else {
        return <></>
    }
}
