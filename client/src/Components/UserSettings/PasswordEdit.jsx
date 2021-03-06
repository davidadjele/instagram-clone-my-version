import styled from 'styled-components'

import {mobile} from '../../responsive.js'
import { useState } from 'react';
import { API_URL, FREE_AVATAR } from '../../requestMethods.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;`;
const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const OldPasswordContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;
const NewPasswordContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ flexDirection:'column'})}
`;

const ConfirmPasswordContainer = styled.div`
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
    font-weight: bold;
    ${mobile({ fontSize: 12 })}
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
    ${mobile({ justifyContent: 'center',fontSize: 12 })}
`;
const Field = styled.h4`
    ${mobile({ fontSize: 12 })}
`;

const Input = styled.input`
    padding: 5px;
    width: 70%;
    border: 0.3px solid #d6d4d4;
    border-radius: 3px;

    ${mobile({ width: '100%',height:'20px',marginBottom: '10px',fontSize: 15 })}
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
    color: white;
    background-color: #0f1011;
    padding: 15px;
    ${mobile({ width: '50%',padding:'5px'})}
`;


const PasswordEdit = ({user}) => {
  const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const handleOldPasswordChange = (e) =>{
        setOldPassword(e.target.value);
    }

    const handleNewPasswordChange = (e) =>{
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) =>{
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = () => {
      
    }

  return (
    <Container>
        <UserInfoContainer>
            <UserImageContainer>
                <UserImage src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage}/>
            </UserImageContainer>
            <UserNameContainer>
                <UserName>
                    {user.username}
                </UserName>
            </UserNameContainer>
        </UserInfoContainer>
        
        <OldPasswordContainer>
            <FieldContainer>
                <Field>
                    Old Password
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input type="password" onChange={handleOldPasswordChange} />
            </InputContainer>
            
        </OldPasswordContainer>

        <NewPasswordContainer>
            <FieldContainer>
                <Field>
                  New Password
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input type="password" onChange={handleNewPasswordChange} />
            </InputContainer>
        </NewPasswordContainer>
        <ConfirmPasswordContainer>
            <FieldContainer>
                <Field>
                    Confirm Password
                </Field>
            </FieldContainer>
            <InputContainer>
                <Input type="password"  onChange={handleConfirmPasswordChange} />
            </InputContainer>
        </ConfirmPasswordContainer>
        <SubmitButtonContainer>
            <SubmitButton>
                Submit
            </SubmitButton>
        </SubmitButtonContainer>

    </Container>
  )
}

export default PasswordEdit