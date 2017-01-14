// Element: <%= name %>
//
// We can use bel instead of choo/html to keep elements modular
// and allow them to easily move outisde of the app.
import * as html from 'bel'

export default () => html`<div> <%= name %> </div>`
