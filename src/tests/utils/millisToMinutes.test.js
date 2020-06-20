import millisToMinutes from '../../utils/millisToMinutes'

describe('util function millisToMinutes test', () => {

  it('check millisToMinutes format correctly case 205000', () => expect(
    millisToMinutes(205000)).toEqual('3 : 25')
  )

  it('check millisToMinutes format correctly case 100010', () => expect(
    millisToMinutes(100010)).toEqual('1 : 40')
  )

})
