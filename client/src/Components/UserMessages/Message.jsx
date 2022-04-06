import styled from 'styled-components'
import {mobile} from '../../responsive.js'
import { AddPhotoAlternateOutlined} from '@material-ui/icons';
import { useState } from 'react';

const Container = styled.div`
  
`;

const Message = ({user}) => {
  return (
    <Container>Message component on construction</Container>
  )
}

export default Message