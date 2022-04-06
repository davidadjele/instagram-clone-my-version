import { GridOnOutlined,SettingsOutlined,BookOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';

import "./ProfilePage.css"

import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import BottomMobileBar from '../Components/BottomMobileBar';

import {mobile} from '../responsive.js'
import { useDispatch, useSelector } from "react-redux";

import {
    setOtherUser
 } from '../redux/otherUserRedux.js';

import OtherUserPosts from '../Components/OtherUserPosts /OtherUserPosts';
import { API_URL, axiosInstance } from '../requestMethods';

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
    margin-right: 20px;
`;

const ImageContainer = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserInfoContainerRight = styled.div`
`;

const UserInfoContainerRightTop = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.p`
    margin-left: 10px;
    margin-right: 25px;
    ${mobile({ fontSize: 20})}
`;

const EditButton = styled.button`
    margin-right: 25px;
    border: .5px solid black;
    border-radius: 5px;
    cursor: pointer;
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

const NumberOfPost = styled.p`
    margin-right: 20px;
`;
const NumberOfFollower= styled.p`
    margin-right: 20px;
`;
const NumberOfFollowing = styled.p`
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

const OtherProfilePage = (userData) => {
    const [isFollow,setIsFollow] = useState(false);
    const dispatch = useDispatch();
    const user =  useSelector((state) => state.otherUser.otherUser);
    const userPost =  useSelector((state) => state.otherUser.otherUserPosts);
    const curentUser = useSelector((state) => state.user.currentUser);
    const token =  useSelector((state) => state.user.currentUserToken); 
    const [posts,setPosts] = useState();

    //* FOR UPDATE USER AFTER FOLLOWING
    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get(
                `users/finduserbyusername/${user.username}`,
                {
                headers:  { 
                    token: `Bearer ${token}`,
                }
            });
            dispatch( setOtherUser(res.data) );
            
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        const interval = setInterval(() => {
         const checkIfAlreadyFollowOtherUser = ()=>{
             if(curentUser.numberOfFollowing.some(item => item=== user._id)) {
                 setIsFollow(true);
             }else {
                setIsFollow(false);
             }
         }
         checkIfAlreadyFollowOtherUser()
         fetchUsers()
        }, 1000);
        return () => clearInterval(interval);
      });


    const handleFollow = async () =>{
        if(isFollow){
            
            try {
                //retirer de following de user courant
                await axiosInstance.delete(
                `users/removefollowing/${curentUser._id}`
                ,
                {
                    headers:  { 
                      token: `Bearer ${token}`,
                    },
                    data:{
                        "userToRemove":user._id
                    }
                })
                 //retirer de followers de other user
                await axiosInstance.delete(
                    `users/removefollowers/${user._id}`
                    ,
                    {
                        headers:  { 
                          token: `Bearer ${token}`,
                        },
                        data:{
                            "userToRemove":curentUser._id
                        }
                    })
                    window.location.reload();
              } catch (error) {
                console.log(error);
              }
           
        }else{
            
            try {
                //ajouter dans following de user courant
                await axiosInstance.put(
                `users/addfollowing/${curentUser._id}`,
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
                })
                 //ajouter dans followers de other user
                await axiosInstance.put(
                    `users/addfollowers/${user._id}`,
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
                    })
                    window.location.reload();
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
                <ImageContainer src={API_URL+'posts/find/'+user.profileImage} alt={user.username}/>
            </UserInfoContainerLeft>
            
            <UserInfoContainerRight>

                <UserInfoContainerRightTop>
                    <MenuItem>
                        <Username>{user.username}</Username>
                    </MenuItem>
                    <MenuItem>
                        <EditButton isfollow ={isFollow} onClick={handleFollow} >{isFollow ? "Abonné(e)": "s'abonner"}</EditButton>
                    </MenuItem>
                </UserInfoContainerRightTop>

                <UserInfoContainerRightMiddle>
                    <NumberOfPost>{userPost.images.length} posts</NumberOfPost>
                    <NumberOfFollower>{user.numberOfFollowers.length} followers</NumberOfFollower>
                    <NumberOfFollowing>{user.numberOfFollowing.length} following</NumberOfFollowing>
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
        <OtherUserPosts posts={userPost}/>
        <BottomMobileBar/>
    </Container>
  )
}

export default OtherProfilePage