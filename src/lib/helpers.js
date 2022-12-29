function log(...args) {
  console.log(`[${datetime()}]  >> `, ...args);
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
    .map((val) => zerofill(val, 2))
    .join('-');

  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((val) => zerofill(val, 2))
    .join(':');

  const milliseconds = zerofill(now.getMilliseconds(), 3);

  return `${date} ${time}.${milliseconds}`;
}

module.exports.datetime = datetime;
module.exports.log = log;
