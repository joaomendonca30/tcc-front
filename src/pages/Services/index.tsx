import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ServicesModel } from "../../api/service";
import { baseURL } from '../../config';
import { UpDateService } from "../../components/UpDateService";
import { DeleteService } from "../../components/DeleteService";


const Services: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [servicesItens, setServicesItens] = useState<ServicesModel[]>([]);

    const [showUpdateService, setShowUpdateService] = useState<boolean>(false);
    const [showDeleteService, setShowDeleteService] = useState<boolean>(false)
    const [currentService, setCurrentService] = useState<ServicesModel>()

    const getServicesItens = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}\servicos`);
            const data = await response.data;
            setServicesItens(data)
        } catch {
            console.log(`Deu ruim`)
        }
    }, [])



    useEffect(() => {
        getServicesItens()
    }, [getServicesItens])


    const setAndShowUpdateService = (product: ServicesModel, callback?: Function) => {
        setShowUpdateService(true)
        setCurrentService(product)
        callback && callback()
    }

    const setAndShowDeleteService = (product: ServicesModel, callback?: Function) => {
        setShowDeleteService(true)
        setCurrentService(product)
        callback && callback()
    }

    
    // const servicos = [
    //     {
    //         serviceId: "23",
    //         serviceCost: "50,00",
    //         name: "Clareamento Dantal",
    //         endDate: "01:00"
    //     }
    // ]


    return (
        <div>
            <div className="flex justify-end mt-5 p-5 md:p-3 md:mt-2 sm:mt-1 sm:p-1">
                <a
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                    href="/servico/criar">
                    Cadastro de Serviços
                </a>
            </div>
            <UpDateService isOpen={showUpdateService} setOpenModal={setShowUpdateService} service={currentService} />

            <DeleteService isOpen={showDeleteService} setOpenModal={setShowDeleteService} service={currentService} />



            <div className="mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 my-8 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-base text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Lista de Serviços
                </h1>
                {servicesItens.length === 0 ?
                    (<p className="m-8 px-8 py-3 font-roboto text-darkgray text-xl">
                        Carregando ... </p>)
                    :
                    (
                        <div className="flex justify-center">
                            <table className="text-center w-full table-fixed">
                                <thead className="font-roboto text-darkgray text-base md:text-sm sm:text-xs">
                                    <tr>

                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            Preço
                                        </th>
                                        <th>
                                            Duração
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-roboto text-darkgray text-base md:text-sm sm:text-xs mt-5">
                                    {
                                        servicesItens.map((item, index) =>
                                            <tr
                                                className="hover:border hover:border-secondary"
                                            >
                                                <td>{item.name}</td>
                                                <td>{item.serviceCost}</td>
                                                <td>{item.endDate?.toString()}</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray mr-2 hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 md:mr-1 sm:text-xs sm:px-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                            onClick={() => setAndShowUpdateService(item)}
                                                        >Editar
                                                        </button>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 sm:text-xs sm:px-1"
                                                            onClick={() => setAndShowDeleteService(item)}
                                                        >Deletar
                                                        </button>
                                                    </div>

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

export default Services;