var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.render('wrapped', { title: 'Mastercard Library Promise-based Wrapper' })
})

module.exports = router
