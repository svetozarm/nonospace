const nonogram = require("nonogram");
const express = require("express");
const router = express.Router();

/*
  TODO: Fix this
*/
router.get("/", function (req, res, next) {
  res.send("default nono response");
});

/**
 * Snagged from MDN.
 *
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const randomMatrix = (width, height) => {
  const matrix = [...Array(height)].map(
    () => [...Array(width)].map(
      () => getRandomInt(0, 2)
    )
  );
  return matrix;
}


router.get("/random", function (req, res, next) {
  const response_nono = nonogram.nonogramFromMatrix(
    randomMatrix(5, 5)
  );
  res.send(response_nono);
});
module.exports = router;
