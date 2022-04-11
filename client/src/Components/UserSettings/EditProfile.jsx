import styled from 'styled-components'

import {mobile} from '../../responsive.js'
import { useState } from 'react';
import { API_URL, axiosInstance, FREE_AVATAR } from '../../requestMethods.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataStatus } from '../../redux/userRedux.js';
import { useNavigate } from 'react-router-dom';

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
    flex-direction: column;
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
    ${mobile({ justifyContent: 'center'})}
`;
const Field = styled.h4`
`;

const Input = styled.input`
    padding: 5px;
    width: 70%;
    border: 0.3px solid #d6d4d4;
    border-radius: 3px;

    ${mobile({ width: '100%',height:'20px',marginBottom: '10px',fontSize: 15 })}
`;

const TextArea = styled.textarea`
    padding: 5px;
    width: 70%;
    border: 0.3px solid #d6d4d4;
    border-radius: 3px;
    
    ${mobile({ width: '100%',height:'20px',marginBottom: '10px',fontSize:15})}
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
const Form = styled.form`
`;
const Label = styled.label`
    font-weight: bold;
    ${mobile({ fontSize: 12 })}
`;


const FormImageDiv = styled.label`
    color: #67b5f5;
    cursor: pointer;
`;

const LabelFile = styled.label`
    color: #67b5f5;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 5px;
    ${mobile({ fontSize: 12})}
`;

const FileInput = styled.input`
    display: none;
`;

const FileName = styled.span`
    color: #10a028;
`;






const EditProfile = ({user}) => {
    const [name,setName] = useState(user.name)
    const [gender,setGender] = useState(user.gender)
    const [bio,setBio] = useState(user.bio)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [filename,setFilename] = useState('');
    const token =  useSelector((state) => state.user.currentUserToken);

    const onChangeFile = (e) => {
        setFilename(e.target.files[0])
    }

    const handleUserUpdateInfo = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        console.log(...data);

        try {
            await axiosInstance.put(
              `users/${user._id}`,
              data
              ,
              {
                headers:  { 
                  token: `Bearer ${token}`,
                  'content-type': 'multipart/form-data'
                }
              });
              dispatch(setUserDataStatus(true));
              navigate(`/profil/${user.username}`)
          } catch (error) {
            console.log(error);
          }
    }

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const handleGenderChange = (e) =>{
        setGender(e.target.value);
    }

    const handleBioChange = (e) =>{
        setBio(e.target.value);
    }
  return (
    <Container>
        <Form onSubmit={handleUserUpdateInfo} encType="multipart/form-data">
            <UserInfoContainer>
                <UserImageContainer>
                    <UserImage src={user.profileImage === ''? FREE_AVATAR : API_URL+"users/find/"+user.profileImage} alt={user.username}/>
                </UserImageContainer>
                <UserNameContainer>
                    <UserName>
                        {user.username}
                    </UserName>
                    <div>
                        <LabelFile htmlFor="profileImage" >Change your profile image</LabelFile>
                        <FileInput 
                            id="profileImage"
                            type="file" 
                            name="profileImage"
                            onChange={onChangeFile} 
                        />
                        
                    </div>
                    {filename && <FileName>Image selectionned</FileName>}
                </UserNameContainer>
            </UserInfoContainer>
        
            <NameEditContainer>
                <FieldContainer>
                    <Label htmlFor="name">Name</Label>
                </FieldContainer>
                <InputContainer>
                    <Input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                </InputContainer>
                
            </NameEditContainer>

            <DescEditContainer>
                <FieldContainer>
                    <Label htmlFor="bio">Bio</Label>
                </FieldContainer>
                <InputContainer>
                    <TextArea name="bio" id="bio" value={bio} onChange={handleBioChange} />
                </InputContainer>
            </DescEditContainer>
            <GenderEditContainer>
                <FieldContainer>
                    <Label htmlFor="gender">Gender</Label>
                </FieldContainer>
                <InputContainer>
                    <Input type="text" id="gender" name="gender" value={gender} onChange={handleGenderChange} />
                </InputContainer>
            </GenderEditContainer>

            <SubmitButtonContainer>
                <SubmitButton type="submit">
                    Save
                </SubmitButton>
            </SubmitButtonContainer>
        </Form>
        

    </Container>
  )
}

export default EditProfile