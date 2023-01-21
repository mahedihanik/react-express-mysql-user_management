/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editRole, setEditRole] = useState('');
    const [newTableData, setNewTableData] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, [newTableData]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            console.log('ddd')
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        console.log('gg')
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
        setNewTableData(0);
    }
    const handleEditModal = (userId,userName,userEmail,userStatus,userRole) => {
        setModalActive(!modalActive)
        setEditId(userId)
        setEditName(userName)
        setEditEmail(userEmail)
        setEditStatus(userStatus)
        setEditRole(userRole)
        console.log(`Hi there, ${userName}`);
    }
    const handleEditModalClose = () => {
        setModalActive(!modalActive)
    }
    const submitEdit = async (e) => {
        e.preventDefault();
        const response = await axiosJWT.patch('http://localhost:5000/update_user',
            {
                id:editId,
                name:editName,
                email:editEmail,
                status:editStatus,
                role:editRole
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.data[0] === 1){
            setNewTableData(1)
        }
        setModalActive(!modalActive)
    }
    const deleteUser = async (id) => {
        try {
            const deleteResponse = await axiosJWT.patch('http://localhost:5000/delete_user',
                {
                    id:id,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(deleteResponse.data)
            if (deleteResponse.data[0] === 1){
                setNewTableData(1)
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Logged in user : {name}</h1>
            <div className="buttons are-small mt-5">
                <Link className="button is-primary is-light" to={`/create`}> <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add User </Link>
            </div>
            <table className="table is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.status}</td>
                        <td>{user.role}</td>
                        <td><FontAwesomeIcon onClick={()=>handleEditModal(user.id,user.name,user.email,user.status,user.role)} icon={faUserEdit} /> <FontAwesomeIcon onClick={()=>deleteUser(user.id)} icon={faTrash} /></td>
                    </tr>
                ))}

                </tbody>
            </table>
            <div className={`modal ${(modalActive === true)?'is-active':''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">User Edit</p>
                        <button onClick={handleEditModalClose} className="delete" aria-label="close"></button>
                    </header>
                    <form onSubmit={submitEdit}>
                        <section className="modal-card-body">
                            <div className="field mt-5">
                                <label className="label">Name : </label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Username" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Email : </label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Email"  value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Status : </label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Status"  value={editStatus} onChange={(e) => setEditStatus(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Role : </label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Role"  value={editRole} onChange={(e) => setEditRole(e.target.value)}/>
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Dashboard