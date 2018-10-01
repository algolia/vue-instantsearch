import { version } from '../../package.json';

export const addAlgoliaAgent = client =>
  client.addAlgoliaAgent &&
  client.addAlgoliaAgent(`Vue InstantSearch (${version})`);
