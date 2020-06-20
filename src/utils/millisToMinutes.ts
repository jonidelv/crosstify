function millisToMinutes(millis: number) {
  const minutes: number = Math.floor(millis / 60000)
  const seconds = Number(((millis % 60000) / 1000).toFixed(0))
  return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
}

export default millisToMinutes
