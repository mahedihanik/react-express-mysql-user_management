import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const CreateUser = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

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

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const createRes = await axiosJWT.post('http://localhost:5000/create_user',
                {
                    name: fullName,
                    email: email,
                    userName: userName,
                    password: password,
                    role: role,
                    status: status
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(createRes)
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <p>{msg}</p>
                <form onSubmit={createUser}>
                    <div className="field">
                        <label className="label">Name :</label>
                        <div className="control">
                            <input type="text" className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Name"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email :</label>
                        <div className="control">
                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username :</label>
                        <div className="control">
                            <input type="text" className="input" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password :</label>
                        <div className="control">
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Role :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Status :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;