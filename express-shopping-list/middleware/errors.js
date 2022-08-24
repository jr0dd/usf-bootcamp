import chalk from 'chalk'

class ExpressError extends Error {
  constructor (message, status) {
    super()
    this.message = message
    this.status = status
    console.error(chalk.redBright(this.stack))
  }
}

const errorHandler = () => {
  return (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
    return res.status(status).json({
      error: {
        status,
        message
      }
    })
  }
}

export { ExpressError, errorHandler }
