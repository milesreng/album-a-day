const notFound = (request, response, next) => {
  const error = new Error(`Not found - ${request.originalUrl}`)
  response.status(404)
  next(error)
}

const errorHandler = (error, request, response) => {
  let statusCode = response.statusCode === 200 ? 500 : response.statusCode
  let message = error.message

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    message = 'Resource not found'
    statusCode = 404
  }

  response.status(statusCode).json({
    message: message,
    stack: error.stack
  }) 
}

module.exports = {
  notFound,
  errorHandler
}