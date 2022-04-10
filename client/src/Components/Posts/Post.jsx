import styled from 'styled-components'
import { useEffect, useState } from 'react';

import {mobile} from '../../responsive.js'

import { 
    ModeCommentOutlined,
    FavoriteBorderOutlined,
    BookmarkBorderOutlined,
    Favorite,
    Bookmark
} from '@material-ui/icons';
import { API_URL, axiosInstance, FREE_AVATAR } from '../../requestMethods.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataStatus } from '../../redux/userRedux.js';
import { setOtherUserDataStatus } from '../../redux/otherUserRedux.js';

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
    height: ${(props) => props.height ? '400px': 'auto'};  
    
`;

const PostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: ${(props) => props.height ? 'contain': 'cover'};
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

const Post = ({post,height}) => {
    const dispatch = useDispatch()
    const token =  useSelector((state) => state.user.currentUserToken);
    const currenUser =  useSelector((state) => state.user.currentUser);
    const [savePost,setSavePost] = useState(false);
    const [numberLike,setNumberLike] = useState(post.numberOfLikes.length)
    const [isLike,setIsLike] = useState(false);
    const [user,setUser] = useState({})
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`users/finduser/${post.author}`,
                {      
                headers: { 
                        token: `Bearer ${token}`,
                    }
                }
            );
            setUser(res.data);

            if(post.numberOfLikes.some(item => item === currenUser._id)) {
                setIsLike(true);
            }else {
                setIsLike(false);
            }
        };
        fetchUser();
    }, [post._id]);

    const handleLikeButton = async () => {
        setNumberLike(isLike ? numberLike - 1 : numberLike + 1);
        setIsLike(!isLike);
        if(isLike){
            await axiosInstance.put(`posts/removelike/${post._id}`,
                {"userToRemove": currenUser._id}
            ,
                {
                    headers:  { 
                        token: `Bearer ${token}`,
                    }
                }
            )
        setIsLike(!isLike);
        dispatch(setUserDataStatus(true));
            if(currenUser._id !== user._id) {
                dispatch(setOtherUserDataStatus(true));
            }
        }else{
            await axiosInstance.put(`posts/like/${post._id}`,
                {
                    "numberOfLikes": [
                        currenUser._id
                    ]
                }
            ,
                {
                    headers:  { 
                        token: `Bearer ${token}`,
                    }
                }
            )
            setIsLike(!isLike);
            dispatch(setUserDataStatus(true));
            if(currenUser._id !== user._id) {
                dispatch(setOtherUserDataStatus(true));
            }
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
            <PostOwnerImage src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} />
            <PostOwnerUsername>{user.username}</PostOwnerUsername>
        </PostTitleContainer>

        <PostImageContainer height={height}>
            <PostImage height={height} src={API_URL+'posts/find/'+post.img} />
        </PostImageContainer>

        <PostButtonsContainer>
            <PostButtonsLeftContainer>
                {isLike 
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
            {numberLike} Likes
        </PostLikesCountContainer>

        <PostDescriptionContainer>
            <PostOwnerUsername>{user.username}</PostOwnerUsername>
            <PostDescription> {post.desc}</PostDescription>
        </PostDescriptionContainer>
    </Container>
  )
}

export default Post