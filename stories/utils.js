export const previewWrapper = ({
  indexName = 'instant_search',
  hits = '',
} = {}) => () => ({
  template: `
    <ais-index
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="${indexName}"
    >
      <h2>Display</h2>
      <story />

      <h2>Hits</h2>
      <ais-search-box />
      <ais-hits>
        ${hits}
      </ais-hits>
    </ais-index>
  `,
});
