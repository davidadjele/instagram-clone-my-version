import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { setOtherUser, setOtherUserDataStatus, setOtherUserPosts } from '../redux/otherUserRedux.js';
import { setUserDataStatus } from '../redux/userRedux.js';
import { API_URL, axiosInstance, FREE_AVATAR, getOtherUserInfos } from '../requestMethods.js';
import {mobile} from '../responsive.js'

const Container = styled.div`
    width: 100%;
    display: flex;
    border: .3px solid #c0bcbc;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
`;

const FollowButton = styled.button`
    margin-right: 25px;
    border: .5px solid black;
    border-radius: 5px;
    cursor: pointer;
    cursor: pointer;
    ${mobile({ fontSize: 20})}
    background: ${(props) => props.isfollow ? 'none': 'black'};
    color: ${(props) => props.isfollow ? 'black': 'white'};
`;

const UserInfoContainerLeft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
`;

const ImageContainer = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const UsernameContainer = styled.div`
    cursor: pointer;
    font-weight: bold;
`;

const UserInfoContainerRight = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const SuggestionsUsers = ({user}) => {
    const [isFollow,setIsFollow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const curentUser = useSelector((state) => state.user.currentUser);
    const token =  useSelector((state) => state.user.currentUserToken);

    const handleFollow = async () =>{
        
        if(isFollow){
            
            try {
                //retirer de following de user courant
                await axiosInstance.delete(`users/removefollowing/${curentUser._id}`,
                    {
                        headers:  { 
                        token: `Bearer ${token}`,
                        },
                        data:{
                            "userToRemove":user._id
                        }
                    }
                )
                 //retirer de followers de other user
                await axiosInstance.delete(`users/removefollowers/${user._id}`,
                    {
                        headers:  { 
                          token: `Bearer ${token}`,
                        },
                        data:{
                            "userToRemove":curentUser._id
                        }
                    }
                )
                dispatch(setOtherUserDataStatus(true));
                dispatch(setUserDataStatus(true));
            } catch (error) {
                console.log(error);
            }
           
        }else{
            
            try {
                //ajouter dans following de user courant
                await axiosInstance.put(`users/addfollowing/${curentUser._id}`,
                    {
                        "numberOfFollowing": [
                            user._id
                        ]
                    }
                ,
                    {
                        headers:  { 
                            token: `Bearer ${token}`,
                        }
                    }
                )
                    //ajouter dans followers de other user
                await axiosInstance.put(`users/addfollowers/${user._id}`,
                    {
                        "numberOfFollowers": [
                            curentUser._id
                        ]
                    }
                ,
                    {
                        headers:  { 
                            token: `Bearer ${token}`,
                        }
                    }
                )
                dispatch(setOtherUserDataStatus(true));
                dispatch(setUserDataStatus(true));
            } catch (error) {
            console.log(error);
            }
        }
    }

    const handleClickUser = async() => {
        navigate('/visitprofil/'+user.username);
        await getOtherUserInfos(dispatch,user,token)
    }
    
  return (
    <Container>
        <UserInfoContainerLeft onClick={handleClickUser}>
            <ImageContainer src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} alt={user.username}/>
        </UserInfoContainerLeft>
        <UserInfoContainerRight>
            <UsernameContainer onClick={handleClickUser} >
                {user.username}
            </UsernameContainer> 
            
            {<FollowButton isfollow ={isFollow} onClick={handleFollow}>{isFollow ? "Abonné(e)": "s'abonner"}</FollowButton>}
        </UserInfoContainerRight>
    </Container>
  )
}

export default SuggestionsUsers