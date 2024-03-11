import React from 'react';
import { Modal, Button, Table  } from 'react-bootstrap';

const ModalOrdemVisita = ({ show, handleClose, ordemVisita }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Ordem de Visitação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Coordenada X</th>
              <th>Coordenada Y</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(ordemVisita) ? (
                ordemVisita.slice(1).map((cliente, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.coordenada_x}</td>
                  <td>{cliente.coordenada_y}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum registro foi encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOrdemVisita;
