//recebendo e armazenando a div do dino
const background = document.querySelector('.background')
const dino = document.querySelector('.dino')
let isJumping = false
let position = 0

//adicionando evento na tecla espaço(32)
const key = document.addEventListener('keyup', handleKeyUp)

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true

  //setInterval realiza uma acao a cada segundo, que é estipulado no final
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)
      //descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          //subindo
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 40)
    } else {
      //subindo
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 15)
}

function createCactus() {
  //criando um elemento no html (div)
  const cactus = document.createElement('div')
  // adicionando a posiçao do cactus
  let cacutusPosition = 1000
  // adicionando mais de um cactus
  let randoTime = Math.random() * 6000
  // adicionando estilo ao cactus com a posicao
  cactus.style.left = cacutusPosition + 'px'
  // adicionando uma classe
  cactus.classList.add('cactus')
  // adicionando o cactus como filho do background
  background.appendChild(cactus)

  // executar uma funcao a cada intervalo de tempo
  let leftInterval = setInterval(() => {
    // condicao para quando o cactus sair todo da tela
    if (cacutusPosition < -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    }
    // se o cactu estiver ocupando espacao do dino que é 60 px, ele vai parar a funcao e mudar o body
    else if (cacutusPosition > 0 && cacutusPosition < 60 && position < 60) {
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">FIM DE JOGO</h1>'
    } else {
      // faz com que o cactus se mova de 10 em 10 pixel
      cacutusPosition -= 10
      cactus.style.left = cacutusPosition + 'px'
    }
  }, 20)

  //setTimeout, executa uma funcao a cada tempo determinado
  // RECURSIVIDADE - pois a funcao createCactus esta se auto invocando depois de um determinado tempo
  setTimeout(createCactus, randoTime)
}

createCactus()
//adicionando evento na tecla espaço(32)
