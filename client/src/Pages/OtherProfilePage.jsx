import { GridOnOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';

import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import BottomMobileBar from '../Components/BottomMobileBar';

import {mobile} from '../responsive.js'
import { useDispatch, useSelector } from "react-redux";

import {
    setOtherUser, setOtherUserDataStatus
 } from '../redux/otherUserRedux.js';

import OtherUserPosts from '../Components/OtherUserPosts /OtherUserPosts';
import { API_URL, axiosInstance, fetchUsers, FREE_AVATAR } from '../requestMethods';
import { setUserDataStatus, updateUser } from '../redux/userRedux';

const Container = styled.div`
    position: relative;
`;

const UserInfoContainer = styled.div`
    border-bottom: .1px solid gray;
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    padding: 30px;
    justify-content: center;
    ${mobile({ flexDirection: 'column', margin:0})}
`;

const UserInfoContainerLeft = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    margin-right: 20px;
    ${mobile({ marginBottom: 20})}
`;

const ImageContainer = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserInfoContainerRight = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
`;

const UserInfoContainerRightTop = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.p`
    margin-left: 10px;
    margin-right: 25px;
    font-weight: bold;
    ${mobile({ fontSize: 20})}
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

const UserInfoContainerRightMiddle = styled.div`
    display: flex;
    margin-left: 10px;
    margin-top: 4px;
    ${mobile({ fontSize: 18})}
`;

const UserInfoContainerRightBottom = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const Surname = styled.p`
`;
const Description = styled.p`
`;
const Location = styled.p`
`;

const NumberOfPost = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
const NumberOfFollower= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
const NumberOfFollowing = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UserMiddleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    color: gray;
`;

const UserMiddlePostButton = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
    color: black;
`;

const Post = styled.p`
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Paragraph = styled.p`
    font-weight: bold;
    margin-right: 10px;
`;

const OtherProfilePage = () => {
    const [isFollow,setIsFollow] = useState(false);
    const dispatch = useDispatch();
    const user =  useSelector((state) => state.otherUser.otherUser);
    const userPost =  useSelector((state) => state.otherUser.otherUserPosts);
    const curentUser = useSelector((state) => state.user.currentUser);
    const token =  useSelector((state) => state.user.currentUserToken);
    const OtherUserDataChanged =  useSelector((state) => state.otherUser.OtherUserDataChanged);

    useEffect(() => {

        const updateInfo = async () => {
            if(curentUser.numberOfFollowing.some(item => item=== user._id)) {
                setIsFollow(true);
            }else {
                setIsFollow(false);
            }
            if(OtherUserDataChanged) {
                await fetchUsers(dispatch,user,token,setOtherUser);
                await fetchUsers(dispatch,curentUser,token, updateUser)
                await dispatch(setOtherUserDataStatus(false));
            }
        }
        updateInfo()
      });


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

  return (
    <Container>
        <Navbar user={curentUser}/>
        <UserInfoContainer>
            <UserInfoContainerLeft>
                <ImageContainer src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} alt={user.username}/>
            </UserInfoContainerLeft>
            
            <UserInfoContainerRight>

                <UserInfoContainerRightTop>
                    <MenuItem>
                        <Username>{user.username}</Username>
                    </MenuItem>
                    <MenuItem>
                        <FollowButton isfollow ={isFollow} onClick={handleFollow} >{isFollow ? "Abonné(e)": "s'abonner"}</FollowButton>
                    </MenuItem>
                </UserInfoContainerRightTop>

                <UserInfoContainerRightMiddle>
                    <NumberOfPost><Paragraph>{userPost?.images.length}</Paragraph> posts</NumberOfPost>
                    <NumberOfFollower><Paragraph>{user.numberOfFollowers.length}</Paragraph> followers</NumberOfFollower>
                    <NumberOfFollowing><Paragraph>{user.numberOfFollowing.length}</Paragraph> following</NumberOfFollowing>
                </UserInfoContainerRightMiddle>

                <UserInfoContainerRightBottom>
                    <Surname>{user.name} 🇹🇬</Surname>
                    <Description>{user.bio}</Description>
                    <Location>{user.location}</Location>
                </UserInfoContainerRightBottom>

            </UserInfoContainerRight>
        </UserInfoContainer>
        
        <UserMiddleButton>
            <UserMiddlePostButton >
                <GridOnOutlined style={{marginRight:6}} />
                <Post>Posts</Post>
            </UserMiddlePostButton>
        </UserMiddleButton>
        {userPost && <OtherUserPosts posts={userPost}/>}
        <BottomMobileBar/>
    </Container>
  )
}

export default OtherProfilePage