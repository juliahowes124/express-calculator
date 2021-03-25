/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode} = require('./stats');
const app = express();
const {convertStrNums, convertNumsToArray} = require('./utils')

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


app.use('/', convertNumsToArray);

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', (req, res) => {
  let result = findMean(req.numsArray);
  return res.json({operation: "mean", result})
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median', (req, res) => {
  let result = findMedian(req.numsArray);
  return res.json({operation: "median", result})
})

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get('/mode', (req, res) => {
  let result = findMode(req.numsArray);
  return res.json({operation: "mode", result})
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;