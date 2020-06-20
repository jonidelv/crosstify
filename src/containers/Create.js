import React from 'react'
import PropTypes from 'prop-types'
import lscache from 'lscache'
import { tokenType, storageKey } from '../constants'
import { sites } from '../constants'
import { CreateView } from '../components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions, generatePlaylist as generatePlaylistAction, fetchTracks } from '../actions/create'

const createActions = { ...Actions, generatePlaylistAction, fetchTracks }

const isFetchingTracks = props => {
  const playlistNameLgth = props.playlistName.replace(/ /g, '').length - 1
  return playlistNameLgth === props.tracks.length
}

const renderTask = props => () => {
  if (!props.loggedIn) props.history.push('/')
  if (isFetchingTracks(props)) {
    props.tracksBeingFetched(false)
  }
}

const isKeyDownDelete = props => e => {
  if (e.keyCode === 8) {
    props.isDeleting(true)
    props.tracksBeingFetched(false)
  } else {
    props.isDeleting(false)
  }
}

const clearInputValue = props => () => {
  props.clearInputValue()
}

const onInputChange = props => e => {
  if (props.deleting) {
    clearInputValue(props)()
    return
  }
  const value = e.target.value
  props.changeInputValue(value)
  if (!/[^a-z ]/i.test(value)) {
    props.fetchTracks(value, value.length - 1)
  }
}

const generatePlaylist = props => {
  const playlistName = props.playlistName
  const uris = props.tracks.sort((a, b) => a.order - b.order).map(track => track.uri)
  props.generatePlaylist(uris, playlistName)
}

const implicitGrantFlowLogin = props => {
  const callback = process.env.NODE_ENV === 'development' ? `${sites.dev}/callback` : `${sites.prod}/callback`
  const redirect = encodeURIComponent(callback)
  const base = 'https://accounts.spotify.com/'
  const client = process.env.REACT_APP_CLIENT_ID
  const scope = 'user-read-private user-library-read user-top-read playlist-modify-public'
  const scopeUri = encodeURIComponent(scope)
  const playlistName = props.playlistName
  const tracks = props.tracks.sort((a, b) => a.order - b.order).map(track => track.uri.replace('spotify:track:', ''))
  tracks.push(playlistName) // Add playlist name to the state
  const state = encodeURIComponent(tracks.join('.'))
  const url = `${base}authorize?client_id=${client}&redirect_uri=${redirect}&scope=${scopeUri}&response_type=token&state=${state}`
  window.location.replace(url)
}

const onGeneratePlaylist = props => () => {
  const data = lscache.get(storageKey)
  const type = data && data.type
  if (type === tokenType.implicitGrantFlow) {
    generatePlaylist(props)
    return
  }

  implicitGrantFlowLogin(props)
}

const Create = props => {
  // Similar to comp will mount or construct
  React.useMemo(renderTask(props), [])
  React.useEffect(renderTask(props))

  return (
    <CreateView
      inputValue={props.inputValue}
      onInputChange={onInputChange(props)}
      clearInputValue={clearInputValue(props)}
      playlistName={props.playlistName}
      fetchingTracks={props.fetchingTracks}
      tracks={props.tracks.sort((a, b) => a.order - b.order)}
      generatingPlaylist={props.generatingPlaylist}
      errorFetchingDescription={props.errorFetchingDescription}
      onGeneratePlaylist={onGeneratePlaylist(props)}
      isKeyDownDelete={isKeyDownDelete(props)}
    />
  )
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  inputValue: state.create.inputValue,
  playlistName: state.create.playlistName,
  fetchingTracks: state.create.fetchingTracks,
  tracks: state.create.tracks,
  generatingPlaylist: state.create.generatingPlaylist,
  errorFetchingDescription: state.create.errorFetchingDescription,
  deleting: state.create.deleting,
})

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(createActions, dispatch)
  return {
    changeInputValue: actions.changeInputValue,
    clearInputValue: actions.clearInputValue,
    fetchTracks: actions.fetchTracks,
    generatePlaylist: actions.generatePlaylistAction,
    tracksBeingFetched: actions.tracksBeingFetched,
    isDeleting: actions.isDeleting,
  }
}

Create.propTypes = {
  changeInputValue: PropTypes.func.isRequired,
  clearInputValue: PropTypes.func.isRequired,
  fetchTracks: PropTypes.func.isRequired,
  generatePlaylist: PropTypes.func.isRequired,
  tracksBeingFetched: PropTypes.func.isRequired,
  isDeleting: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  fetchingTracks: PropTypes.bool.isRequired,
  tracks: PropTypes.array.isRequired,
  generatingPlaylist: PropTypes.bool.isRequired,
  errorFetchingDescription: PropTypes.string.isRequired,
  deleting: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Create))
