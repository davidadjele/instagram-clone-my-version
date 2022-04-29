import styled from 'styled-components'
import {mobile} from '../../responsive.js'

import OtherUserPost from './OtherUserPost';



const Container = styled.div`
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  flex-wrap: wrap;
  ${mobile({ margin:0})}
`;

const OtherUserPosts  = (posts) => { 
  return (
    <Container>
      {
        posts.posts.images?.map(post =>(
          <OtherUserPost post={post} key={post._id}/>
        ))
      }
        
    </Container>
  )
}

export default OtherUserPosts 