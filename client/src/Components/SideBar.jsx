import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { API_URL, axiosInstance, FREE_AVATAR, getNewUsers } from '../requestMethods.js';
import { useSelector } from 'react-redux';

import {mobile} from '../responsive.js'
import SuggestionsUsers from './SuggestionsUsers.jsx';

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
  const token =  useSelector((state) => state.user.currentUserToken);
  const OtherUserDataChanged =  useSelector((state) => state.otherUser.OtherUserDataChanged);
  const [suggestionUser,setSuggestionUser] = useState(null);
  
  useEffect(()=>{
    getNewUsers(setSuggestionUser,user,token);
  },[OtherUserDataChanged])
  return (
        <SiderBar>
            <UserInfoContainer >
              <UserImage src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage}/>
              <Username>{user.username}</Username>
            </UserInfoContainer>
            <CopyRightContainer>
              © 2022 ConnectGram FROM AKD-PROD
            </CopyRightContainer>
            {suggestionUser?.map(e => <SuggestionsUsers key={e._id} user={e}/>)}
        </SiderBar>
  )
}

export default SideBar