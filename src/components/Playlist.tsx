import React from 'react'
import styled from '@emotion/styled'
import { PlaylistItem } from '../components'
import { Track } from '../actions/create'

interface PlaylistProps {
  tracks: Track[]
}

const Playlist: React.FC<PlaylistProps> = ({ tracks }) => {
  return (
    <Wrapper>
      {tracks.map((track, i) => (
        <PlaylistItem
          key={i}
          order={i + 1}
          title={track.title}
          artist={track.artist}
          album={track.album}
          duration={track.duration}
          link={track.link}
        />
      ))}
    </Wrapper>
  )
}

export default React.memo(Playlist)

const Wrapper = styled.ol`
  margin: 50px 0;
`
