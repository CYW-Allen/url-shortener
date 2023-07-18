const router = require('express').Router();
const tools = require('../utils/tools');

const reDirTab = {};
const PORT = process.env.PORT || 3000;

router.get('/', (_req, res) => {
  res.render('index', { errMsg: '""' });
});

router.post('/url', (req, res) => {
  let randKey;

  if (!tools.examUrl(req.body.url)) {
    res.render('index', { errMsg: '"錯誤的網址，請重新輸入"' });
    return;
  }
  if (reDirTab[req.body.url] === undefined) {
    randKey = tools.geneRandStr();
    reDirTab[randKey] = req.body.url;
    reDirTab[req.body.url] = randKey;
  } else {
    // Inputting same url will get same result
    randKey = reDirTab[req.body.url];
  }
  res.render('result', { shortenUrl: `${req.protocol}://${req.hostname}:${PORT}/${randKey}` });
});

router.get('/:randKey', (req, res) => {
  res.redirect(reDirTab[req.params.randKey]);
});

module.exports = router;
