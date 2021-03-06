import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import smileImg from '../../assets/smile.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
            <img className="logo" src={logoImg} alt="Erance" />

            <form onSubmit={handleLogin}>
                <h1>Faça seu login</h1>

                <input 
                    type="password"
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>
                
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#05CEAE" />
                    Não tenho cadastro
                </Link>
            </form>


            </section>
            
            <img className="imgSmile" src={smileImg} alt="Smile" />
        </div>

    );
}