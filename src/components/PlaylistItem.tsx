import React from 'react'
import styled from '@emotion/styled'
import { palette } from '../constants'
import millisToMinutes from '../utils/millisToMinutes'

interface PlaylistItemProps {
  title: string
  artist: string
  album: string
  duration: number
  order: number
  link: string
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ title, artist, album, duration, order, link }) => {
  return (
    <Track>
      <NameContainer>
        <Order>{order}.</Order>
        <Link href={link} target={'_blank'}>
          <Title>
            <Strong>{title[0]}</Strong>
            {title.substring(1)}
          </Title>
          <Description>{`${artist} - ${album}`}</Description>
        </Link>
      </NameContainer>
      <div>
        <Duration>{millisToMinutes(duration)}</Duration>
      </div>
    </Track>
  )
}

export default React.memo(PlaylistItem)

const Track = styled.li`
  display: flex;
  justify-content: space-between;
  color: ${palette.white};
  margin-bottom: 35px;
  cursor: default;
`
const NameContainer = styled.div`
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
  }
`
const Order = styled.div`
  font-size: 17px;
  margin-right: 20px;
  margin-top: 2px;
  color: ${palette.greyText};
  font-weight: 300;
  width: 22px;
`

const Title = styled.div`
  font-size: 18px;
  color: ${palette.white};
  font-weight: 300;
  text-transform: capitalize;
  padding-right: 15px;
  &:hover {
    color: ${palette.primary};
  }
`

const Description = styled.div`
  font-size: 15px;
  color: ${palette.greyText};
  font-weight: 300;
  text-transform: capitalize;
  margin-top: 5px;
  padding-right: 15px;
`

const Link = styled.a`
  display: block;
`

const Duration = styled.div`
  font-size: 16px;
  color: ${palette.greyText};
  font-weight: 300;
  margin-top: 2px;
  width: 55px;
`

const Strong = styled.span`
  color: ${palette.primary};
  font-size: 20px;
  font-weight: 400;
`
