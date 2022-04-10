import styled, {keyframes} from 'styled-components'
import {mobile} from '../responsive.js'
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined, MoreHorizOutlined} from '@material-ui/icons';
import {
    useNavigate
} from "react-router-dom";

import Post from './Posts/Post'
import { useState } from 'react';
import { setUserDataStatus } from '../redux/userRedux.js';
import { axiosInstance } from '../requestMethods.js';

const modal = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-250px) rotate(-200deg);
    }

    100% {
        opacity: 1;
        transform: translate(-50%,-50%) rotate(0deg);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: white;
    border: .5px solid #cecbcb;
    transform:translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    z-index: 3;
    animation: ${modal} 1s ease 0s 1 normal forwards;
  ${mobile({ width: '95%'})}
`;

const CloseIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 5px;
`;

const OptionContainer = styled.div`
    padding: 5px 15px 5px 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: .5px solid #cecbcb;
    border-radius: 3px;
    align-items: center;
    background-color: white;
    position: fixed;
    box-shadow: 0 0 2px;
    transform:translate(-5%,-5%);
    top: 5%;
    left: 5%;

`;

const DeleteContainer = styled.div`
    display: flex;
    cursor: pointer;
    border-bottom: .5px solid #cecbcb;
`;

const CancelContainer = styled.div`
    display: flex;
    cursor: pointer;
`;

const Modal = ({closeModal,post}) => {
     const [optionIsOn, setOptionIsOn] = useState(false)
     const token =  useSelector((state) => state.user.currentUserToken);
     const dispatch = useDispatch()
     const navigate = useNavigate();

     const handleDeleteImage = async () =>{

        try {
            await axiosInstance.get(`posts/delete/${post._id}`,
                {
                    headers:  { 
                    token: `Bearer ${token}`,
                    }
                });
              dispatch(setUserDataStatus(true))
              navigate('/profil')
        } catch (error) {
            console.log(error);
        }
     }

  return (
    <Container>
        <CloseIconContainer>
            <MoreHorizOutlined onClick={()=>setOptionIsOn(true)} style={{cursor:'pointer'}} />
            {optionIsOn && 
                <OptionContainer>
                    <DeleteContainer onClick={()=>{
                            setOptionIsOn(false)
                            handleDeleteImage()
                        }}
                    > delete </DeleteContainer>
                    <CancelContainer onClick={()=>{
                            setOptionIsOn(false)
                        }}
                    >Cancel</CancelContainer>
                </OptionContainer>}
            <CloseOutlined onClick={()=> closeModal(false)} style={{cursor:'pointer'}}/>
        </CloseIconContainer>
        <Post post={post} height={true} />
    </Container>
  )
}

export default Modal