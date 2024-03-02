const canvas = document.querySelector('canvas')
const plano = canvas.getContext('2d')
const sprite = document.querySelector('#sprite')
const bricks = document.querySelector('#bricks')

canvas.width = 400 // window.innerWidth - 100
canvas.height = 400

const PELOTA = {
  TAMAÑO: 5,
  X: canvas.width / 2,
  Y: canvas.height - 30,
  VELOCIDAD_X: 1,
  VELOCIDAD_Y: -1,
}

const BARRA = {
  WIDTH: 75,
  HEIGTH: 10,
  X: (canvas.width - 75) / 2,
  Y: canvas.height - 20,
  RIGTH: false,
  LEFT: false,
}

const limpiarCanvas = () => {
  plano.clearRect(0, 0, canvas.width, canvas.height)
}

const dibujarPelota = () => {
  plano.beginPath()
  plano.arc(PELOTA.X, PELOTA.Y, PELOTA.TAMAÑO, 0, Math.PI * 2)
  plano.fillStyle = 'white'
  plano.fill()
  plano.closePath()
}

const dibujarBarra = () => {
  plano.fillRect(BARRA.X, BARRA.Y, BARRA.WIDTH, BARRA.HEIGTH)
}

const dibujarBloques = () => {

}

const deteccionColision = () => {

}

const movimientoBarra = () => {
  if (BARRA.RIGTH && BARRA.X < canvas.width - BARRA.WIDTH) {
    BARRA.X += 4
  } else if (BARRA.LEFT && BARRA.X > 0) {
    BARRA.X -= 4
  }
}

const movimientoPelota = () => {
  if ( // COLISION DE PAREDES LATERALES
    PELOTA.X + PELOTA.VELOCIDAD_X > canvas.width - PELOTA.TAMAÑO ||
    PELOTA.X + PELOTA.VELOCIDAD_X < PELOTA.TAMAÑO
  ) {
    PELOTA.VELOCIDAD_X = -PELOTA.VELOCIDAD_X
  }

  if ( // COLISION CON EL TECHO
    PELOTA.Y + PELOTA.VELOCIDAD_Y < PELOTA.TAMAÑO
  ) {
    PELOTA.VELOCIDAD_Y = -PELOTA.VELOCIDAD_Y
  }

  if ( // COLISION CON LA BARRA
    PELOTA.X > BARRA.X &&
    PELOTA.X < BARRA.X + BARRA.WIDTH &&
    PELOTA.Y + PELOTA.VELOCIDAD_Y > BARRA.Y
  ) {
    PELOTA.VELOCIDAD_Y = - PELOTA.VELOCIDAD_Y
  } else if ( // COLISION CON EL SUELO
    PELOTA.Y + PELOTA.VELOCIDAD_Y > canvas.height - PELOTA.TAMAÑO
  ) {
    document.location.reload()
  }

  PELOTA.X += PELOTA.VELOCIDAD_X
  PELOTA.Y += PELOTA.VELOCIDAD_Y
}

const inicializarEventos = () => {
  const keyDownHandler = (event) => {
    const { key } = event

    if (key === 'Right' || key === 'ArrowRight') {
      BARRA.RIGTH = true
    } else if (key === 'Left' || key === 'ArrowLeft') {
      BARRA.LEFT = true
    }
  }

  const keyUpHandler = (event) => {
    const { key } = event

    if (key === 'Right' || key === 'ArrowRight') {
      BARRA.RIGTH = false
    } else if (key === 'Left' || key === 'ArrowLeft') {
      BARRA.LEFT = false
    }
  }

  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)
}

const dibujar = () => {

  limpiarCanvas()

  dibujarPelota()
  dibujarBarra()
  dibujarBloques()

  deteccionColision()
  movimientoBarra()
  movimientoPelota()

  window.requestAnimationFrame(dibujar)
}

dibujar()
inicializarEventos()