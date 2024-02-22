import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserModel } from "../../api/user";
import { baseURL } from '../../config';

import { AddUser } from "../../components/AddUser";
import { UpDateUser } from "../../components/UpDateUser";
import { DeleteUser } from "../../components/DeleteUser";


const Users: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [users, setUsers] = useState<UserModel[]>([]);

    const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
    const [showDeleteUser, setShowDeleteUser] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<UserModel>()

    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/usuario`);
            const data = response.data;
            console.log(data)
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

   useEffect(() => {
     getUsers()
   }, [])


    const setAndShowUpdateUser = (user: UserModel, callback?: Function) => {
        setShowUpdateUser(true)
        setCurrentUser(user)
    }

    const setAndShowDeleteUser = (user: UserModel, callback?: Function) => {
        setShowDeleteUser(true)
        setCurrentUser(user)
    }

    return (
        <div>
            <div className="flex justify-end mt-5 p-5 md:p-3 md:mt-2 sm:mt-1 sm:p-1">
                <button
                    className="border border-secondary rounded-md p-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:p-2 sm:text-xs sm:p-1"
                    onClick={() => setOpenModal(!openModal)}>
                    Cadastro de Usuarios
                </button>
                <AddUser isOpen={openModal} setOpenModal={setOpenModal} />
            </div>

            <div className="flex justify-end mt-5 p-5 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <UpDateUser isOpen={showUpdateUser} setOpenModal={setShowUpdateUser} user={currentUser} />
            </div>

            <div className="flex justify-end mt-5 p-5 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <DeleteUser isOpen={showDeleteUser} setOpenModal={setShowDeleteUser} user={currentUser} />
            </div>


            <div className="mt-6 md:mt-4 md:mt-2 md:p-2 sm:mt-2 sm:p-2">
                <h1 className="mx-8 my-12 px-8 py-3 border border-secondary rounded-full font-roboto text-darkgray text-2xl text-center md:mx-6 md:my-4 md:px-6 md:py-2 md:text-base sm:mx-4 sm:my-2 sm:px-4 sm:py-2 sm:text-sm">
                    Lista de Usuarios
                </h1>
                {users.length === 0 ?
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
                                <tbody className="font-roboto text-darkgray text-lg md:text-sm sm:text-xs mt-5">
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
                                                    <button
                                                        className="border border-secondary rounded-md p-2 mr-3 text-base font-roboto text-darkgray hover:bg-primary hover:text-white md:text-sm md:px-2 md:py-1 md:mr-1 sm:text-xs sm:px-2 sm:py-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                        onClick={() => setAndShowUpdateUser(item)}
                                                    >Editar
                                                    </button>
                                                    <button
                                                        className="border border-secondary rounded-md p-2 text-base font-roboto text-darkgray hover:font-semibold hover:bg-primary hover:text-white md:text-sm md:p-1 md:mr-1 sm:text-xs sm:p-1 md:mr-1 md:mt-2 sm:mr-1 sm:mt-2"
                                                        onClick={() => setAndShowDeleteUser(item)}
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

export default Users;