import styled from 'styled-components';
import {useRecoilValue} from "recoil";
import {countdownState} from "../states/countdown-state.ts";

const S = {
  Container: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #00FF41;
    font-size: 6rem;
    word-break: keep-all;
    width: 100%;
    text-align: center;
    @media (max-width: 500px) {
      top: 40%;
      font-size: 4rem;
    }
  `,
};

function HappyNewYear() {
  const countdown = useRecoilValue(countdownState);

  if (!countdown) return <></>

  return (
    <S.Container>
      새해 복 많이 받으세요
    </S.Container>
  );
}

export default HappyNewYear;
