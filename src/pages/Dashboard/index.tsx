import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PatientModel } from "../../api/patient";
import { baseURL } from '../../config';
import { UpDatePatient } from "../../components/UpDatePatient";
import { DeletePatient } from "../../components/DeletePatient";

type topServices = {
    serviceName: string,
    quantity: number
}

const Dashboard: React.FC = () => {
    const [activeUsers, setActiveUsers] = useState();
    const [recepcionistUsers, setRecepcionistUsers] = useState();
    const [healthProfessionalsUsers, setHealthProfessionalsUsers] = useState();
    const [administratosUsers, setAdministratosUsers] = useState();
    const [topServices, setTopServices] = useState<topServices[]>([]);
    const [treatedpatient, setTreatedpatient] = useState();
    const [income, setIncome] = useState();
    const [totalSevices, setTotalSevices] = useState();



    const getActiveUsers = useCallback(async () => {
        try {
            //Retornar usuários ativos
            const responseActiveUsers = await axios.get(`${baseURL}usuarioAtivo`);
            const dataActiveUsers = responseActiveUsers.data;
            setActiveUsers(dataActiveUsers)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getRecepcionistUsers = useCallback(async () => {
        try {
            //Retornar usuários recepcionistas
            const responseRecepcionistUsers = await axios.get(`${baseURL}recepcionistas`);
            const dataRecepcionistUsers = responseRecepcionistUsers.data;
            setRecepcionistUsers(dataRecepcionistUsers)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getHealthProfessionalsUsers = useCallback(async () => {
        try {
            //Retornar profissionais da saúde
            const responseHealthProfessionalsUsers = await axios.get(`${baseURL}profissionaisDaSaudeTotal`);
            const dataHealthProfessionalsUsers = responseHealthProfessionalsUsers.data;
            setHealthProfessionalsUsers(dataHealthProfessionalsUsers)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getAdministratosUsers = useCallback(async () => {
        try {
            //Retornar administrador
            const responseAdministratosUsers = await axios.get(`${baseURL}\administrador`);
            const dataAdministratosUsers = responseAdministratosUsers.data;
            setAdministratosUsers(dataAdministratosUsers)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getTopServices = useCallback(async () => {
        try {
            //Retornar top 3 serviços mais prestados
            const responseTopServices = await axios.get(`${baseURL}topServicos`);
            const dataTopServices = responseTopServices.data;
            setTopServices(dataTopServices)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getTreatedpatient = useCallback(async () => {
        try {
            //Pacientes Tratados no ultimo mês
            const responseTreatedpatient = await axios.get(`${baseURL}\pacientesTratados`);
            const dataTreatedpatient = responseTreatedpatient.data;
            setTreatedpatient(dataTreatedpatient)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getIncome = useCallback(async () => {
        try {
            //Valor de Entrada
            const responseIncome = await axios.get(`${baseURL}receita`);
            const dataIncome = responseIncome.data;
            setIncome(dataIncome)

        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    const getTotalSevices = useCallback(async () => {
        try {
            //Atendimentos Realizados
            const responseTotalSevices = await axios.get(`${baseURL}\atendimentos`);
            const dataTotalSevices = responseTotalSevices.data;
            setTotalSevices(dataTotalSevices)

        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    useEffect(() => {
        getActiveUsers();
        getRecepcionistUsers();
        getHealthProfessionalsUsers();
        getAdministratosUsers();
        getTopServices();
        getTreatedpatient();
        getIncome();
        getTotalSevices()
    }, [getActiveUsers, getRecepcionistUsers, getHealthProfessionalsUsers, getAdministratosUsers, getTopServices, getTreatedpatient, getIncome, getTotalSevices])


    //    const servicos =[
    //     {
    //         serviceName: "Clareamento",
    //         quantity: 30    
    //     },
    //     {
    //         serviceName: "Limpaza",
    //         quantity: 20    
    //     },
    //     {
    //         serviceName: "Restauração",
    //         quantity: 10    
    //     },
    //    ]

    return (
        <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
            <h1 className="mx-8 mb-8 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-lg text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                {`Indicadores do Mês:
                
                ${new Date().getMonth() + 1 === 8 ? "Ago" : ''} / ${new Date().getFullYear()}`}
            </h1>

            <div className="border border-secondary rounded-md mx-8 px-4 py-4">
                <span className="text-darkgray font-semibold text-lg "> Indicadores de Usuários </span>
                <div className="grid grid-cols-4 grid-rows-1 gap-4 h-full mt-4">
                    {
                        activeUsers === undefined ?
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Usuários Ativos </span>
                                <span className="pb-4 text-4xl">00,00</span>
                            </div>
                            :
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Usuários Ativos </span>
                                <span className="pb-4 text-4xl">{activeUsers}</span>
                            </div>
                    }
                    {
                        recepcionistUsers === undefined ?
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Recepcionistas </span>
                                <span className="pb-4 text-4xl">00,00</span>
                            </div>
                            :
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Recepcionistas </span>
                                <span className="pb-4 text-4xl">{recepcionistUsers}</span>
                            </div>
                    }
                    {
                        healthProfessionalsUsers === undefined ?
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Profissionais da Saúde </span>
                                <span className="pb-4 text-4xl">00,00</span>
                            </div>
                            :
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Profissionais da Saúde </span>
                                <span className="pb-4 text-4xl">{healthProfessionalsUsers}</span>
                            </div>
                    }
                    {
                        administratosUsers === undefined ?
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Administrador </span>
                                <span className="pb-4 text-4xl">00,00</span>
                            </div>
                            :
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Administrador </span>
                                <span className="pb-4 text-4xl">{administratosUsers}</span>
                            </div>
                    }
                </div>
            </div>


            <div className="border border-secondary rounded-md mx-8 px-4 py-4 mt-4">
                <span className="text-darkgray font-semibold text-lg "> Top 3 Serviços </span>
                <div className="grid grid-cols-3 grid-rows-1 gap-4 h-full mt-4">
                    {topServices.length === 0 ?
                        <>
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Top 1</span>
                                <span className="pb-4 text-4xl"> 00,00 </span>
                            </div>
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Top 2</span>
                                <span className="pb-4 text-4xl"> 00,00 </span>
                            </div>
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> Top 3</span>
                                <span className="pb-4 text-4xl"> 00,00 </span>
                            </div>
                        </>
                        :
                        topServices.map((item, index) =>
                            <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                <span className="py-4 text-lg text-center"> {item.serviceName} </span>
                                <span className="pb-4 text-4xl">{item.quantity} </span>
                            </div>
                        )
                    }
                </div>
            </div>


            <div className=" grid grid-cols-3 grid-rows-1 gap-4 mb-4">
                {
                    treatedpatient === undefined ?
                        <div className="border border-secondary rounded-md ml-8 px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg"> Pacientes Atendidos </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Pacientes </span>
                                    <span className="pb-4 text-4xl">00,00</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="border border-secondary rounded-md ml-8 px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg"> Pacientes Atendidos </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Pacientes </span>
                                    <span className="pb-4 text-4xl">{treatedpatient}</span>
                                </div>
                            </div>
                        </div>
                }
                {
                    totalSevices === undefined ?
                        <div className="border border-secondary rounded-md px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg"> Total de Atendimentos </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Atendimentos </span>
                                    <span className="pb-4 text-4xl">00,00</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="border border-secondary rounded-md px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg"> Total de Atendimentos </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Atendimentos </span>
                                    <span className="pb-4 text-4xl">{totalSevices}</span>
                                </div>
                            </div>
                        </div>
                }
                {
                    income === undefined ?
                        <div className="border border-secondary rounded-md mr-8 px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg"> Valor de Entrada </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Valor </span>
                                    <span className="pb-4 text-4xl">R$ 00,00</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="border border-secondary rounded-md mr-8 px-4 py-4 mt-4">
                            <span className="text-darkgray font-semibold text-lg "> Valor de Entrada </span>
                            <div className="mt-4">
                                <div className="flex flex-col items-center bg-secondary rounded-lg shadow-md font-semibold px-5">
                                    <span className="py-4 text-lg text-center"> Valor </span>
                                    <span className="pb-4 text-4xl">R$ {income}</span>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default Dashboard;