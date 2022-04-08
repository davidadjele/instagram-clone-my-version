import styled from 'styled-components'
import {mobile} from '../../responsive.js'
import { Favorite, ModeComment} from '@material-ui/icons';
import { API_URL } from '../../requestMethods.js';

const InfoContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    color: white;
    top: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    
    width: 33.22%;
    height: 300px;
    ${mobile({width: '33.15%', height:150})}
    padding: 0.3px;
    &:hover ${InfoContainer}{
        opacity: 2;
    }
`;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const UserPostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;



const Icon = styled.div`
    margin-right: 10px;
`;

const UserPost = ({post}) => {
  return (
    <Container>
        <Wrapper>
            <UserPostImage src={API_URL+'posts/find/'+post.img} />
            <InfoContainer>
                <Icon>
                    <Favorite/>
                </Icon>
                <Icon>
                    <ModeComment/>
                </Icon>
            </InfoContainer>
        </Wrapper>
        
    </Container>
  )
}

export default UserPost
