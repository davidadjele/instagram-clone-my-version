import { GridOnOutlined,SettingsOutlined,BookOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';

import "./ProfilePage.css"

import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import UserSavedPosts from '../Components/UserSavedPosts';
import UserPosts from '../Components/UserPosts/UserPosts';
import BottomMobileBar from '../Components/BottomMobileBar';

import {mobile} from '../responsive.js'

import {
    Link
} from "react-router-dom";
import { API_URL, fetchUsers, FREE_AVATAR, getUserPosts } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataStatus, updateUser } from '../redux/userRedux';

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

const EditButton = styled.button`
    margin-right: 25px;
    background: none;
    border: .5px solid black;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    ${mobile({ fontSize: 20})}
`;

const UserInfoContainerRightMiddle = styled.div`
    width: 100%;
    display: flex;
    margin-left: 10px;
    margin-top: 4px;
    ${mobile({ fontSize: 17})}
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
    text-align: center;
    margin-right: 20px;
`;
const NumberOfFollowing = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
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

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const Paragraph = styled.p`
    font-weight: bold;
    margin-right: 10px;
`;

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser);
    const userDataChanged = useSelector((state) => state.user.currentUserDataChanged);
    const token =  useSelector((state) => state.user.currentUserToken);
    const [posts,setPosts] = useState(null);

    const [activePostButton,setActivePostButton] = useState(true);
    const [activeFavtButton,setActiveFavButton] = useState(false);

    useEffect(() => {
        const updateInfo = async () =>{
            if(userDataChanged || posts === null) {
                await getUserPosts(dispatch,setPosts,user,token)
              
                await fetchUsers(dispatch,user,token, updateUser)
              
                dispatch(setUserDataStatus(false));
            }
        }
        updateInfo();
    });

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
        <Navbar user={user}/>
        <UserInfoContainer>
            <UserInfoContainerLeft>
                <ImageContainer src={user.profileImage === ''? FREE_AVATAR : API_URL+"posts/find/"+user.profileImage} alt={user.username}/>
            </UserInfoContainerLeft>
            
            <UserInfoContainerRight>

                <UserInfoContainerRightTop>
                    <MenuItem>
                        <Username>{user.username}</Username>
                    </MenuItem>
                    <Link to="/settings" style={{textDecoration:'none',color:'black'}} >
                        <MenuItem>
                            <EditButton>Edit Profile</EditButton>
                        </MenuItem>
                    </Link>
                    <Link to="/settings" style={{color:'black'}} >
                        <MenuItem>
                            <SettingsOutlined user={user} style={{cursor:'pointer'}}/>
                        </MenuItem>
                    </Link>
                </UserInfoContainerRightTop>

                <UserInfoContainerRightMiddle>
                    <NumberOfPost><Paragraph>{posts?.images.length}</Paragraph>posts</NumberOfPost>
                    <NumberOfFollower><Paragraph>{user.numberOfFollowers.length}</Paragraph> followers</NumberOfFollower>
                    <NumberOfFollowing><Paragraph>{user.numberOfFollowing.length}</Paragraph>  following</NumberOfFollowing>
                </UserInfoContainerRightMiddle>

                <UserInfoContainerRightBottom>
                    <Surname>{user.name} 🇹🇬</Surname>
                    <Description>{user.bio}</Description>
                    <Location>📍{user.location}</Location>
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
        { activePostButton && posts? <UserPosts posts={posts} /> : <UserSavedPosts/>}
        <BottomMobileBar/>
        
    </Container>
  )
}

export default ProfilePage