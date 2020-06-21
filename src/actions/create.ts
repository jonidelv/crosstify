import { ThunkAction } from 'redux-thunk'
import { createAction, ActionsUnion } from '@housinganywhere/safe-redux'
import { RootState } from '../reducers'

import { ActionTypes } from '../constants/actionTypes'
import userService from '../services/user'
import playlistService from '../services/playlist'
import searchService from '../services/search'
import { siteName } from '../constants'

export interface Track {
  title: string
  artist: string
  album: string
  duration: number
  id: string
  order: number
  link: string
  uri: string
}

export const Actions = {
  changeInputValue: (input: string) => createAction(ActionTypes.CHANGE_INPUT_VALUE, input),
  clearInputValue: () => createAction(ActionTypes.CLEAR_INPUT_VALUE),
  changePlaylistName: (name: string) => createAction(ActionTypes.CHANGE_PLAYLIST_NAME, name),
  errorFetching: (error: string) => createAction(ActionTypes.ERROR_FETCHING, error),
  pushNewTrack: (track: Track) => createAction(ActionTypes.PUSH_NEW_TRACK, track),
  generatingPlaylist: (generate: boolean) => createAction(ActionTypes.GENERATING_PLAYLIST, generate),
  tracksBeingFetched: (beingFetched: boolean) => createAction(ActionTypes.TRACKS_BEING_FETCHED, beingFetched),
  isDeleting: (deleting: boolean) => createAction(ActionTypes.IS_DELETING, deleting),
}
export type Actions = ActionsUnion<typeof Actions>

type Thunk = ThunkAction<void, RootState, void, Actions>

export function generatePlaylist(uris: string[], playlistName: string): Thunk {
  return (dispatch, getState) => {
    let userId = ''
    let playlistUri = ''
    dispatch(Actions.generatingPlaylist(true))
    userService
      .get()
      .then(response => {
        const user: SpotifyApi.CurrentUsersProfileResponse = response.data
        userId = user.id
        return playlistService.create(userId, {
          name: playlistName,
          description: `Generated with ${siteName}`,
        })
      })
      .then(response => {
        const playlist: SpotifyApi.CreatePlaylistResponse = response.data
        playlistUri = playlist.external_urls.spotify
        return playlistService.addTracks(userId, playlist.id, {
          uris,
        })
      })
      .then(() => {
        window.open(playlistUri)
        dispatch(Actions.clearInputValue())
      })
      .catch(err => {
        dispatch(Actions.generatingPlaylist(false))
        dispatch(Actions.errorFetching(`${err} try again later`))
      })
      .finally(() => {
        dispatch(Actions.generatingPlaylist(false))
      })
  }
}

export function fetchTracks(playlistName: string, idx: number): Thunk {
  return (dispatch, getState) => {
    dispatch(Actions.changePlaylistName(playlistName))
    const order = idx
    const playlistNameLastCh = playlistName.substr(-1)
    if (playlistNameLastCh && playlistNameLastCh !== ' ') {
      dispatch(Actions.tracksBeingFetched(true))
      getSearchService(playlistNameLastCh)
        .then((track: SpotifyApi.TrackObjectFull) => {
          const newTrack = {
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            duration: track.duration_ms,
            id: track.id,
            order,
            link: track.external_urls.spotify,
            uri: track.uri,
          }
          const state = getState()
          const playlistName = state.create.playlistName
          const tracks = state.create.tracks
          const matchOrder = playlistName[newTrack.order] === playlistNameLastCh
          const exitPushNewTrack = tracks.length >= playlistName.length
          if (playlistName && !exitPushNewTrack && matchOrder) {
            dispatch(Actions.pushNewTrack(newTrack))
          }
          dispatch(Actions.errorFetching(''))
        })
        .catch((err: string) => {
          dispatch(Actions.errorFetching(`${err} try again later`))
        })
    }
  }
}

async function getSearchService(playlistNameLastCh: string) {
  let track: SpotifyApi.TrackObjectFull
  do {
    try {
      const response = await searchService.get(playlistNameLastCh)
      const data: SpotifyApi.TrackSearchResponse = response.data
      track = data.tracks.items.find(track => track.name[0] === playlistNameLastCh.toUpperCase())
    } catch (error) {
      console.log('error fetching track', error)
    }
  } while (!track)

  return track
}
