import React, { useState, useEffect } from "react";
import axios from "axios";
import { StockModel } from "../../api/stock";
import { baseURL } from '../../config';

import { Modal } from "../../components/modalStock";

const Stock: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [stockItens, setStockItens] = useState<StockModel[]>([]);

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

    return (
        <div>
            <div className="flex justify-end mt-5 p-5">
                <button
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:font-semibold"
                    onClick={() => setOpenModal(!openModal)}>
                    Cadastro de Produtos
                </button>
            </div>
            <Modal isOpen={openModal} setOpenModal={setOpenModal} />

            <div className="mt-6">
                <h1 className="mx-8 my-12 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-2xl text-center">
                    Produtos em Estoque
                </h1>
                {stockItens.length === 0 ?
                    (<p className="m-8 px-8 py-3 font-roboto text-darkgray text-xl">
                        Carregando ... </p>)
                    :
                    (
                        <div className="flex justify-center">
                            <table className="text-center w-11/12 table-fixed">
                                <thead className="font-roboto text-darkgray text-lg">
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
                                    </tr>
                                </thead>
                                <tbody className="font-roboto text-darkgray text-lg">
                                    {
                                        stockItens.map((item, index) =>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.producer}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.endDate?.toString()}</td>
                                                <td> 
                                                    <button>Editar</button>
                                                    <button>Deletar</button>
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