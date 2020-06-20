import { apiEndpoints } from '../constants'
import api from './api'

const playlistService = {}

playlistService.create = (userId, playlist) => api.post(`${apiEndpoints.user}/${userId}/playlists`, playlist)

playlistService.addTracks = (userId, playlistId, tracks) =>
  api.post(`${apiEndpoints.user}/${userId}/playlists/${playlistId}/tracks`, tracks)

export default playlistService
