import styled from 'styled-components'

import {mobile} from '../responsive.js'

const SiderBar = styled.div`
    width: 300px;
    height: 92vh;
    position: fixed;
    z-index: 1;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 20px;
    ${mobile({ display:'none' })}
`;

const UserInfoContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
`;

const UserImage = styled.img`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 0.5px solid black;
    object-fit: cover;
`;

const Username = styled.span`
    font-weight: bold;
    padding-left: 10px;
`;

const CopyRightContainer = styled.span`
  padding-left: 5px;
  color: gray;
  font-size: 15px;
`;


const SideBar = ({user}) => {
  return (
        <SiderBar>
            <UserInfoContainer >
              <UserImage src={"http://localhost:5000/api/posts/find/"+user.profileImage}/>
              <Username>{user.username}</Username>
            </UserInfoContainer>
            <CopyRightContainer>
              © 2022 ConnectGram FROM AKD-PROD
            </CopyRightContainer>
        </SiderBar>
  )
}

export default SideBar