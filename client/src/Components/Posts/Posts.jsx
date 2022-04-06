import styled from 'styled-components'
import Post from './Post.jsx';

const Container = styled.div`
`;

const Posts = (userData) => {
  return (
    <Container>
        {
        userData.post.images?.map(image =>(
          <Post user={userData.user} post={image} key={image._id}/>
        ))
        }
    </Container>
  )
}

export default Posts