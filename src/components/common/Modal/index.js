import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AlertModal({ show, handleClose, handleSave }) {
  return (
    <Modal
      style={{ opacity: 1, backgroundColor: "rgba(0,0,0,0.5)", paddingTop: 50 }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
