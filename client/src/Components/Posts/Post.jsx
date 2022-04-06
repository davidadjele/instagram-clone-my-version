import styled from 'styled-components'
import { useState } from 'react';

import {mobile} from '../../responsive.js'

import { 
    ModeCommentOutlined,
    FavoriteBorderOutlined,
    BookmarkBorderOutlined,
    Favorite,
    Bookmark
} from '@material-ui/icons';
import { API_URL } from '../../requestMethods.js';

const Container = styled.div`
    border: .5px solid #cecbcb;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 700px;
    height: auto;
    margin: 10px;
    ${mobile({ width: 'auto'})}
`;


const PostTitleContainer = styled.div`
    padding: 7px;
    display: flex;
    align-items: center;
`;

const PostOwnerImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    ${mobile({ height: 40, width: 40})}
`;

const PostOwnerUsername = styled.span`
    font-weight: bold;
    padding-left: 5px;
    ${mobile({ fontSize: 15})}
`;

const PostImageContainer = styled.div`
    height: auto;  
    ${mobile({ height: 'auto'})}
`;

const PostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;


const PostButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
`;

const PostButtonsRightContainer = styled.div`
`;

const PostButtonsLeftContainer = styled.div`
    
`;

const PostLikesCountContainer = styled.div`
    padding: 5px;
    ${mobile({ fontSize: 15 })}
`;

const PostDescriptionContainer = styled.div` 
    display: flex;
    align-items: center;
`;

const PostDescription = styled.div` 
    padding: 5px;
    ${mobile({ fontSize: 15})}
`;

const Post = ({post,user}) => {
    const [likePost,setLikePost] = useState(false);
    const [savePost,setSavePost] = useState(false);

    const handleLikeButton = () => {
        if(likePost){
            setLikePost(false)
        }else{
            setLikePost(true)
        }
    }

    const handleSaveButton = () => {
        if(savePost){
            setSavePost(false)
        }else{
            setSavePost(true)
        }
    }
  return (
    <Container>
        <PostTitleContainer>
            <PostOwnerImage src={API_URL+"posts/find/"+user.profileImage} />
            <PostOwnerUsername>{user.username}</PostOwnerUsername>
        </PostTitleContainer>

        <PostImageContainer>
            <PostImage src={API_URL+'posts/find/'+post.img} />
        </PostImageContainer>

        <PostButtonsContainer>
            <PostButtonsLeftContainer>
                {likePost 
                    ? <Favorite onClick={handleLikeButton} style={{marginRight:'10',cursor:'pointer'}}/>
                    : <FavoriteBorderOutlined onClick={handleLikeButton}  style={{marginRight:'10',cursor:'pointer'}}/>
                }
                <ModeCommentOutlined style={{cursor:'pointer'}}/>
            </PostButtonsLeftContainer>
            <PostButtonsRightContainer>
                {savePost
                    ? <Bookmark onClick={handleSaveButton} style={{cursor:'pointer'}}/>
                    : <BookmarkBorderOutlined onClick={handleSaveButton} style={{cursor:'pointer'}}/>
                }
            </PostButtonsRightContainer>
        </PostButtonsContainer>

        <PostLikesCountContainer>
            115 Like
        </PostLikesCountContainer>

        <PostDescriptionContainer>
            <PostOwnerUsername>{user.username}</PostOwnerUsername>
            <PostDescription> {post.desc}</PostDescription>
        </PostDescriptionContainer>
    </Container>
  )
}

export default Post