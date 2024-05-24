const players = [
  {
    name: 'Tiziano',
    lastname: 'Ferro',
    photo: 'img/tiziano-ferro.png'
  },
  {
    name: 'Tomas',
    lastname: 'Dular',
    photo: 'img/tomas-dular.png'
  },
  {
    name: 'Agustin',
    lastname: 'Jerez',
    photo: 'img/agustin-jerez.png'
  },
  {
    name: 'Sebastian',
    lastname: 'Moschen',
    photo: 'img/sebastian-moschen.png'
  },
  {
    name: 'Lautaro',
    lastname: 'Chaparro',
    photo: 'img/lautaro-chaparro.png'
  },
  {
    name: 'Nicolas',
    lastname: 'Rodriguez',
    photo: 'img/nicolas-rodriguez.png'
  },
  {
    name: 'Pietro',
    lastname: 'Elviretti',
    photo: 'img/pietro-elviretti.png'
  },
  {
    name: 'Matias',
    lastname: 'Quinteros',
    photo: 'img/matias-quinteros.png'
  },
  {
    name: 'Facundo',
    lastname: 'Dimitrioff',
    photo: 'img/facundo-dimitrioff.png'
  },
  {
    name: 'Javier',
    lastname: 'Jimenez',
    photo: 'img/javier-jimenez.png'
  },
  {
    name: 'Bautista',
    lastname: 'Gonzales',
    photo: 'img/bautista-gonzales.png'
  }
]

const playersAll = []

for (const p of players) {
  playersAll.push(...['PT', 'DF', 'MC', 'DEL'].map(position => ({ ...p, position })))
}

module.exports = playersAll