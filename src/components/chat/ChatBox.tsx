import styled from 'styled-components';
import ChatInput from "./ChatInput.tsx";
import {listenNewChatMessages, MessageType, sendMessage} from "../../services/chat-service.ts";
import {useEffect, useState} from "react";
import ChatMessageList from "./ChatMessageList.tsx";

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    font-family: "Diphylleia", serif;
  `,
};

function ChatBox() {
  const [name, setName] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    const unsubscribe = listenNewChatMessages((msg) => {
      const exist = messages.some((m) => m.id === msg.id)
      if (!exist) {
        setMessages((list) => [...list, msg])
      }
    })

    return () => unsubscribe()
  }, []);

  const handleOnNameChanged = (n: string) => {
    setName(n.trim())
  }

  const handleOnEnter = async (msg: string) => {
    await sendMessage(name, msg)
  }

  return (
    <S.Container>
      <ChatMessageList messages={messages} />
      <ChatInput name={name} onNameChanged={handleOnNameChanged} onEnter={handleOnEnter} />
    </S.Container>
  );
}

export default ChatBox;
