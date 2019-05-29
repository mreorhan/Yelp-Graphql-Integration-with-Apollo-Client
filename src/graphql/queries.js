import gql from 'graphql-tag';

export const EXAMPLE = gql`
  query Search($term: String!,$location:String!) {
  search(term: $term, location: $location) {
    total
    business {
      id
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

export const GET_REVIEWS = gql`
query Reviews($business:String!){
  reviews(business: $business) {
    review {
      text
    }
    total
  }
}
`;