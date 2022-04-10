import styled from 'styled-components'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

import { 
    useNavigate
} from "react-router-dom";

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
    font-weight: bold;
`;

const SubTitle = styled.h3`
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
    &:disabled {
        color: #919491;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;


const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    const handleCreateAccount = () => {
        navigate('/register')
    }

  return (
    <Container>
        <Wrapper>
            <Title>ConnectPlace</Title>
            <SubTitle>Sign In</SubTitle>
            <Form>
                <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <Button onClick={handleClick} disabled={isFetching}>
                    LOGIN
                </Button>
                {error && <Error>Something went wrong...</Error>}
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link onClick={handleCreateAccount} >CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default LoginPage