const fs = require('fs').promises;

async function log(method, path, err) {
  // await the append
  try {
    await fs.appendFile('./log.txt', `${method} ${path} ${Date.now()}`);
    // pass along(throw) the error if it exists
  } catch {
    console.error(err);
  }
}
// TODO: CHECK path.join

function logger(request, reponse, next) {
  next(); // move on to the next piece of middleware
  return log(`METHOD: ${request.method} PATH:${request.path}`);
  // log "method path timestamp" to log.txt
  // WARNING: be careful about pathing
}

module.exports = logger;
