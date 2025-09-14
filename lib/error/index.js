class customError extends Error{
    constructor(message){
      super(message)
      this.isOperational = true
      Error.captureStackTrace(this, this.constructor)
    }
  }
  

module.exports = {
    customError
}