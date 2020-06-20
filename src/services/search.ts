import { AxiosResponse } from 'axios'
import { apiEndpoints } from '../constants'
import api from './api'
import getRandomInt from '../utils/getRandomInt'

interface SearchService {
  get: (playlistNameLastCh: string) => Promise<AxiosResponse>
}

const get = playlistNameLastCh => {
  const query = {
    q: `track:${playlistNameLastCh}`,
    type: 'track',
    limit: 50,
    offset: getRandomInt(),
  }

  return api.get(`${apiEndpoints.search}`, { params: query })
}

const searchService: SearchService = { get }

export default searchService
