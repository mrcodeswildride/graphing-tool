let canvas = document.getElementById(`canvas`)
let context = canvas.getContext(`2d`)

let equation = document.getElementById(`equation`)
let graphButton = document.getElementById(`graphButton`)
let errorParagraph = document.getElementById(`errorParagraph`)

let halfWidth = canvas.width / 2
let halfHeight = canvas.height / 2
let leftEdge = -10
let rightEdge = 10
let bottomEdge = -10
let topEdge = 10
let numPoints = 200

context.translate(halfWidth, halfHeight)
context.scale(halfWidth / rightEdge, halfHeight / bottomEdge)
context.lineWidth = 1 / (halfWidth / rightEdge)

drawAxes()

graphButton.addEventListener(`click`, drawGraph)

equation.addEventListener(`keydown`, keyPressed)
equation.focus()

function drawAxes() {
  let notchSize = 0.2
  context.strokeStyle = `black`

  context.beginPath()
  context.moveTo(leftEdge, 0)
  context.lineTo(rightEdge, 0)
  context.closePath()
  context.stroke()

  for (let x = leftEdge + 1; x < rightEdge; x++) {
    if (x != 0) {
      context.beginPath()
      context.moveTo(x, -notchSize)
      context.lineTo(x, notchSize)
      context.closePath()
      context.stroke()
    }
  }

  context.beginPath()
  context.moveTo(0, bottomEdge)
  context.lineTo(0, topEdge)
  context.closePath()
  context.stroke()

  for (let y = bottomEdge + 1; y < topEdge; y++) {
    if (y != 0) {
      context.beginPath()
      context.moveTo(-notchSize, y)
      context.lineTo(notchSize, y)
      context.closePath()
      context.stroke()
    }
  }
}

function drawGraph() {
  let equationValue = equation.value.trim()

  context.clearRect(-halfWidth, -halfHeight, canvas.width, canvas.height)
  drawAxes()
  errorParagraph.innerHTML = ``

  context.strokeStyle = `blue`
  context.beginPath()

  try {
    for (let x = leftEdge; x <= rightEdge; x += (rightEdge - leftEdge) / numPoints) {
      let y = eval(equationValue)
      context.lineTo(x, y)
      context.stroke()
    }
  } catch (error) {
    errorParagraph.innerHTML = `Invalid equation.`
  }

  context.closePath()
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    drawGraph()
  }
}
