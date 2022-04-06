import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import NewPost from '../Components/UserPosts/NewPost';

const Container = styled.div`
`;

const CreatePostPage = ({user}) => {
  return (
    <Container>
        <Navbar user={user}/>
        <NewPost user={user}/>
    </Container>
  )
}

export default CreatePostPage