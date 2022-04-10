import styled from 'styled-components'
import {mobile} from '../responsive.js'
import { useSelector } from 'react-redux';
import { CloseOutlined, MoreHorizOutlined} from '@material-ui/icons';

import Post from './Posts/Post'

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

  ${mobile({ width: '95%'})}
`;

const CloseIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

const PostContainer = styled.div`

`;


const Modal = ({closeModal,post}) => {
  return (
    <Container>
        <CloseIconContainer>
            <CloseOutlined onClick={()=> closeModal(false)} style={{cursor:'pointer'}}/>
            <MoreHorizOutlined style={{cursor:'pointer'}} />
        </CloseIconContainer>
        <Post post={post} height={true} />
    </Container>
  )
}

export default Modal