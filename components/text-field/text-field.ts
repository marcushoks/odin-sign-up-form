fetch("./components/text-field/text-field.html")
  .then((res) => res.text())
  .then((res) => defineTextField(res));

function defineTextField(customElementHTML: string) {
  class TextField extends HTMLElement {
    constructor() {
      super();

      const customElement = new DOMParser()
        .parseFromString(customElementHTML, "text/html")
        .querySelector("#text-field");

      const shadow = this.attachShadow({ mode: "open" });

      if (customElement instanceof HTMLTemplateElement) {
        shadow.appendChild(customElement.content.cloneNode(true));
      }
    }

    static get observedAttributes() {
      return ["type", "id", "name"];
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
      const input = this.shadowRoot?.querySelector("input");
      input?.setAttribute(name, newValue);
    }
  }

  customElements.define("text-field", TextField);
}
