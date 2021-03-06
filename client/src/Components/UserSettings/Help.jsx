import styled from 'styled-components'
import {
  useNavigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  logout
} from "../../redux/userRedux.js";

import { logoutOtherUser} from '../../redux/otherUserRedux.js'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Help = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(logoutOtherUser(null));
    navigate('/login')
  };
  return (
    <Container>
      <TitleContainer>
        <Title>Help loading...</Title>
        
      </TitleContainer>
      <Link onClick={handleLogout} >LOGOUT</Link>
    </Container>
  )
}

export default Help