// ascii code: 0~9: 48 ~ 57, A ~ Z: 65 ~ 90, a ~ z: 97 ~ 122
const charStIndex = [48, 65, 97];

function getRandInt(rng) {
  return Math.floor(Math.random() * rng);
}

exports.geneRandKey = (key2Url) => {
  let randKey;

  do {
    randKey = Array(5).fill('').map(() => {
      const typeIndex = getRandInt(3);
      return String.fromCharCode(charStIndex[typeIndex] + getRandInt(typeIndex ? 26 : 10));
    }).join('');
  } while (key2Url[randKey] !== undefined);
  return randKey;
}

exports.examUrl = (input) => {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

exports.throwErr = (name, statusCode, msg) => {
  const err = new Error();
  err.name = name;
  err.statusCode = statusCode;
  err.message = msg;
  throw err;
}

exports.errHandler = (err, _req, res, _next) => {
  if (err.name === 'invalidInput' || err.name === 'invalidKey') {
    res.status(err.statusCode).render('error', { msg: err.message });
  } else {
    res.status(500).render('error', { msg: 'Internal server error!' });
    console.error(err);
  }
}