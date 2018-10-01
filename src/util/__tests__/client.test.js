import { addAlgoliaAgent } from '../client';

it('will call if you have addAlgoliaAgent', () => {
  const client = { addAlgoliaAgent: jest.fn() };
  addAlgoliaAgent(client);
  expect(client.addAlgoliaAgent).toHaveBeenCalledTimes(1);
  expect(client.addAlgoliaAgent.mock.calls[0][0]).toMatch(
    /Vue InstantSearch \([a-z0-9.-]+\)/
  );
});

it('will not call if not present (so nothing to assert)', () => {
  const client = {};
  addAlgoliaAgent(client);
});
