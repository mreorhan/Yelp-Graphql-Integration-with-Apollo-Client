import gql from 'graphql-tag';

export const EXAMPLE = gql`
{
  search(term: "burrito", location: "san francisco") {
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