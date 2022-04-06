import { GridOnOutlined,SettingsOutlined,BookOutlined } from '@material-ui/icons';
import { useState } from 'react';

import "./ProfilePage.css"

import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import UserSavedPosts from '../Components/UserSavedPosts';
import UserPosts from '../Components/UserPosts/UserPosts';

import {mobile} from '../responsive.js'

import {
    Link
} from "react-router-dom";
import { API_URL } from '../requestMethods';

const Container = styled.div`

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
    background: none;
    border: .5px solid black;
    border-radius: 5px;
    cursor: pointer;
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
    color: ${(props) => props.active ? 'black': 'gray'};
    border-top: ${(props) => props.active ? '.7px solid black': 'none'};
`;

const UserMiddleFavoriteButton = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${(props) => props.active ? 'black': 'gray'};
    border-top: ${(props) => props.active ? '.7px solid black': 'none'};
`;


const Favorite = styled.p`
`;

const Post = styled.p`
`;

const UserPostContainer = styled.div`
   
`;

const ModalContent = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: .5px solid gray;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const ProfilePage = (userData) => {

    const [activePostButton,setActivePostButton] = useState(true);
    const [activeFavtButton,setActiveFavButton] = useState(false);

    const handlePostButtonClick = () =>{

        if(activePostButton){
            setActiveFavButton(false);
        }else{
            setActivePostButton(true);
            setActiveFavButton(false);
        }
        
    }

    const handleFavButtonClick = () =>{
        if(activeFavtButton){
            setActivePostButton(false);
        }else{
            setActivePostButton(false);
            setActiveFavButton(true);
        }
    }
  return (
    <Container>
        <Navbar user={userData.user}/>
        <UserInfoContainer>
            <UserInfoContainerLeft>
                <ImageContainer src={API_URL+'posts/find/'+userData.user.profileImage} alt={userData.user.username}/>
            </UserInfoContainerLeft>
            
            <UserInfoContainerRight>

                <UserInfoContainerRightTop>
                    <MenuItem>
                        <Username>{userData.user.username}</Username>
                    </MenuItem>
                    <Link to="/settings" style={{textDecoration:'none',color:'black'}} >
                        <MenuItem>
                            <EditButton>Edit Profile</EditButton>
                        </MenuItem>
                    </Link>
                    <Link to="/settings" style={{color:'black'}} >
                        <MenuItem>
                            <SettingsOutlined user={userData.user} style={{cursor:'pointer'}}/>
                        </MenuItem>
                    </Link>
                </UserInfoContainerRightTop>

                <UserInfoContainerRightMiddle>
                    <NumberOfPost>{/* {user.posts.length} */} posts</NumberOfPost>
                    <NumberOfFollower>{userData.user.numberOfFollowers.length} followers</NumberOfFollower>
                    <NumberOfFollowing>{userData.user.numberOfFollowing.length} following</NumberOfFollowing>
                </UserInfoContainerRightMiddle>

                <UserInfoContainerRightBottom>
                    <Surname>{userData.user.name} 🇹🇬</Surname>
                    <Description>{userData.user.bio}</Description>
                    <Location>📍{userData.user.location}</Location>
                </UserInfoContainerRightBottom>

            </UserInfoContainerRight>
        </UserInfoContainer>
        
        <UserMiddleButton>
            <UserMiddlePostButton active={activePostButton} onClick={handlePostButtonClick} >
                <GridOnOutlined style={{marginRight:6}} />
                <Post>Posts</Post>
            </UserMiddlePostButton>

            <UserMiddleFavoriteButton active={activeFavtButton} onClick={handleFavButtonClick}>
                <BookOutlined style={{marginRight:6}} />
                <Favorite>Saved</Favorite>
            </UserMiddleFavoriteButton>
        </UserMiddleButton>
        { activePostButton? <UserPosts posts={userData.posts} /> : <UserSavedPosts/>}
        
    </Container>
  )
}

export default ProfilePage