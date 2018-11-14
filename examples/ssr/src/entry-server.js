import { createApp } from './main';

export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, router } = await createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      resolve(app);
    }, reject);
  });
};
