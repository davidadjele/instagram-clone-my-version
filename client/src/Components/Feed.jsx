import styled from 'styled-components'

import { mobile } from '../responsive.js'

import Posts from './Posts/Posts.jsx';

const Container = styled.div`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${mobile({ padding: '0' })}
`;


const Feed = (userData) => {
  return (
    <Container>
      <Posts user={userData.user} post={userData.posts} />
    </Container>
  )
}

export default Feed