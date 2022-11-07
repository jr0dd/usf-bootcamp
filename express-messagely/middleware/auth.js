/** Middleware for handling req authorization for routes. */

import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

/** Middleware: Authenticate user. */

const authenticateJWT = (req, res, next) => {
  try {
    const tokenFromBody = req.body._token
    const payload = jwt.verify(tokenFromBody, SECRET_KEY)
    req.user = payload // create a current user
    return next()
  } catch (err) {
    return next()
  }
}

/** Middleware: Requires user is authenticated. */

const ensureLoggedIn = (req, res, next) => {
  if (!req.user) {
    return next({ status: 401, message: 'Unauthorized' })
  } else {
    return next()
  }
}

/** Middleware: Requires correct username. */

const ensureCorrectUser = (req, res, next) => {
  try {
    if (req.user.username === req.params.username) {
      return next()
    } else {
      return next({ status: 401, message: 'Unauthorized' })
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: 401, message: 'Unauthorized' })
  }
}
// end

export {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
}
