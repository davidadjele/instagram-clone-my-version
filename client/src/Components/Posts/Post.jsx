import styled from 'styled-components'
import { useEffect, useState } from 'react';

import {mobile} from '../../responsive.js'

import { 
    ModeCommentOutlined,
    FavoriteBorderOutlined,
    BookmarkBorderOutlined,
    Favorite,
    Bookmark,
    SendOutlined
} from '@material-ui/icons';
import { API_URL, axiosInstance, FREE_AVATAR, getOtherUserInfos, getOtherUserPosts } from '../../requestMethods.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataStatus } from '../../redux/userRedux.js';
import { setOtherUserDataStatus } from '../../redux/otherUserRedux.js';
import { useNavigate } from 'react-router-dom';

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
    cursor: pointer;
    ${mobile({ height: 40, width: 40})}
`;

const PostOwnerUsername = styled.span`
    font-weight: bold;
    padding-left: 5px;
    cursor: pointer;
    ${mobile({ fontSize: 15})}
`;

const PostImageContainer = styled.div`
    height: ${(props) => props.height === "true"? '400px': 'auto'};  
    
`;

const PostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: ${(props) => props.height === "true" ? 'contain': 'cover'};
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

const AddCommentContainer = styled.div` 
    display: flex;
    border-top: .5px solid #cecbcb;
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
const CommentSection  = styled.div` 
    display: flex;
    padding: 5px;
    ${mobile({ fontSize: 15})}
`;
const CommentOwnerContainer  = styled.div` 
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-right: 5px;
`;

const CommentOwnerComment  = styled.div` 
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;


const ViewAllComment  = styled.div` 
    display: flex;
    align-items: center;
    color: gray;
    padding: 5px;
    cursor: pointer;
    ${mobile({ fontSize: 17})}
`;






const Post = ({post,height}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token =  useSelector((state) => state.user.currentUserToken);
    const currenUser =  useSelector((state) => state.user.currentUser);
    const [savePost,setSavePost] = useState(false);
    const [numberLike,setNumberLike] = useState(post.numberOfLikes.length)
    const [isLike,setIsLike] = useState(false);
    const [user,setUser] = useState({});
    const [comment,setComment] = useState('');
    

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

    const handleClickUser = async () => {
        navigate('/visitprofil/'+user.username);
        getOtherUserInfos(dispatch,user,token) 
    }

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
        dispatch(setUserDataStatus(true));
        if(currenUser._id !== user._id) {
            dispatch(setOtherUserDataStatus(true));
        }
        setComment('');
    }
  return (
    <Container>
        <PostTitleContainer>
            <PostOwnerImage onClick={handleClickUser} src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} />
            <PostOwnerUsername onClick={handleClickUser}>{user.username}</PostOwnerUsername>
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
                <ModeCommentOutlined onClick={
                    ()=> {
                        navigate('/comments',{ state: post })
                    }
                } style={{marginRight:'10',cursor:'pointer'}}/>
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
        <ViewAllComment onClick={
                    ()=> {
                        navigate('/comments',{ state: post })
                    }}
        >View all {post.comments.length} comments</ViewAllComment>
        {/* post.comments?.slice(0,1).map */}
        {/* .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1) */}
        {post.comments?.slice(0,1).map ( (c) => (
            <CommentSection key={c._id}>
                <CommentOwnerContainer>
                    {c.commentOwnerUsername}
                </CommentOwnerContainer>
                <CommentOwnerComment>
                    {c.comment}
                </CommentOwnerComment>
            </CommentSection>
        ) )
        }
        <AddCommentContainer>
            <CommentContainer>
                <Input type="text" placeholder="Add comment..." value={comment} onChange={(e)=>setComment(e.target.value)} />
            </CommentContainer>
            <PostCommentContainer>
                <SendOutlined onClick={handlePostComment} style={{cursor:'pointer'}}/>
            </PostCommentContainer>
        </AddCommentContainer>
    </Container>
  )
}

export default Post