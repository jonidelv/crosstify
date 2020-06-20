import React from 'react'
import styled from '@emotion/styled'
import { palette } from '../constants'

const DarkBackground: React.FC = () => {
  return <Wrapper />
}

export default React.memo(DarkBackground)

const Wrapper = styled.div`
  background: ${palette.background};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`
