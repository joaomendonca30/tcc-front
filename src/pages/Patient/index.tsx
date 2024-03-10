import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PatientModel } from "../../api/patient";
import { baseURL } from '../../config';
import { UpDatePatient } from "../../components/UpDatePatient";
import { DeletePatient } from "../../components/DeletePatient";


const Patient: React.FC = () => {    
    const [patient, setPatient] = useState<PatientModel[]>([]);
    const [showUpdatePatient, setShowUpdatePatient] = useState<boolean>(false);
    const [showDeletePatient, setShowDeletePatient] = useState<boolean>(false)
    const [currentPatient, setCurrentPatient] = useState<PatientModel>()


    const getPatients = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}\patients`);
            const data = response.data;
            setPatient(data)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    useEffect(() => {
        getPatients();
    }, [getPatients])


    const setAndShowUpdatePatient = (patient: PatientModel, callback?: Function) => {
        setShowUpdatePatient(true)
        setCurrentPatient(patient)
        callback && callback()
    }

    const setAndShowDeletePatient = (patient: PatientModel, callback?: Function) => {
        setShowDeletePatient(true)
        setCurrentPatient(patient)
        callback && callback()
    }

    const pacientes = [{
        patientId: "",
        name: "Gabriella Accarini",
        email: "gabi@gmail.com",
        cpf: "123456",
        phoneNumber: "2524757",
        dateOfBirth: "05/12/1995",
        healthInsurance: "Bradesco",
        planNumber: "1538475487",
        specialNotes: "Olá como vai"
    }]

    return (
        <div>
            <div className="flex justify-end mt-5 p-5 md:p-3 md:mt-2 sm:mt-1 sm:p-1">
                <a
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                    href="/paciente/criar" >
                    Cadastro de Pacientes
                </a>

            </div>

            <div>
                <UpDatePatient isOpen={showUpdatePatient} setOpenModal={setShowUpdatePatient} patient={currentPatient} />
            </div>

            <div>
                <DeletePatient isOpen={showDeletePatient} setOpenModal={setShowDeletePatient} patient={currentPatient} />
            </div>


            <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 mb-8 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-lg text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Lista de Pacientes
                </h1>
                {patient.length === 0 ?
                    (<p className="m-8 px-8 py-3 font-roboto text-darkgray text-xl">
                        Carregando ... </p>)
                    :
                    (
                        <div className="flex justify-center">
                            <table className="text-center w-full sm:w-full table-fixed">
                                <thead className="font-roboto text-darkgray text-base md:text-sm sm:text-xs">
                                    <tr>

                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            E-mail
                                        </th>
                                        <th>
                                            CPF
                                        </th>
                                        <th>
                                            Telefone
                                        </th>
                                        <th>
                                            Data de Nascimento
                                        </th>
                                        <th>
                                            Convenio
                                        </th>
                                        <th>
                                            Número da carteira
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-roboto text-darkgray text-base md:text-sm sm:text-xs mt-5">
                                    {
                                        patient.map((item, index) =>
                                            <tr
                                                className="hover:border hover:border-secondary"
                                            >
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.cpf}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.dateOfBirth?.toString()}</td>
                                                <td>{item.healthInsurance}</td>
                                                <td>{item.planNumber}</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray mr-2 hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 md:mr-1 sm:text-xs sm:px-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                            onClick={() => setAndShowUpdatePatient(item)}
                                                        >Editar
                                                        </button>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 sm:text-xs sm:px-1"
                                                            onClick={() => setAndShowDeletePatient(item)}
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

export default Patient;