import React from 'react'
import PropTypes from 'prop-types'
import { LoginView } from '../components'
import lscache from 'lscache'
import { connect } from 'react-redux'
import axios from 'axios'
import { tokenType, storageKey, apiEndpoints } from '../constants'

const transitionLogin = props => () => {
  const clientId = process.env.REACT_APP_CLIENT_ID
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET
  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const authOptions = {
    method: 'post',
    url: apiEndpoints.token,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
    data: urlencoded,
  }

  axios(authOptions)
    .then(response => {
      const exp = response.data.expires_in / 60
      const payload = {
        token: response.data.access_token,
        type: tokenType.clientCredentialsFlow,
      }
      lscache.set(storageKey, payload, exp)
      props.dispatch({ type: 'MAKE_LOGIN' })
      props.history.push('/create')
    })
    .catch(err => {
      console.log('err', err)
    })
}

const Login = props => {
  React.memo(() => {
    if (props.loggedIn) props.history.push('/create')
  }, [])

  return <LoginView onPressLoginBtn={transitionLogin(props)} errorDescription={props.errorDescription} />
}

const mapStateToProps = state => ({
  errorDescription: state.login.errorDescription,
  loggedIn: state.login.loggedIn,
})

Login.propTypes = {
  errorDescription: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(React.memo(Login))
