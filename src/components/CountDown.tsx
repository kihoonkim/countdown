import styled from 'styled-components';
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {countdownState} from "../states/countdown-state.ts";

const S = {
  Container: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: #00FF41;
    display: flex;
    font-family: "Rubik Vinyl", serif;
    @media (max-width: 500px) {
      top: 40%;
      font-size: 4rem;
    }
  `,
  Unit: styled.div`
    width: 8rem;
    @media (max-width: 500px) {
      width: 5.5rem;
    }
  `,
  BigUnit: styled.div`
    font-size: 12rem;
    @media (max-width: 500px) {
      font-size: 8rem;
    }
  `
};

function lpad(num: number) {
  return `${num}`.padStart(2, '0')
}
function CountDown() {
  const [diff, setDiff] = useState<number | undefined>(undefined);
  const [countdown, setCountdown] = useRecoilState(countdownState);

  useEffect(() => {
    const tomorrow = dayjs().add(1, 'day')
    const dday = dayjs(`${tomorrow.year()}-${lpad(tomorrow.month()+1)}-${lpad(tomorrow.date())} 00:00:00`);
    setInterval(() => {
      const now = dayjs()
      setDiff(dday.diff(now, 'second'))
    }, 1000)
  }, []);

  useEffect(() => {
    if (diff == undefined) return
    if (diff <= 0) {
      setCountdown(true)
    }
    if (diff < -3600) {
      setCountdown(false)
    }
  }, [diff])

  if (countdown) return <></>
  if (diff === undefined) return <></>

  const hour = Math.floor(diff / 3600);
  const minute = Math.floor((diff % 3600) / 60);
  const second = Math.floor((diff % 3600) % 60);
  return (
    <S.Container>
      {diff > 59 ? (
        <>
          <S.Unit>{`${lpad(hour)}`}</S.Unit>
          <span>:</span>
          <S.Unit>{`${lpad(minute)}`}</S.Unit>
          <span>:</span>
          <S.Unit>{`${lpad(second)}`}</S.Unit>
        </>
      ) : (
        <S.BigUnit>{`${second}`}</S.BigUnit>
      )}
    </S.Container>
  );
}

export default CountDown;
