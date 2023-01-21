import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [defaultLoginAttempt] = useState(4);
    const [loginAttempt, setLoginAttempt] = useState(0);
    const [loginCount, setLoginCount] = useState(0);
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {

            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/dashboard");

        } catch (error) {
            const getSettingValue = await axios.post('http://localhost:5000/get_setting_value',{
                nameKey:'login_attempt_count'
            });
            let finalCount = parseInt(getSettingValue.data.value)+1;
            setLoginCount(finalCount)

            if (finalCount<=defaultLoginAttempt){
                await axios.patch('http://localhost:5000/update_setting_value',{
                    nameKey:'login_attempt_count',
                    value:finalCount.toString()
                });
                setLoginAttempt(defaultLoginAttempt-finalCount);
            }

            if (error.response) {


                setMsg(error.response.data.msg);

            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{(loginCount >= defaultLoginAttempt) ? '': msg}</p>
                                <p className="has-text-centered">{(loginCount >= defaultLoginAttempt) ? 'Your account is locked, please contact with Administrator !':(loginAttempt === 0 ? '':`You have ${loginAttempt} login attempt left !`)}</p>
                                <div className="field mt-5">
                                    <label className="label">Please enter your username : </label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Please enter your password : </label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-danger is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login