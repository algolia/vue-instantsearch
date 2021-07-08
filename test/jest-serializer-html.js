// eslint-disable-next-line import/no-commonjs
const toDiffableHtml = require('diffable-html');

function sortAttributes(names) {
  return names.sort(); // sort desc to keep compatibility with vue 2
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  test(object) {
    return typeof object === 'string' && object.trim()[0] === '<';
  },
  print(val) {
    return toDiffableHtml(val, { sortAttributes });
  },
};
