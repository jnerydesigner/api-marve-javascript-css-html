import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <h1>Home</h1>
            <p>You are visiting the Home!</p>
        `;
    }
}