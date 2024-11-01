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
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    width: calc(100% - 20px);
    max-height: 80vh;
  }
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
  background-color: #1e3d6b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2a5494;
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
  margin-bottom: 20px;
  background-color: #1e3d6b;
  color: white;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
  font-weight: 500;
`;
const Input = styled.input`
  text-align: right;
  width: 200px;
  margin-left: 15px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #1e3d6b;
  }
`;
export const MainButton = styled.button``;

export function ModalContainer({ setOpen, data, setData }) {
  const [localData, setLocalData] = useState(data);
  const { clicks } = localData;
  function close() {
    setOpen(false);
  }
  function submit() {
    setData({
      clicks,
    });
    close();
  }
  const content = new Array(1).fill(
    <p>
      Edit the clicks below by clicking on the number input or typing in your
      own value.
    </p>,
  );
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={close} />
      <Modal>
        <ModalBanner>Edit Clicks</ModalBanner>
        <ModalContent>
          {content}
          <label>
            Clicks
            <Input
              value={clicks}
              type="number"
              onChange={e => setLocalData({ clicks: e.target.value })}
            />
          </label>
        </ModalContent>
        <ModalFooter>
          <ConfirmButton onClick={submit}> Submit </ConfirmButton>
        </ModalFooter>
      </Modal>
    </>,
    document.getElementById('app-modal'),
  );
}
