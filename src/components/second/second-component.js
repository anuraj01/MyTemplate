class SecondComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 'Second Component';
    }
}

window.customElements.define('second-component', SecondComponent);