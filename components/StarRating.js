customElements.define('otaku-star-rating', class extends HTMLElement {
  constructor () {
    super()
  
    this.max = 5
    this.value = 4.5
    this.size = 32
    this.color = 'green'
    this.stars = []

    this.root = this.attachShadow({ mode: 'open' })

    this.main = document.createElement('div')
    this.styleDef = document.createElement('style')
    this.styleDef.innerHTML = `
      :host > div {
        display: inline-flex;
        justify-content: space-between;
        cursor: pointer;
      }
    `

    this.main.addEventListener('mousemove', this._handleMouseMove.bind(this))
    this.main.addEventListener('mouseleave', this._handleMouseLeave.bind(this))
    this.main.addEventListener('click', this._handleClick.bind(this))
    
    this.root.appendChild(this.main)
    this.root.appendChild(this.styleDef)
  }

  static get observedAttributes () {
    return ['max', 'value', 'size', 'color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue == newValue) return
    this[name] = newValue
    this._draw()
  }

  _draw () {
    const { main, max, value, size, color } = this
    while (main.firstChild) main.removeChild(main.firstChild)
    this.stars = []
    this.main.style.width = `${size*max + size/3*(max-1)}px`
    for (let i = 0; i < max; i++) {
      const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      container.setAttribute('width', `${size}`)
      container.setAttribute('height', `${size}`)
      const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      shape.setAttribute('d', `M 200 300 L 329 360 L 295 231 L 390 129 L 259 119 L 200 10 L 141 119 L 10 129 L 105 231 L 71 360 Z`)
      shape.setAttribute('transform', `scale(${size/400})`)
      shape.setAttribute('fill', 'none')
      shape.setAttribute('stroke', color)
      shape.setAttribute('stroke-width', size/10)

      container.appendChild(shape)
      this.main.appendChild(container)
      this.stars.push(shape)
    }
    this._highlightStars(value)
  }

  _highlightStars (value) {
    this.stars.forEach((star, i) => {
      star.setAttribute('fill', 'none')
      switch (true) {
        //case value - i > 0.25 && value - i < 0.75: 
        case value - i > 0: star.setAttribute('fill', this.color)
      }
    })
  }

  _handleMouseMove (e) {
    const clientBox = this.getBoundingClientRect()
    this.mark = ~~((e.pageX - clientBox.left) / clientBox.width * this.max) + 1
    this._highlightStars(this.mark)
  }

  _handleMouseLeave () {
    this._highlightStars(this.value)
  }

  _handleClick () {
    const event = new Event('submit')
    event.mark = this.mark
    this.dispatchEvent(event)
  }
})