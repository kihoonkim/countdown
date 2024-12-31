import CountDown from "./components/CountDown.tsx";
import ChatBox from "./components/chat/ChatBox.tsx";
import styled from "styled-components";
import {useEffect} from "react";
import {initFirebase} from "./firebase-helper.ts";
import FireworkView from "./components/firework/FireworkView.tsx";
import {RecoilRoot} from "recoil";
import HappyNewYear from "./components/HappyNewYear.tsx";

const S = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
  `,
  ChatContainer: styled.div`
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    width: 200px;
    height: 40vh;
    display: flex;
    justify-content: flex-end;
  `
};
function App() {

  useEffect(() => {
    initFirebase()
  }, []);
  return (
    <RecoilRoot>
      <S.Container>
        <FireworkView />
        <CountDown />
        <HappyNewYear />
        <S.ChatContainer>
          <ChatBox />
        </S.ChatContainer>
      </S.Container>
    </RecoilRoot>
  )
}

export default App
