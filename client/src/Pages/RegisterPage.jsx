import styled from 'styled-components'
import { useState } from 'react';
import {mobile} from '../responsive.js'
import { axiosInstance } from '../requestMethods.js';
import { useNavigate } from 'react-router-dom';

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

const Error = styled.span`
  color: red;
`;


const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [accountCreated,setAccountCreated] = useState(false);
    const [noValidPassword,setnoValidPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setnoValidPassword(false);
        if (password === passwordConfirm && password !== '' && password !== '') {
            try {
                await axiosInstance.post("auth/register", 
                    {
                        username: username,
                        name: name,
                        email: email,
                        password: password
                    }
                );
                setAccountCreated(true);
            } catch (err) {
                console.log(err);
            }
        }else {
            setnoValidPassword(true);
        }

    }

    const handleLoginPage = () => {
        navigate('/login')
    }
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <Input type="password" placeholder="confirm password" onChange={(e) => setPasswordConfirm(e.target.value)} />

                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleRegister} >CREATE</Button>
                {accountCreated && <Error>Something went wrong...</Error>}
                {noValidPassword && <Error>You need to use same password</Error>}
                <Link onClick={handleLoginPage} >GO TO LOGIN PAGE</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default RegisterPage