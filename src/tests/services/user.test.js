import fetchMock from 'fetch-mock'
import userService from '../../services/user'
import apiEndpoints from '../../constants/apiEndpoints'

describe('userService get', () => {

  afterEach(() => {
    fetchMock.restore()
  })

  it('makes a GET request to apiEndpoints.me', () => {
    const url = `${apiEndpoints.base}${apiEndpoints.me}`

    fetchMock.mock(url, {
      status: 200,
      body: {
        data: {
          id: '1234',
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }, {
      method: 'GET',
    })

    return userService.get()
      .then((res) => {
        expect(res.data.id).toBe('1234')
        expect(fetchMock.called(url)).toBeTruthy()
        expect(fetchMock.lastUrl()).toBe(url)
        expect(fetchMock.lastOptions().method).toBe('GET')
      })
  })

})
