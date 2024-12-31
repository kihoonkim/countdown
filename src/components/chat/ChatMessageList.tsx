import styled from 'styled-components';
import {MessageType} from "../../services/chat-service.ts";
import {useEffect, useRef} from "react";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
    height: 100%;
    overflow: scroll;
  `,
  MessageBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.span`
    color: #999999
  `,
  Message: styled.span``,
};

interface Props {
  messages: MessageType[];
}

function ChatMessageList({ messages }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  return (
    <S.Container ref={listRef}>
      {
        messages.map((msg) => (
          <S.MessageBox key={msg.id}>
            <S.Name>{msg.name}</S.Name>
            <S.Message>{msg.message}</S.Message>
          </S.MessageBox>
        ))
      }
    </S.Container>
  );
}

export default ChatMessageList;
