function log(...args) {
  console.log(`[${datetime()}] >>>`, ...args);
}

function zerofill(value, length = 2) {
  value = value.toString();
  while (value.length < length) {
    value = `0${value}`;
  }

  return value;
}

function datetime() {
  const now = new Date();
  const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .map(zerofill)
    .join('-');

  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(zerofill)
    .join('-');

  const millis = now.getMilliseconds();

  return `${date} ${time}.${millis}`;
}

module.exports.datetime = datetime;
module.exports.log = log;
