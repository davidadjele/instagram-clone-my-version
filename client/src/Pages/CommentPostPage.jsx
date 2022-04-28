import styled from 'styled-components'
import { useEffect, useState } from 'react';

import {mobile} from '../responsive.js'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar.jsx';
import { useLocation } from 'react-router-dom';
import { SendOutlined } from '@material-ui/icons';
import { API_URL, axiosInstance, FREE_AVATAR, getOtherUserInfos, getOtherUserPosts } from '../requestMethods.js';
import { setOtherUserDataStatus } from '../redux/otherUserRedux.js';
import { setUserDataStatus } from '../redux/userRedux.js';


const Container = styled.div`
    
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: .5px solid #b6b4b4;
    border-radius:2px;
    margin: 0 20% 0 20%;
    ${mobile({ margin:0,border:'none'})}
`;


const AddCommentContainer = styled.div` 
    display: flex;
    width: 100%;
    border-bottom: .5px solid #cecbcb;
`;
const CommentContainer = styled.div` 
    display: flex;
    flex:2;
    padding: 5px;
`;
const Input = styled.input` 
    width: 100%;
    padding: 5px 10px;
    border: none;
`;
const PostCommentContainer  = styled.div` 
    display: flex;
    flex:1;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;
    
`;

const PostDescriptionContainer = styled.div` 
    display: flex;
    align-items: center;
    border-bottom: .5px solid #ccc8c8;
    width: 100%;
`;

const PostOwnerImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    ${mobile({ height: 40, width: 40})}
`;
const ImageContainer = styled.div` 
    padding: 10px;
    display: flex;
    align-items: center;
`;

const PostUserContainer = styled.div` 
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const PostOwnerUsername = styled.span`
    font-weight: bold;
    cursor: pointer;
    ${mobile({ fontSize: 17})}
`;

const PostDescription = styled.div` 
    height: auto;
    ${mobile({ fontSize: 17})}
`;

const AllCommentsContainer = styled.div` 
    ${mobile({ fontSize: 17})}
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`;

const CommentsContainer = styled.div` 
    display: flex;
    align-items: center;
    padding: 5px;
    ${mobile({ fontSize: 17})}
    
`;

const CommentsOwnerImage = styled.div` 
    display: flex;
    align-items: center;
    padding: 5px;
`;

const CommentsOwnerName = styled.div` 
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 10px;
`;

const Comment = styled.div` 
    display: flex;
    align-items: center;
    padding: 5px;
`;

const CommentOwnerImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    ${mobile({ height: 40, width: 40})}
`;


const CommentPostPage = ({}) => {
    const dispatch = useDispatch()
    const token =  useSelector((state) => state.user.currentUserToken);
    const currenUser =  useSelector((state) => state.user.currentUser);
    const otherUser =  useSelector((state) => state.otherUser.otherUser);
    const postState = useLocation();
    const [comment,setComment] = useState('');
    const otherUserPost =  useSelector((state) => state.otherUser.otherUserPosts);
    const OtherUserDataChanged =  useSelector((state) => state.otherUser.OtherUserDataChanged);
    const [post,setPost] = useState(otherUserPost.images.find(x => x._id === postState.state._id));
    useEffect(()=>{
            setPost(otherUserPost.images.find(x => x._id === postState.state._id));
            dispatch( setOtherUserDataStatus(false))
    },[OtherUserDataChanged])

    const handlePostComment = async () => {
        await axiosInstance.put(`posts/addcomment/${post._id}`,
            {
                "comments": [
                    {
                        "commentOwnerId": currenUser._id,
                        "commentOwnerUsername": currenUser.username,
                        "commentOwnerUserProfileImage": currenUser.profileImage,
                        "comment": comment
                    }
                ]
            }
        ,
            {
                headers:  { 
                    token: `Bearer ${token}`,
                }
            }
        )
        getOtherUserInfos(dispatch,otherUser,token)
        setComment('');
    }
    return (
        <Container>
            <Navbar user={currenUser}/>
            <Wrapper>
                <AddCommentContainer>
                    <CommentContainer>
                        <Input type="text" placeholder="Add comment..." value={comment} onChange={(e)=>setComment(e.target.value)} />
                    </CommentContainer>
                    <PostCommentContainer>
                        <SendOutlined onClick={handlePostComment} style={{cursor:'pointer'}}/>
                    </PostCommentContainer>
                </AddCommentContainer>
                <PostDescriptionContainer>
                    <ImageContainer>
                        <PostOwnerImage /* onClick={handleClickUser} */ src={otherUser.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+otherUser.profileImage} />
                    </ImageContainer>
                    <PostUserContainer>
                        <PostOwnerUsername>{otherUser.username}</PostOwnerUsername>
                    </PostUserContainer>
                    
                    <PostDescription> {post?.desc}</PostDescription>
                </PostDescriptionContainer>
                <AllCommentsContainer>
                {post?.comments.map ( (c) => (
                        <CommentsContainer key={c._id}>
                            <CommentsOwnerImage>
                                <CommentOwnerImage src={c.commentOwnerUserProfileImage === ''? FREE_AVATAR : API_URL+"users/find/"+c.commentOwnerUserProfileImage}/>
                            </CommentsOwnerImage>
                            <CommentsOwnerName>
                                {c.commentOwnerUsername}
                            </CommentsOwnerName>
                            <Comment>
                                {c.comment}
                            </Comment>
                        </CommentsContainer>
                    ) )
                    }
                    
                </AllCommentsContainer>
            </Wrapper>
            
        </Container>
    )
}

export default CommentPostPage