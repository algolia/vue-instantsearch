// TODO: increment this when versioning
const version = 'v2.0.0-alpha.2';

export const addAlgoliaAgent = client =>
  client.addAlgoliaAgent &&
  client.addAlgoliaAgent(`Vue InstantSearch (${version})`);
