import styled from 'styled-components'
import {mobile} from '../../responsive.js'
import { SendOutlined} from '@material-ui/icons';
import Message from './Message.jsx';

const Container = styled.div`
  display: flex;
  margin: 40px;
  border: 0.5px solid #d6d4d4;
  border-radius: 2px;
  ${mobile({ margin: '20px' })}
`;

const ContainerLeft = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  border-right: 0.5px solid #d6d4d4;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex:2;
  border-right: 0.5px solid #d6d4d4;
  ${mobile({ display: 'none' })}
`;
const TopLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-weight: bold;
  border-bottom: 0.5px solid #d6d4d4;
`;
const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MessagesTopContainer = styled.div`
  padding: 10px;
  font-weight: bold;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SendIconContainer = styled.div`
  height: 50px;
  width: 50px;
  border: 0.5px solid #d6d4d4;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextContainer = styled.div`
  display: flex;
`;


const Messages = ({user}) => {
  return (
    <Container>
        <ContainerLeft>
          <TopLeftContainer>
            {user.username}
          </TopLeftContainer>
          <MessagesContainer>
            <MessagesTopContainer>Messages</MessagesTopContainer>
            <MessageContainer>
              <Message user={user} />
            </MessageContainer>
          </MessagesContainer>
          
        </ContainerLeft>
        <ContainerRight>
          <SendIconContainer>
            <SendOutlined style={{transform: 'rotate(-30deg)',fontWeight: 'bold'}} />
          </SendIconContainer>
          <TextContainer>
              Your messages
          </TextContainer>
        </ContainerRight>
        
    </Container>
  )
}

export default Messages