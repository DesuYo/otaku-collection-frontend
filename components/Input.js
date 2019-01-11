customElements.define('otaku-input', class extends HTMLElement {
  constructor () {
    super()

    this.type = 'formData'
    this.label = 'Label'
    this.size = '40px'

    this.root = this.attachShadow({ mode: 'open' })
    this.template = this.root.appendChild(document.createElement('div'))
    this.styleDef = this.root.appendChild(document.createElement('style'))
    
    this.styleDef.innerHTML = `
      :host > div {
        display: flex;
        justify-content: space-between;
      }
      #temp > svg {
        flex: 0 0 30px
      }
      #temp > input {
        width: 100%;
        height: 2em;
        border-width: 2px;
        border-radius: 2px;
      }
    `
  }

  _genSVGSearchIcon () {
    const { size, color } = this
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    icon.setAttribute('viewBox', `0 0 ${size} ${size}`)
    icon.innerHTML = `
      <g fill='${color}' trasform='scale(${size/32})'>
        <path d="M27 24.57l-5.647-5.648a8.895 8.895 0 0 0 1.522-4.984C22.875 9.01 18.867 5 13.938 5 9.01 5 5 9.01 5 13.938c0 4.929 4.01 
        8.938 8.938 8.938a8.887 8.887 0 0 0 4.984-1.522L24.568 27 27 24.57zm-13.062-4.445a6.194 6.194 0 0 1-6.188-6.188 6.195 6.195 0 0 
        1 6.188-6.188 6.195 6.195 0 0 1 6.188 6.188 6.195 6.195 0 0 1-6.188 6.188z" />
      </g>
    `
    return icon
  }

  _draw () {
    const { type, label, size, color, hint } = this
    const elLabel = this.template.appendChild(document.createElement('label'))
    elLabel.innerText = label
    elLabel.style.cssText = `font-size: ${size/2}px; font-height: ${size}`

    switch (type) {
      case 'search': this.template.appendChild(this._genSVGSearchIcon()); break
      //case
    }


    const elInput = document.createElement('input')
    elInput.value = label
    elInput.style.bo
    elInput.style.fontSize = `${size/2}px`
  }

  static get observedAttributes () {
    return ['type', 'label', 'font', 'color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue == newValue) return
    this[name] = newValue
    this._draw()
  }
})