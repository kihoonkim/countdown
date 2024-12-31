import styled from 'styled-components';
import SendIcon from '../../assets/send.svg'
import {ChangeEvent, KeyboardEvent, useState} from "react";
import NameInput from "./NameInput.tsx";
const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  `,
  Input: styled.input`
    width: calc(100% - 4rem);
    padding: 0.5rem 1rem;
    background-color: #333333;
    outline: none;
    border: 1px solid #ffffff;
    border-radius: 5px;
    caret-color: #00FF41;
    &:focus {
      border: 1px solid #00FF41;
    }
  `,
  SendBtn: styled.div`
    width: 2rem;
    height: 2rem;
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
  `,
  SendImage: styled.img`
    width: 1.25rem;
    height: 1.25rem;
  `
};

interface Props {
  name: string
  onNameChanged: (name: string) => void;
  onEnter: (msg: string) => void;
}
function ChatInput({ name, onNameChanged, onEnter }: Props) {
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && !e.nativeEvent.isComposing) return
    handleOnEnter()
  }
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if(value) {
      setMsg(value);
    }
  }
  const handleOnEnter = () => {
    if (!msg) return

    onEnter(msg + '')
    setMsg('')
  }
  const handleOnFocus = () => {
    if (name) return
    setIsOpen(!isOpen)
  }
  const handleOnNameChanged = (n: string) => {
    setIsOpen(false)
    onNameChanged(n)
  }
  return (
    <S.Container>
      <NameInput isOpen={isOpen} onChange={handleOnNameChanged} onClose={() => setIsOpen(false)} />
      <S.Input value={msg} onChange={handleOnChange} onKeyDown={handleOnKeyDown} onFocus={handleOnFocus} />
      <S.SendBtn>
        <S.SendImage src={SendIcon} onClick={handleOnEnter} />
      </S.SendBtn>
    </S.Container>
  );
}

export default ChatInput;
