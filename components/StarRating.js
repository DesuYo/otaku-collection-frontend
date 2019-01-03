customElements.define('otaku-star-rating', class extends HTMLElement {
  constructor () {
    super()
    this.max = 5
    this.value = 4
    this.size = 32
    this.color = 'red'
    this.stars = []
    this._handleMouseMove.bind(this)
    this.addEventListener('mousemove', this._handleMouseMove)
    this.root = this.attachShadow({ mode: 'open' })
    this.main = document.createElement('div')
    this.main.id = 'main'
    this.root.appendChild(this.main)
    this.styleDef = document.createElement('style')
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
    this.styleDef.innerHTML = `
      #main {
        display: inline-flex;
        cursor: pointer;
      }

      #main > div { color: ${color} }
      
      #main > div::after {
        content: '\\2729';
        font-size: ${size}px;
      }
      
      #main > .full::after {
        content: '\\1F7CA';
        font-size: ${size}px;
      }
    `
    for (let i = 0; i < max; i++) {
      const star = document.createElement('div')
      this.main.appendChild(star)
      this.stars.push(star)
    }
  }

  _handleMouseMove (e) {
    const clientBox = this.getBoundingClientRect()
    const value = ~~((e.pageX - clientBox.left) / clientBox.width * this.max)
    this.stars.forEach((star, i) => star.classList.toggle('full', i < value + 1))
  }
})