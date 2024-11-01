import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal = styled.div`
  max-width: 500px;
  width: 90%;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const ModalContent = styled.div`
  overflow: auto;
  min-height: 200px;
  padding: 0px 40px;
  padding-bottom: 80px;
`;
export const ModalFooter = styled.div`
  box-shadow: 0px -2px 10px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;
export const ConfirmButton = styled.div`
  margin: 10px;
  color: white;
  height: 40px;
  border-radius: 5px;
  padding: 5px 20px;
  text-align: center;
  min-width: 120px;
  cursor: pointer;
  font-weight: 500;
  
  ${props => props.delete ? `
    background-color: #FF4B4B;
  ` : `
    background-color: #FFA162;
  `}

  &:hover {
    opacity: 0.9;
  }
`;
const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;
const ModalBanner = styled.div`
  margin-bottom: 0;
  background-color: #f8f9fa;
  color: #2d3748;
  padding: 15px 20px;
  font-weight: 500;
  border-bottom: 1px solid #edf2f7;
`;
const Input = styled.input`
  text-align: right;
  width: 200px;
  margin-left: 15px;
`;
export const MainButton = styled.button``;

export function ModalContainer({
  close,
  onDelete,
  name = 'Name',
  type = 'category',
}) {
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={close} />
      <Modal>
        <ModalBanner>
          Delete '{name}' {type}
        </ModalBanner>
        <ModalContent>
          <p>
            Are you sure you want to delete this {type}?
            <br />
            <br />
            This action cannot be reversed.
          </p>
        </ModalContent>
        <ModalFooter>
          <ConfirmButton delete onClick={onDelete}>Delete</ConfirmButton>
          <ConfirmButton onClick={close}>Cancel</ConfirmButton>
        </ModalFooter>
      </Modal>
    </>,
    document.getElementById('app-modal'),
  );
}
