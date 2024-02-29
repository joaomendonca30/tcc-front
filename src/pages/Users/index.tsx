import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserModel } from "../../api/user";
import { baseURL } from '../../config';

import AddUser from "../../components/AddUser";
import { UpDateUser } from "../../components/UpDateUser";
import { DeleteUser } from "../../components/DeleteUser";

import PopUp from "../../components/PopUp";


const Users: React.FC = () => {
    const [showAddUser, setShowAddUser] = useState<boolean>(false);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
    const [showDeleteUser, setShowDeleteUser] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<UserModel>()


    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}/usuario`);
            const data = response.data;
            setUsers(data)
        }
        catch {
            console.log(`Deu ruim`)
        }

    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers])


    const setAndShowUpdateUser = (user: UserModel, callback?: Function) => {
        setShowUpdateUser(true)
        setCurrentUser(user)
        callback && callback()
    }

    const setAndShowDeleteUser = (user: UserModel, callback?: Function) => {
        setShowDeleteUser(true)
        setCurrentUser(user)
        callback && callback()
    }

    const usuarios = [{
        userId: "",
        name: "Gabriella Accarini",
        email: "gabi@gmail.com",
        cpf: "123456",
        phoneNumber: "2524757",
        profile: "oi",
        council: "blabla",
        federativeUnit: "SP"
    }]

    return (
        <div>
            <div className="flex justify-end mt-5 p-5 md:p-3 md:mt-2 sm:mt-1 sm:p-1">
                <a
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                    href="/usuario/criar" >
                    Cadastro de Usuarios
                </a>

            </div>

            <div>
                <UpDateUser isOpen={showUpdateUser} setOpenModal={setShowUpdateUser} user={currentUser} />
            </div>

            <div>
                <DeleteUser isOpen={showDeleteUser} setOpenModal={setShowDeleteUser} user={currentUser} />
            </div>


            <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 mb-8 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-lg text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Lista de Usuarios
                </h1>
                {users.length === 0 ?
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
                                            Perfil
                                        </th>
                                        <th>
                                            Nº Conselho
                                        </th>
                                        <th>
                                            UF
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-roboto text-darkgray text-base md:text-sm sm:text-xs mt-5">
                                    {
                                        users.map((item, index) =>
                                            <tr
                                                className="hover:border hover:border-secondary"
                                            >
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.cpf}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.profile}</td>
                                                <td>{item.council}</td>
                                                <td>{item.federativeUnit}</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray mr-2 hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 md:mr-1 sm:text-xs sm:px-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                            onClick={() => setAndShowUpdateUser(item)}
                                                        >Editar
                                                        </button>
                                                        <button
                                                            className="border border-secondary rounded-md px-2 py-1 text-base font-roboto text-darkgray hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 sm:text-xs sm:px-1"
                                                            onClick={() => setAndShowDeleteUser(item)}
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

export default Users;