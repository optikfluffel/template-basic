/* Page: <%= name %> */

import html from 'choo/html'

export default (state, prev, send) => html`
  <main>
    <h1><%= name %></h1>
  </main>
`
