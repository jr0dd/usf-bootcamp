document.addEventListener('mousemove', event => {
    const x = Math.round(event.pageX * 255 / window.innerWidth)
    const y = Math.round(event.pageY * 255 / window.innerHeight)
    const color = `rgb(0, ${x}, ${y})`
    document.body.style.backgroundColor = color
})
