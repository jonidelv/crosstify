// import { handleActions } from '@housinganywhere/safe-redux'

import { Actions, Track } from '../actions/create'
import { ActionTypes } from '../constants/actionTypes'

interface CreateState {
  inputValue: string
  inputValueError: boolean
  playlistName: string
  fetchingTracks: boolean
  generatingPlaylist: boolean
  errorFetchingDescription: string
  tracks: Track[]
  deleting: boolean
}

const initialState: CreateState = {
  inputValue: '',
  inputValueError: false,
  playlistName: '',
  fetchingTracks: false,
  generatingPlaylist: false,
  errorFetchingDescription: '',
  tracks: [],
  deleting: false,
}

// type CreateActionTypes =
//   | ActionTypes.CHANGE_INPUT_VALUE
//   | ActionTypes.CHANGE_PLAYLIST_NAME
//   | ActionTypes.CLEAR_INPUT_VALUE
//   | ActionTypes.ERROR_FETCHING
//   | ActionTypes.GENERATING_PLAYLIST
//   | ActionTypes.IS_DELETING
//   | ActionTypes.PUSH_NEW_TRACK
//   | ActionTypes.TRACKS_BEING_FETCHED

// This is how I should handdle createReducer if using safe-redux
// const createReducer = handleActions<CreateState, CreateActionTypes, Actions>(
//   {
//     [ActionTypes.CHANGE_INPUT_VALUE]: (s, { payload }) => ({ ...s, inputValue: payload }),
//     [ActionTypes.CHANGE_PLAYLIST_NAME]: s => s,
//     [ActionTypes.CLEAR_INPUT_VALUE]: (s, action) => s,
//     [ActionTypes.ERROR_FETCHING]: s => s,
//     [ActionTypes.GENERATING_PLAYLIST]: s => s,
//     [ActionTypes.IS_DELETING]: s => s,
//     [ActionTypes.PUSH_NEW_TRACK]: (s, { payload }) => ({ ...s, tracks: [...s.tracks, payload] }),
//     [ActionTypes.TRACKS_BEING_FETCHED]: s => s,
//   },
//   initialState
// )

export default function create(state: CreateState = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      }

    case ActionTypes.CLEAR_INPUT_VALUE:
      return {
        ...state,
        inputValue: '',
        playlistName: '',
        tracks: [],
        fetchingTracks: false,
        errorFetchingDescription: '',
      }

    case ActionTypes.CHANGE_PLAYLIST_NAME:
      return {
        ...state,
        playlistName: action.payload,
      }

    case ActionTypes.ERROR_FETCHING:
      return {
        ...state,
        errorFetchingDescription: action.payload,
      }

    case ActionTypes.TRACKS_BEING_FETCHED:
      return {
        ...state,
        fetchingTracks: action.payload,
      }

    case ActionTypes.PUSH_NEW_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      }

    case ActionTypes.GENERATING_PLAYLIST:
      return {
        ...state,
        generatingPlaylist: action.payload,
      }

    case ActionTypes.IS_DELETING:
      return {
        ...state,
        deleting: action.payload,
      }

    default:
      return state
  }
}
