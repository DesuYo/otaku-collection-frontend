customElements.define('awesome-multi-select-box', class extends HTMLElement {
  constructor () {
    super()
    this.title = 'Title'
    this.list = ['Seinen', 'Echi', 'Hentai'] //just for example
    //this.main = document.createElement('div')
    this.titleDIV = document.createElement('div')
    this.titleDIV.classList.add('select-box-title')
    this.listUL = document.createElement('ul')
    this.listUL.classList.add('select-box-list')
    console.log(this.titleDIV)
  }

  connectedCallback () {
    this.append(this.titleDIV, this.listUL)
    console.log(this.listUL)
  }

  _draw (attrName) {
    //while (this.firstChild) this.removeChild(this.firstChild)
    if (attrName === 'list') 
      this.list.forEach(value => {
        const li = document.createElement('li')
        li.innerText = value
        this.listUL.appendChild(li)
      })
  }

  static get observedAttributes () {
    return ['title', 'options']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
    this._draw(name)
  }
})