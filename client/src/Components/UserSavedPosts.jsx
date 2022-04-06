import styled from 'styled-components'
import {mobile} from '../responsive.js'
import { Favorite, ModeComment} from '@material-ui/icons';

const Container = styled.div`
     display: flex;
    margin-left: 40px;
    margin-right: 40px;
    flex-wrap: wrap;
    ${mobile({ margin:0})}
`;

const UserSavedPosts = () => {
  return (
    <Container>
        UserSavedPosts on construction
    </Container>
  )
}

export default UserSavedPosts