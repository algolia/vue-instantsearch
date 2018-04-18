import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import { getRefinements } from 'instantsearch.js/es/lib/utils.js';

export function clearRefinementFromState(state, refinement) {
  switch (refinement.type) {
    case 'facet':
      return state.removeFacetRefinement(
        refinement.attributeName,
        refinement.name
      );
    case 'disjunctive':
      return state.removeDisjunctiveFacetRefinement(
        refinement.attributeName,
        refinement.name
      );
    case 'hierarchical':
      return state.clearRefinements(refinement.attributeName);
    case 'exclude':
      return state.removeExcludeRefinement(
        refinement.attributeName,
        refinement.name
      );
    case 'numeric':
      return state.removeNumericRefinement(
        refinement.attributeName,
        refinement.operator,
        refinement.numericValue
      );
    case 'tag':
      return state.removeTagRefinement(refinement.name);
    case 'query':
      return state.setQueryParameter('query', '');
    default:
      throw new Error(
        `clearRefinement: type ${refinement.type} is not handled`
      );
  }
}

export function getFilteredRefinements(
  results,
  state,
  attributeNames,
  onlyListedAttributes,
  clearsQuery
) {
  let refinements = getRefinements(results, state, clearsQuery);
  const otherAttributeNames = reduce(
    refinements,
    (res, refinement) => {
      if (
        attributeNames.indexOf(refinement.attributeName) === -1 &&
        res.indexOf(refinement.attributeName === -1)
      ) {
        res.push(refinement.attributeName);
      }
      return res;
    },
    []
  );
  refinements = refinements.sort(
    compareRefinements.bind(null, attributeNames, otherAttributeNames)
  );
  if (onlyListedAttributes && !isEmpty(attributeNames)) {
    refinements = filter(
      refinements,
      refinement => attributeNames.indexOf(refinement.attributeName) !== -1
    );
  }
  return refinements.map(computeLabel);
}

function getRestrictedIndexForSort(
  attributeNames,
  otherAttributeNames,
  attributeName
) {
  const idx = attributeNames.indexOf(attributeName);
  if (idx !== -1) {
    return idx;
  }
  return attributeNames.length + otherAttributeNames.indexOf(attributeName);
}

function compareRefinements(attributeNames, otherAttributeNames, a, b) {
  const idxa = getRestrictedIndexForSort(
    attributeNames,
    otherAttributeNames,
    a.attributeName
  );
  const idxb = getRestrictedIndexForSort(
    attributeNames,
    otherAttributeNames,
    b.attributeName
  );
  if (idxa === idxb) {
    if (a.name === b.name) {
      return 0;
    }
    return a.name < b.name ? -1 : 1;
  }
  return idxa < idxb ? -1 : 1;
}

function computeLabel(value) {
  // default to `value.name` if no operators
  value.computedLabel = value.name;

  if (value.hasOwnProperty('operator') && typeof value.operator === 'string') {
    let displayedOperator = value.operator;
    if (value.operator === '>=') displayedOperator = '≥';
    if (value.operator === '<=') displayedOperator = '≤';
    value.computedLabel = `${displayedOperator} ${value.name}`;
  }

  return value;
}
