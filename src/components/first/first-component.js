class FirstComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 'First Component';
    }
}

window.customElements.define('first-component', FirstComponent);