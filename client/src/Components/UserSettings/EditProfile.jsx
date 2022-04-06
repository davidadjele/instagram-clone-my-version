import styled from 'styled-components'
import {
    Link
} from "react-router-dom";

import {mobile} from '../../responsive.js'
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const NameEditContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;
const UserNameEditContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;
const DescEditContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;  
const GenderEditContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;
const UserImageContainer = styled.div`
    padding: 20px;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    /* padding: 20px; */
`;
const UserImage = styled.img`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserNameContainer = styled.div`
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: flex-start;
`
;const UserName = styled.span`
`;

const FieldContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding: 20px;
    ${mobile({ justifyContent: 'center',padding:'2px'})}
`;

const InputContainer = styled.div`
    display: flex;
    flex: 2;
    height: 50px;
    align-items: center;
    justify-content: flex-start;
    ${mobile({ justifyContent: 'center'})}
`;
const Field = styled.h4`
`;

const Input = styled.input`
    padding: 5px;
    width: 70%;
    border: none;
    border-bottom: 0.6px solid black;
    border-radius: 3px;

    ${mobile({ width: '100%',height:'20px',border: 'none',borderBottom:'0.6px solid black',marginBottom: '10px'})}
`;

const TextArea = styled.textarea`
    padding: 5px;
    width: 70%;
    border: none;
    border-bottom: 0.6px solid black;
    border-radius: 3px;
    ${mobile({ width: '100%',height:'20px',border: 'none',borderBottom:'0.6px solid black',marginBottom: '10px'})}
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    
    
`;

const SubmitButton= styled.button`
    width: 15%;
    cursor: pointer;
    border: .5px solid #cecbcb;
    border-radius: 3px;
    background-color: #dbe2e9;
    padding: 15px;
    ${mobile({ width: '70%',padding:'5px'})}
`;



const EditProfile = ({user}) => {
    const [name,setName] = useState(user.name)
    const [gender,setGender] = useState(user.gender)
    const [userName,setUserName] = useState(user.username)
    const [bio,setBio] = useState(user.bio)

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const handleUserNameChange = (e) =>{
        setUserName(e.target.value);
    }

    const handleGenderChange = (e) =>{
        setGender(e.target.value);
    }

    const handleBioChange = (e) =>{
        setBio(e.target.value);
    }
  return (
    <Container>
        <UserInfoContainer>
            <UserImageContainer>
                <UserImage src={"http://localhost:5000/api/posts/find/"+user.profileImage} alt={user.username}/>
            </UserImageContainer>
            <UserNameContainer>
                <UserName>
                    {user.username}
                </UserName>
            </UserNameContainer>
        </UserInfoContainer>
        
        <NameEditContainer>
            <FieldContainer>
                <Field>
                    Name
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input type="text" value={name} onChange={handleNameChange} />
            </InputContainer>
            
        </NameEditContainer>

        <UserNameEditContainer>
            <FieldContainer>
                <Field>
                    Username
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input value={userName} onChange={handleUserNameChange} />
            </InputContainer>
        </UserNameEditContainer>

        <DescEditContainer>
            <FieldContainer>
                <Field>
                    Bio
                </Field>
            </FieldContainer>
            <InputContainer>
                <TextArea value={bio} onChange={handleBioChange} />
            </InputContainer>
        </DescEditContainer>
        <GenderEditContainer>
            <FieldContainer>
                <Field>
                    Gender
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input value={gender} onChange={handleGenderChange} />
            </InputContainer>
        </GenderEditContainer>

        <SubmitButtonContainer>
            <SubmitButton>
                Save
            </SubmitButton>
        </SubmitButtonContainer>

    </Container>
  )
}

export default EditProfile