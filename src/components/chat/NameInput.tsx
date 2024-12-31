import styled from 'styled-components';
import {ChangeEvent, useState} from "react";

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    font-family: "Jua", serif;
  `,
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  `,
  Content: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15rem;
    background-color: black;
    padding: 2rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  Name: styled.span`
    font-weight: bold;
  `,
  Input: styled.input`
    width: calc(100% - 1rem);
    padding: 0.5rem;
    outline: none;
    border: 1px solid #ffffff;
    border-radius: 5px;
    caret-color: #00FF41;
    &:focus {
      border: 1px solid #00FF41;
    }
  `,
  Button: styled.div`
    width: 3rem;
    height: 2rem;
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ffffff;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: 1px solid #00FF41;
      background-color: #00FF4140;
    }
  `
};

interface AppProps {
  isOpen: boolean;
  onChange: (name: string) => void;
  onClose: () => void;
}

function NameInput({ isOpen, onChange, onClose }: AppProps) {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleOnConfirm = () => {
    onChange(value)
  }
  if (!isOpen) return <></>
  return (
    <S.Container>
      <S.Overlay onClick={onClose}></S.Overlay>
      <S.Content>
        <S.Name>이름</S.Name>
        <S.Input value={value} onChange={handleOnChange} autoFocus />
        <S.Button onClick={handleOnConfirm}>확인</S.Button>
      </S.Content>
    </S.Container>
  );
}

export default NameInput;
