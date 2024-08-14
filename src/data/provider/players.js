const players = [
  {
    name: 'tiziano',
    lastname: 'ferro',
    position: 'MC'
  },
  {
    name: 'tomas',
    lastname: 'dular',
    position: 'DF'
  },
  {
    name: 'agustin',
    lastname: 'jerez',
    position: 'DF'
  },
  {
    name: 'sebastian',
    lastname: 'moschen',
    position: 'DF'
  },
  {
    name: 'lautaro',
    lastname: 'chaparro',
    position: 'DEL'
  },
  {
    name: 'nicolas',
    lastname: 'rodriguez',
    position: 'MC'
  },
  {
    name: 'pietro',
    lastname: 'elviretti',
    position: 'PT'
  },
  {
    name: 'matias',
    lastname: 'quinteros',
    position: 'PT'
  },
  {
    name: 'facundo',
    lastname: 'dimitrioff',
    position: 'PT'
  },
  {
    name: 'javier',
    lastname: 'jimenez',
    position: 'DEL'
  },
  {
    name: 'bautista',
    lastname: 'gonzales',
    position: 'DEL'
  },
  {
    name: 'fabricio',
    lastname: 'galvez',
    position: 'MC'
  },
  {
    name: 'romeo',
    lastname: 'dibello',
    position: 'DF'
  },
  {
    name: 'nicolas',
    lastname: 'fachinetti',
    position: 'DF'
  }
].map(p => ({ ...p, photo: `img/${p.name}-${p.lastname}.png` }))

module.exports = players