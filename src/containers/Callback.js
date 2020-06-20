import React from 'react'
import PropTypes from 'prop-types'
import { DarkBackground } from '../components'
import queryString from 'query-string'
import lscache from 'lscache'
import { tokenType, storageKey } from '../constants'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeLogin, saveErrorDescription } from '../actions/login'
import { Actions, generatePlaylist as generatePlaylistAction } from '../actions/create'

const CreateActions = { ...Actions, generatePlaylistAction }
const LoginActions = { makeLogin, saveErrorDescription }

const parseHash = (hashName, location) => {
  const hash = location.hash.substr(1)
  return hash
    .substr(hash.indexOf(`${hashName}=`))
    .split('&')[0]
    .split('=')[1]
}

const parseUrl = props => () => {
  if (props.location.hash) {
    const token = parseHash('access_token', props.location)
    const exp = parseHash('expires_in', props.location) / 60
    const state = parseHash('state', props.location)
    const tracksWithPlaylist = state.split('.')
    const playlistName = tracksWithPlaylist.splice(-1, 1)[0]
    const tracksUris = tracksWithPlaylist.map(uri => `spotify:track:${uri}`)
    const payload = {
      token,
      type: tokenType.implicitGrantFlow,
    }
    lscache.set(storageKey, payload, exp)
    props.generatePlaylist(tracksUris, playlistName)
    props.history.push('/create')
  } else {
    const query = queryString.parse(props.location.search)
    const description = query.error ? query.error : 'Something unexpected happens try again'
    props.saveErrorDescription(description)
    props.history.push('/')
  }
}

const Callback = props => {
  React.useMemo(parseUrl(props), [])

  return <DarkBackground />
}

Callback.propTypes = {
  saveErrorDescription: PropTypes.func.isRequired,
  makeLogin: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  const loginActions = bindActionCreators(LoginActions, dispatch)
  const createActions = bindActionCreators(CreateActions, dispatch)

  return {
    saveErrorDescription: loginActions.saveErrorDescription,
    makeLogin: loginActions.makeLogin,
    generatePlaylist: createActions.generatePlaylistAction,
  }
}

export default connect(null, mapDispatchToProps)(React.memo(Callback))
