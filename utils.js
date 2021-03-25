const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
}

function convertNumsToArray(req, res, next) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if(!req.query.nums) return next(new BadRequestError("Nums are required"));

  //reassign to req.query.nums
  req.numsArray = req.query.nums.split(',').map(char => {
      if(Number.isNaN(Number(char))) {
        return next(new BadRequestError(`Invalid. '${char}' is not a number`))
      } else {
        return Number(char)
      }
  } );
  return next();
}

module.exports = { convertStrNums, convertNumsToArray };