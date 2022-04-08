import styled from 'styled-components'
import {mobile} from '../../responsive.js'

import UserPost from './UserPost.jsx';



const Container = styled.div`
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  flex-wrap: wrap;
  ${mobile({ margin:0})}
`;

const UserPosts = (posts) => { 
  return (
    <Container>
      {
        posts.posts.images?.map(post =>(
          <UserPost post={post} key={post._id}/>
        ))
      }
        
    </Container>
  )
}

export default UserPosts