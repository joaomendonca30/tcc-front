import react, { ReactNode } from 'react'
import closeButton from "../assets/close.svg"
import { Formik, Form, Field } from 'formik';
import { productCreate } from '../api/stock'
import { toast } from 'react-toastify';
import { error } from 'console';

interface ModalProps {
    isOpen: boolean,
    setOpenModal: (isOpen: boolean) => void,
}

type iniatialValues = {
    name: string;
    quantity: string | number;
    producer: string;
    type: 'farmaco' | 'instrumento',
    startDate: undefined | string;
    endDate: undefined | string;
}

export function Modal({ isOpen, setOpenModal }: ModalProps) {

    const initialValues: iniatialValues = {
        name: '',
        quantity: '',
        producer: '',
        type: 'farmaco',
        startDate: undefined,
        endDate: undefined,
    }

    const handleSubmit = (values: typeof initialValues, action: any) => {
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
        console.log(processedValues)
        const promisse = productCreate(processedValues)

        toast.promise(promisse, {
            pending: 'Inserindo produto',
            success: {
                render() {
                    action.setSubmitting(false);
                    return 'Produto inserido no Estoque'
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
            <div className='fixed top-0 right-0 bottom-0 left-0 bg-lightgray opacity-90 '>
                <div className='fixed top-1/4 left-1/4 right-1/4 border border-white rounded-3xl bg-white p-5 shadow-lg'>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setOpenModal(!isOpen)}>
                            <img src={closeButton} />
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <h2 className='text-xl font-roboto text-primary font-semibold'>
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
                                        <label className='text-primary text-lg mr-2'>
                                            Nome do Produto:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-lg mr-2'>
                                            Fabricante:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='producer'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.producer} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-lg mr-2'>
                                            Quantidade:
                                        </label>
                                        <input className='border rounded-md border-lightgray shadow-sm p-2'
                                            name='quantity'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.quantity} />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='text-primary text-lg mr-2'>
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

                                    <div className='flex gap-5'>
                                        <div className='mt-2 flex flex-col w-1/4'>
                                            <label className='text-primary text-lg mr-2'>
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
                                        <div className='mt-2 flex flex-col w-1/4'>
                                            <label className='text-primary text-lg mr-2'>
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
