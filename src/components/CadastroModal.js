// src/components/CadastroModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CadastroModal = ({ showModal, handleClose, updateList, customer }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');

  useEffect(() => {
    if (customer) {
      setNome(customer.nome);
      setTelefone(customer.telefone);
      setEmail(customer.email);
      setCoordenadaX(customer.coordenada_x);
      setCoordenadaY(customer.coordenada_y);
    }else{
      setNome('');
      setEmail('');
      setTelefone('');
      setCoordenadaX('');
      setCoordenadaY('');
    }
  }, [customer]);

  const handleCadastro = async () => {
    try {

      if (customer) {

        await axios.put(`http://localhost:3001/customers/update/${customer.id}`, {
          nome,
          email,
          telefone,
          coordenada_x: coordenadaX,
          coordenada_y: coordenadaY
        });
      } else {

        await axios.post('http://localhost:3001/customers/insert', {
          nome,
          email,
          telefone,
          coordenada_x: coordenadaX,
          coordenada_y: coordenadaY
        });
      }

      alert('Cadastro realizado com sucesso!');
      handleClose();

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data) {
        const errorMessage = error.response.data.error || 'Erro ao cadastrar cliente';
        alert(errorMessage);
      } else {
        alert('Erro ao cadastrar cliente:' + error);
      }
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{customer ? 'Atualizar' : 'Cadastrar'} Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formTelefone" className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))} />
          </Form.Group>
          <Form.Group controlId="formCoordenadaX" className="mb-3">
            <Form.Label>Coordenada X</Form.Label>
            <Form.Control type="number" value={coordenadaX} onChange={(e) => setCoordenadaX(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCoordenadaY" className="mb-3">
            <Form.Label>Coordenada Y</Form.Label>
            <Form.Control type="number" value={coordenadaY} onChange={(e) => setCoordenadaY(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleCadastro}>
          {customer ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CadastroModal;
