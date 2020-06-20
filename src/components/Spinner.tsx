import React from 'react'
import ring from '../assets/ring.svg'
import styled from '@emotion/styled'

interface SpinnerProps {
  loading: boolean
  height: number
}

const Spinner: React.FC<SpinnerProps> = ({ loading, height }) => {
  return !loading ? null : <Ring src={ring} height={height || 40} width={height || 40} alt={'Loading Spinner'} />
}

export default React.memo(Spinner)

const Ring = styled.img`
  display: inline-block;
  vertical-align: middle;
`
