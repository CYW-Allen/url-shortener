const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;
const reDirTab = {};
// ascii code: 0~9: 48 ~ 57, A ~ Z: 65 ~ 90, a ~ z: 97 ~ 122
const charStIndex = [48, 65, 97];

app.use(express.static('public'));
app.use(upload.array())

app.get('/', (req, res) => {
  res.send(`Current server hostname is: ${req.hostname}`);
});

app.post('/', (req, res) => {
  let randKey;

  if (reDirTab[req.body.url] === undefined) {
    randKey = geneRandStr();
    reDirTab[randKey] = req.body.url;
    reDirTab[req.body.url] = randKey;
  } else {
    randKey = reDirTab[req.body.url];
  }
  res.send(`short url: ${req.protocol}://${req.hostname}:${PORT}/${randKey}`);
});

app.get('/:randKey', (req, res) => {
  res.redirect(reDirTab[req.params.randKey]);
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

function getRandInt(rng) {
  return Math.floor(Math.random() * rng);
}

function geneRandStr() {
  return Array(5).fill('').map(() => {
    const typeIndex = getRandInt(3);
    return String.fromCharCode(charStIndex[typeIndex] + getRandInt(typeIndex ? 26 : 10));
  }).join('');
}