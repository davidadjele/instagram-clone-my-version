import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import Messages from '../Components/UserMessages/Messages';

const Container = styled.div`
`;


const MessagePage = ({user}) => {
  return (
    <Container>
        <Navbar user={user}/>
        <Messages user={user}/>
    </Container>
  )
}

export default MessagePage