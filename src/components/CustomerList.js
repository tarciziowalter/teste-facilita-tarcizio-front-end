import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CadastroModal from './CadastroModal';
import ModalOrdemVisita from './ModalOrdemVisita';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOrdemVisitaModal, setShowOrdemVisitaModal] = useState(false);
    const [customerSelected, setCustomerSelected] = useState(null);
    const [ordemVisita, setOrdemVisita] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Erro ao obter os clientes:', error);
        }
    };

    const handleCadastroClick = () => {
        setCustomerSelected(null);
        setShowModal(true);
    };

    const handleEditClick = (customer) => {
        setShowModal(true);
        setCustomerSelected(customer);
    };

    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm('Tem certeza que deseja excluir este cliente?');

        if (shouldDelete) {
            try {
                axios.delete(`http://localhost:3001/customers/delete/${id}`);
                alert("Cliente excluído com sucesso!");
                fetchCustomers();
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOrdemVisita([]);
        fetchCustomers();
    };

    const handleOrderVisitClick = async () => {
        try {
            const response = await axios.get('http://localhost:3001/calcular-rota');
            const orderVisit = response.data.rota;

            if (!showOrdemVisitaModal) {
                openModalOrderVisit(orderVisit);
            }

        } catch (error) {
            console.error('Erro ao obter ordem de visitação:', error);
        }
    };

    const openModalOrderVisit = (orderVisit) => {
        setOrdemVisita(orderVisit);
        setShowOrdemVisitaModal(true);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-left">Lista de Clientes</h1>
                <div className="d-flex">
                    <button className="btn btn-success me-2" onClick={handleCadastroClick}>
                        Cadastrar
                    </button>
                    <button className="btn btn-primary" onClick={handleOrderVisitClick}>
                        Ordem de Visitação
                    </button>
                </div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Coordenada X</th>
                        <th>Coordenada Y</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.nome}</td>
                            <td>{customer.email}</td>
                            <td>{customer.telefone}</td>
                            <td>{customer.coordenada_x}</td>
                            <td>{customer.coordenada_y}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditClick(customer)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteClick(customer.id)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CadastroModal showModal={showModal} handleClose={handleCloseModal} customer={customerSelected} />
            {showOrdemVisitaModal && (
                <ModalOrdemVisita show={showOrdemVisitaModal} handleClose={() => setShowOrdemVisitaModal(false)} ordemVisita={ordemVisita} />
            )}
        </div>
    );
};

export default CustomerList;
