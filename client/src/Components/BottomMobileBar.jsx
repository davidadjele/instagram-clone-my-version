import styled,{ keyframes } from 'styled-components'
import { 
    useNavigate
} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

import {mobile} from '../responsive.js'

import {SearchOutlined} from '@material-ui/icons';

import { 
   setOtherUser, setOtherUserPosts
} from '../redux/otherUserRedux.js';

import { useState } from 'react';
import { axiosInstance } from '../requestMethods.js';

const Container = styled.div`
    height: 8vh;
    display: none;
    background-color: #fff;
    border-top: 0.5px solid #d6d4d4;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 3;
    width: 100vw;
    transform:translate(-50%,0%);
    bottom:0;
    left: 50%;
    ${mobile({ display:'flex' })}
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px;
`;

const Center = styled.div`
    flex:1;
    display: none;
    justify-content: center;
    align-items: center;
    ${mobile({ display:'flex' })}
`;

const SearchResultContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: auto;
    position: fixed;
    border: .5px solid #c2b8b8;
    background-color: white;
    transform:translate(-50%,-30%);
    bottom:30%;
    left: 50%;
    border-radius: 3px
    
    
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
    border-bottom: 0.5px solid #ddd3d3;
`;


const BottomMobileBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token =  useSelector((state) => state.user.currentUserToken);
    const [search,setSearch] = useState(null);
    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            if(search === '') {
                setUsers(null);
                return;
            }
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


  return (
    <Container>
        <Wrapper>
            <Center>
                <Input placeholder="Search" onChange={(e) => {setSearch(e.target.value.toLowerCase())}} />
                <SearchOutlined 
                    style={{color:'black',fontSize:20,cursor:'pointer'}} 
                    onClick={fetchUsers}
                />
            </Center>
            {users &&
                <SearchResultContainer>
                    {loading?
                        <Loading/>
                        : users?.map((item) => 
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
                                    
                                }}><span>{item.username}</span></Result>
                            )
                        ) 
                         
                    }
                </SearchResultContainer>
            }
        </Wrapper>
    </Container>
  )
}

export default BottomMobileBar