import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Erance"></img>
                    <h1>Registro de pessoas ouvidas</h1>
                    <p>Registre o primeiro nome da pessoa ouvida, como foi a chamada e a idade.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#05CEAE" />
                        Voltar para o home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Primeiro nome"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição: suas impressões e resultados da chamada."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Idade"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                                    
                    <button className="button" type="submit">Registrar</button>

                </form>
            </div>

        </div>
    );
}