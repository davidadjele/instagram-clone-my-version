import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    
`;


const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Privacy = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Terms and Condition</Title>
      </TitleContainer>
    </Container>
  )
}

export default Privacy