let express = require('express');
let router = express.Router();

/* POST /api/v1/geofence. */
router.post('/', (req, res, next) => {
  let test = req.params.test;
  res.json({'status': 'not yet updated!', 'test': test});
});

module.exports = router;
