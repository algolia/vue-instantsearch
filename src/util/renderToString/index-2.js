import _renderToString from 'vue-server-renderer/basic';

export function renderToString(app) {
  return new Promise((resolve, reject) =>
    _renderToString(app, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}
