const router = require('express').Router();
const tools = require('../utils/tools');

const key2Url = {};
const url2Key = {};
const PORT = process.env.PORT || 3000;

router.get('/', (_req, res) => {
  res.render('index');
});

router.post('/url', (req, res, next) => {
  let randKey;

  try {
    if (!tools.examUrl(req.body.url)) {
      tools.throwErr('invalidInput', 400, 'Please input one valid url.')
    }
    if (url2Key[req.body.url] === undefined) {
      randKey = tools.geneRandKey(key2Url);
      key2Url[randKey] = req.body.url;
      url2Key[req.body.url] = randKey;
    } else {
      // Same url will get the same result.
      randKey = url2Key[req.body.url];
    }
    res.render('result', { shortenUrl: `${req.protocol}://${req.hostname}:${PORT}/${randKey}` });
  } catch (e) {
    next(e);
  }
});

router.get('/:randKey', (req, res, next) => {
  const randKey = req.params.randKey;

  try {
    if (key2Url[randKey] === undefined) {
      tools.throwErr('invalidKey', 404, 'Please shorten the url again.');
    }
    res.redirect(key2Url[randKey]);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
