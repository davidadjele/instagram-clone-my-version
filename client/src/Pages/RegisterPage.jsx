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
    border-bottom: 0.5px solid #d6d4d4!important;
    ${mobile({ fontSize: 15})}
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
  text-align: center;
  justify-content: center;
  ${mobile({ fontSize: 15})}
`;

const Success = styled.span`
  color: #9bdd90;
`;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [accountCreated,setAccountCreated] = useState(false);
    const [validPassword,setValidPassword] = useState(true);
    const [error,setError] = useState(false);
    const [errorName,setErrorName] = useState(false);
    const [errorUsername,setErrorUsername] = useState(false);
    const [errorEmail,setErrorEmail] = useState(false);
    const [errorPasswordTooShort,setErrorPasswordTooShort] = useState(false);
    const [errorPasswordNotStrong,setErrorPasswordNotStrong] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        name.length < 2 ? setErrorName(true):setErrorName(false);
        const validName =  name.length < 2 ? false : true;
        username.length < 4 ? setErrorUsername(true):setErrorUsername(false);
        const validUserName =  username.length < 4 ? false : true;
        password.length < 4 ? setErrorPasswordTooShort(true):setErrorPasswordTooShort(false);
        const validPasswordLength = password.length < 4 ? false : true;
        password === passwordConfirm ? setValidPassword(true):setValidPassword(false);
        const validConfirmPassword =  password === passwordConfirm ? true : false;
        setError(false)
        if (validName && validUserName && validPasswordLength && validConfirmPassword) {
            
            try {
                await axiosInstance.post("auth/register", 
                    {
                        username: username.toLowerCase(),
                        name: name,
                        email: email,
                        password: password
                    }
                );
                setAccountCreated(true);
            } catch (err) {
                setError(true)
                setAccountCreated(false);
                console.log(err);
            }
        }

    }

    const handleLoginPage = () => {
        navigate('/login')
    }
  return (
    <Container>
        <Wrapper>
            <Title>ConnectPlace</Title>
            <SubTitle>Create an Account</SubTitle>
            <Form>
                <Input placeholder="name" onChange={(e) => setName(e.target.value)}/>
                {errorName && <Error>Name must contain at least 2 characters!</Error>}
                <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                {errorUsername && <Error>Username must contain at least 4 characters!</Error>}
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                {errorPasswordTooShort && <Error>Password must contain at least 4 characters!</Error>}
                <Input type="password" placeholder="confirm password" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                {!validPassword && <Error>You need to use same password</Error>}
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleRegister} >CREATE</Button>
                {accountCreated && <Success>Account created! Go to Login Page</Success>}
                {error && <Error>Username or email already in use. Choose another one please!</Error>}
                <Link onClick={handleLoginPage} >GO TO LOGIN PAGE</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default RegisterPage