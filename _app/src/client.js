import choo from 'choo'

import model from './models/app'
import home from './pages/home'

const app = choo()

app.model(model)

app.router([
  [ '/', home ]
])

const tree = app.start()

document.body.appendChild(tree)
