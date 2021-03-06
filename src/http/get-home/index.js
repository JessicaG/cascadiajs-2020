let arc = require('@architect/functions')
const data = require('@begin/data')
const HomeView = require('@architect/views/home')
const FormView = require('@architect/views/home/form')

// render the form
async function unauthenticated(req) {
  if (req.session.ticketRef) return
  else {
    let message
    if (req.query.notfound) {
      message = 'We could not find that Ticket Reference. Please email info@cascadiajs.com for assistance'
    }
    return FormView({ message })
  }
}

// display the ticket information
async function authenticated(req) {
  const ticket = await data.get({ table: 'tickets', key: req.session.ticketRef })
  return HomeView({ ticket })

}

exports.handler = arc.http.async(unauthenticated, authenticated)