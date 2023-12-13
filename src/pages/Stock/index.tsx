import React, { useState, useEffect } from "react";
import axios from "axios";
import { StockModel } from "../../api/stock";
import { baseURL } from '../../config';

import { AddProduct } from "../../components/AddProduct";
import { UpDateProduct } from "../../components/UpDateProduct";
import { DeleteProduct } from "../../components/DeleteProduct";


const Stock: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [stockItens, setStockItens] = useState<StockModel[]>([]);

    const [showUpdateProduct, setShowUpdateProduct] = useState<boolean>(false);
    const [showDeleteProduct, setShowDeleteProduct] = useState<boolean>(false)
    const [currentProduct, setCurrentProduct] = useState<StockModel>()

    const getStockItens = async () => {
        try {
            const response = await axios.get(`${baseURL}\estoque`);
            const data = response.data;
            console.log(data)
            setStockItens(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStockItens()
    }, [])


    const setAndShowUpdateProduct = (product: StockModel, callback?: Function) => {
        setShowUpdateProduct(true)
        setCurrentProduct(product)
    }

    const setAndShowDeleteProduct = (product: StockModel, callback?: Function) => {
        setShowDeleteProduct(true)
        setCurrentProduct(product)
    }    

    return (
        <div>
            <div className="flex justify-end mt-5 p-5 md:p-3 md:mt-2 sm:mt-1 sm:p-1">
                <button
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                    onClick={() => setOpenModal(!openModal)}>
                    Cadastro de Produtos
                </button>
                <AddProduct isOpen={openModal} setOpenModal={setOpenModal} />
            </div>

            <div className="flex justify-end mt-5 p-5 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <UpDateProduct isOpen={showUpdateProduct} setOpenModal={setShowUpdateProduct} product={currentProduct} />
            </div>

            <div className="flex justify-end mt-5 p-5 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <DeleteProduct isOpen={showDeleteProduct} setOpenModal={setShowDeleteProduct} product={currentProduct} />
            </div>


            <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 my-12 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-2xl text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Produtos em Estoque
                </h1>
                {stockItens.length === 0 ?
                    (<p className="m-8 px-8 py-3 font-roboto text-darkgray text-xl">
                        Carregando ... </p>)
                    :
                    (
                        <div className="flex justify-center">
                            <table className="text-center w-11/12 sm:w-full table-fixed">
                                <thead className="font-roboto text-darkgray text-lg md:text-sm sm:text-xs">
                                    <tr>

                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            Fornecedor
                                        </th>
                                        <th>
                                            Quantidade
                                        </th>
                                        <th>
                                            Validade
                                        </th>
                                        <th>
                                            Ação
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-roboto text-darkgray text-lg md:text-sm sm:text-xs mt-5">
                                    {
                                        stockItens.map((item, index) =>
                                            <tr
                                                className="hover:border hover:border-secondary"
                                            >
                                                <td>{item.name}</td>
                                                <td>{item.producer}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.endDate?.toString()}</td>
                                                <td>
                                                    <button
                                                        className="border border-secondary rounded-md p-2 mr-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:px-2 md:py-1 md:mr-1 sm:text-xs sm:px-2 sm:py-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                        onClick={() => setAndShowUpdateProduct(item)}
                                                    >Editar
                                                    </button>
                                                    <button
                                                        className="border border-secondary rounded-md p-2 text-base font-roboto text-darkgray hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 md:mr-1 sm:text-xs sm:p-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                        onClick={() => setAndShowDeleteProduct(item)}
                                                    >Deletar
                                                    </button>
                                                </td>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Stock;