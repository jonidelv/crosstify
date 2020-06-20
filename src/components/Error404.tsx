import React from 'react'
import styled from '@emotion/styled'
import { palette } from '../constants'
import errorBg from '../assets/error-bg.jpg'

const Error404: React.FC = () => {
  return (
    <Wrapper>
      <Overlay>Sorry, couldn't find that.</Overlay>
    </Wrapper>
  )
}

export default React.memo(Error404)

const Wrapper = styled.div`
  background: ${palette.background};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${errorBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 45px;
  font-weight: 200;
  color: ${palette.white};
  letter-spacing: 1px;
`
