import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import Fireworks, {FireworksHandlers} from "@fireworks-js/react";
import {useRecoilValue} from "recoil";
import {countdownState} from "../../states/countdown-state.ts";

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  `,
};

function buildOptions(countdown: boolean) {
  return countdown ? {
    traceLength: 5,
    intensity: 60,
    rocketsPoint: {
      min: 0, max: 100,
    }
  } : {
    traceLength: 1,
    sound: {
      enabled: false,
    },
    intensity: 5,
  }
}
function FireworkView() {
  const ref = useRef<FireworksHandlers>(null)
  const countdown = useRecoilValue(countdownState);

  useEffect(() => {
    if (!ref.current) return
    ref.current.start()

    return () => {
      if (!ref.current) return
      if (ref.current.isRunning) {
        ref.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return
    ref.current.updateOptions(buildOptions(countdown))
  }, [countdown]);

  const options = buildOptions(countdown)
  return (
    <S.Container>
      <Fireworks
        ref={ref}
        options={options}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
        }}
      />
    </S.Container>
  );
}

export default FireworkView;
