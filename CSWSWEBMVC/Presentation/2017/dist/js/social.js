window.jQuery(document).ready ($) ->

  # Particles Animation - https://codepen.io/html5andblog/pen/jWbLbj
  
  windowXArray = windowYArray = []
  [0..$(window).innerWidth()].forEach (e, i) ->
    windowXArray.push i

  [0..$(window).innerHeight()].forEach (e, i) ->
    windowYArray.push i

  randomPlacement = (array) ->
    array[Math.floor Math.random() * array.length]

  canvas = oCanvas.create
     canvas: '#canvas_social'
     fps: 60

  setInterval ->

    rectangle = canvas.display.ellipse
       x: randomPlacement windowXArray
       y: randomPlacement windowYArray
       origin: { x: 'center', y: 'center' }
       radius: 0
       fill: 'red'
       opacity: 1

    canvas.addChild rectangle
    rectangle.animate {
      radius: 10,
      opacity: 0
    }, {
      duration: '3000',
      easing: 'linear',
      callback: -> do @remove
    }

  , 100

  $(window).resize ->
    canvas.width = do $(window).innerWidth
    canvas.height = do $(window).innerHeight

  do $(window).resize
  
