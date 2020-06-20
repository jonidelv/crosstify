export const tokenType = {
  clientCredentialsFlow : 'Client Credentials Flow',
  implicitGrantFlow: 'Implicit Grant Flow',
}

export const siteName = 'Crosstify'

export const storageKey = 'spotifyCPTkn'

export const apiEndpoints = {
  token: 'https://accounts.spotify.com/api/token',
  base: 'https://api.spotify.com',
  user: '/v1/users',
  search: '/v1/search',
  me: '/v1/me',
}

export const sites = {
  dev: 'http://localhost:3000',
  prod: 'https://jonidelv.github.io/spotifyCP',
}

export const palette = {
  primary: '#07d159',
  white: '#fff',
  black: '#000',
  errorCode: '#d03b0b',
  background: 'linear-gradient(rgb(18, 18, 18), rgb(7, 7, 7) 85%)',
  inputBg: '#242424',
  greyText: 'hsla(0,0%,100%,.5)',
}