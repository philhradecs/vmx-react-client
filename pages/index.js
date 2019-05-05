import { Box, Grommet } from 'grommet';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { createGlobalStyle } from 'styled-components';

import TopBar from '../components/TopBar/TopBar';

const GlobalStyle = createGlobalStyle`
  * {
   box-sizing: border-box
  }
  body {
    margin: 0
  }
`;

const theme = {
  global: {
    margin: 0,
    font: {
      family: 'Roboto'
    }
  }
};

function Home() {
  return (
    <Grommet theme={theme}>
      <TopBar />
      <GlobalStyle />
    </Grommet>
  );
}

export default Home;

// const GET_ARTIST_DETAILS = gql`
//   query GetArtistDetails($artistID: ID!) {
//     artistDetails(artistID: $artistID) {
//       url
//       profile
//     }
//   }
// `;

// export default ({ artistID = 3455 }) => (
//   <Query query={GET_ARTIST_DETAILS} variables={{ artistID }}>
//     {({ data, loading, error, fetchMore }) => {
//       if (loading) return <div>loading...</div>;
//       if (error) return <p>{error.message}</p>;

//       return (
//         <>
//           <Box
//             direction="row"
//             justify="center"
//             background="#fafafa"
//             elevation="medium"
//           >
//             {JSON.stringify(data)}
//           </Box>
//         </>
//       );
//     }}
//   </Query>
// );
