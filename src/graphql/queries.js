import gql from 'graphql-tag';

export const EXAMPLE = gql`
  query Search($term: String!,$location:String!) {
  search(term: $term, location: $location) {
    total
    business {
      name
      rating
      review_count
      location {
        address1
      }
    }
  }
}
`;