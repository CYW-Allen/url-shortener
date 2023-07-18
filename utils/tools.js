// ascii code: 0~9: 48 ~ 57, A ~ Z: 65 ~ 90, a ~ z: 97 ~ 122
const charStIndex = [48, 65, 97];

function getRandInt(rng) {
  return Math.floor(Math.random() * rng);
}

exports.geneRandStr = () => {
  return Array(5).fill('').map(() => {
    const typeIndex = getRandInt(3);
    return String.fromCharCode(charStIndex[typeIndex] + getRandInt(typeIndex ? 26 : 10));
  }).join('');
}

exports.examUrl = (input) => {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}