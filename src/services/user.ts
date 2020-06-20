import { AxiosResponse } from 'axios'
import { apiEndpoints } from '../constants'
import api from './api'

interface UserService {
  get: () => Promise<AxiosResponse>
}

const get = () => api.get(apiEndpoints.me)

const userService: UserService = { get }

export default userService
