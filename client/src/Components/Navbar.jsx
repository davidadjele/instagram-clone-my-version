import styled, { keyframes } from 'styled-components'
import { 
    useNavigate
} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

import {mobile} from '../responsive.js'

import {HomeOutlined, Home, SearchOutlined,InboxOutlined, Inbox, AddBoxOutlined,AddBox} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { 
    setActiveHome,
    setActiveAdd,
    setActiveMessage,
    setActiveProfile
} from '../redux/NavBarRedux.js';

import { 
   setOtherUser, setOtherUserPosts
} from '../redux/otherUserRedux.js';

import { useState } from 'react';
import { API_URL, axiosInstance, FREE_AVATAR } from '../requestMethods.js';

const Container = styled.div`
    height: 8vh;
    background-color: #fff;
    border-bottom: 0.5px solid #d6d4d4;
    position: sticky;
    z-index: 3;
    top: 0;
    left: 0;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px;
`;

const Logo = styled.h3`
    ${mobile({ fontSize: 20})}
`;
const Left = styled.div`
    flex:1;
`;
const Center = styled.div`
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ display:'none' })}
`;

const SearchResultContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${mobile({ display:'none' })}
    width: 300px;
    height: auto;
    position: fixed;
    border: .5px solid #d6d4d4;
    background-color: white;
    transform:translate(-50%,-8%);
    top:8%;
    left:50%;
    border-radius: 3px
`;
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const Input = styled.input`
    border: none;
    color:  gray;
    border-bottom: 0.5px solid #cecbcb;
    transition: all 1s ease-in-out;
    &:focus{
        border-bottom: 0.7px solid #000;
    }
`;

const Image = styled.img`
    height: 35px;
    width: 35px;
    object-fit: cover;
    border-radius: 50%;
    border: 0.5px solid gray;
    cursor: pointer;
    &:hover{
        border: 0.5px solid black;
    }
`;


const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid black;
    border-left: none !important;
    border-right: none !important;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    animation: ${rotate} 2s infinite;
`;

const Result = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    margin: 4px;
    cursor: pointer;
    border-bottom: 0.5px solid #cecbcb;
`;


const Navbar = ({user}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token =  useSelector((state) => state.user.currentUserToken);
    const activeHomeButton = useSelector(state => state.active.activeHome);
    const activeMessageButton = useSelector(state => state.active.activeMessage);
    const activeAddButton = useSelector(state => state.active.activeAdd);
    const [search,setSearch] = useState(null);
    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(
                `users/search/${search}`,
                {
                headers:  { 
                    token: `Bearer ${token}`,
                }
            });
            
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setUsers([]);
            console.log(error);
        }
    } 

    const handleActiveHome = () => {
        dispatch( setActiveHome());
        navigate('/');
    }

    const handleActiveMessage = () => {
        dispatch(setActiveMessage());
        navigate('/message');
    }

    const handleActiveAddPost = () =>{
        dispatch( setActiveAdd());
        navigate('/newpost');
    }

    const handleActiveProfile = () =>{
        dispatch( setActiveProfile());
        navigate('/profil');
    }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>ConnectPlace</Logo>
            </Left>
            <Center>
                <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                <SearchOutlined 
                    style={{color:'gray',fontSize:20,cursor:'pointer'}} 
                    onClick={fetchUsers}
                />
            </Center>
            {users &&
                <SearchResultContainer>
                    {loading?
                        <Loading/>
                        : users.map((item) => 
                            (<Result key={item.id} onClick={async ()=>{
                                try {
                                    dispatch( setOtherUser(item) );
                                    navigate('/visitprofil');
                                    const res = await axiosInstance.get(
                                        `posts/findallimages/${item._id}`,
                                        {
                                        headers:  { 
                                            token: `Bearer ${token}`,
                                        }
                                        });
                                    dispatch( setOtherUserPosts(res.data) );
                                    window.location.reload();
                                } catch (error) {
                                    console.log(error);
                                }
                                    
                                }}
                            >
                            {item.username}
                            </Result>
                            )
                        ) 
                         
                    }
                </SearchResultContainer>
            }

            <Right>
                <MenuItem onClick={handleActiveHome} >
                    {activeHomeButton && <Home  style={{cursor:'pointer',fontSize:'40px'}} />}
                    {!activeHomeButton && <HomeOutlined  style={{cursor:'pointer',fontSize:'40px'}} />}
                </MenuItem>
                
                <MenuItem onClick={handleActiveMessage}>
                    <Badge  badgeContent={4} color="primary"  >
                        {activeMessageButton && <Inbox style={{cursor:'pointer',fontSize:'40px'}}/>}
                        {!activeMessageButton && <InboxOutlined style={{cursor:'pointer',fontSize:'40px'}}/>}
                    </Badge>
                </MenuItem>
                <MenuItem onClick={handleActiveAddPost} >
                    {activeAddButton && <AddBox style={{cursor:'pointer',fontSize:'40px'}}/>}
                    {!activeAddButton && <AddBoxOutlined style={{cursor:'pointer',fontSize:'40px'}}/>}
                </MenuItem>
                <MenuItem onClick={handleActiveProfile} >
                    <Image src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} />
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar