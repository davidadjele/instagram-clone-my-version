import styled from 'styled-components'
import { useEffect,useState } from 'react';
import {mobile} from '../responsive.js'

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-bottom: 0.5px solid #d6d4d4!important;;
`;

const Button = styled.button`
    width: 50%;
    border: none;
    padding: 10px;
    border-radius: 2px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;


const RegisterPage = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="name" />
                <Input placeholder="last name" />
                <Input placeholder="username" />
                <Input placeholder="email" />
                <Input type="password" placeholder="password" />
                <Input type="password" placeholder="confirm password" />

                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default RegisterPage