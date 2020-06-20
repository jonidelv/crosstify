function getRandomInt(min = 1, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomInt
