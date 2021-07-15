// eslint-disable-next-line import/no-commonjs
const createSerializer = require('jest-serializer-html/createSerializer');

// eslint-disable-next-line import/no-commonjs
module.exports = createSerializer({
  print: {
    sortAttributes: names => names.sort(),
  },
});
