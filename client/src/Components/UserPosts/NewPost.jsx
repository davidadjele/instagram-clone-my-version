import styled from 'styled-components'
import { AddPhotoAlternateOutlined} from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../requestMethods';
import { setUserDataStatus } from '../../redux/userRedux';

const Container = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0.5px solid #d6d4d4;
  
`;

const TileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Title = styled.span`
  font-weight: bold;
`;
const UploadAndInputFileButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const InputLabel = styled.label`
  border: .5px solid #ccc;
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  cursor: pointer;
  border: .5px solid #cecbcb;
  border-radius: 3px;
  width: 150px;
  background-color: #dbe2e9;
  padding: 5px;
`;

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  padding: 10px;
`;

const CaptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
`;
const CaptionFieldContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
`;

const CaptionInputContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
`;
const CaptionName = styled.p`
  font-size: 15px;
`;
const CaptionInput = styled.textarea`
  border: none;
  font-size: 15px;
  border-bottom: 0.5px solid #d6d4d4;
`;

const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 5px;
`;

const NewPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const info = useSelector((state) => state.user.currentUser);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [filename,setFilename] = useState('');

  const onChangeFile = (e) => {
    setFilename(e.target.files[0])
    console.log(filename);
  }
  const uploadImageToDatabase = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(...data);


    try {
      await axiosInstance.post(
        `posts/${info._id}`,
        data
        ,
        {
          headers:  { 
            token: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
          }
        });
        dispatch(setUserDataStatus(true));
        navigate('/');
        
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <TileContainer>
        <Title>
          Create new post
        </Title>
      </TileContainer>  

      <UploadAndInputFileButtonContainer>
          <Form onSubmit={uploadImageToDatabase} encType="multipart/form-data">

          <CaptionContainer>
              <CaptionFieldContainer>
                <CaptionName>
                  <label htmlFor="desc">Image Description</label>
                </CaptionName>
              </CaptionFieldContainer>  
              <CaptionInputContainer>
                  <CaptionInput id="desc" name="desc" rows="2" 
                            placeholder="Description" required
                  >
                  </CaptionInput>
              </CaptionInputContainer>
          </CaptionContainer> 
              <FormDiv>
                  <InputLabel htmlFor="image">
                    Upload Image <AddPhotoAlternateOutlined/>
                  </InputLabel>
                  <Input type="file" id="image" 
                        name="image"  required 
                        onChange={onChangeFile}
                  />
                  {filename &&<FileNameContainer> <span>{filename.name}</span></FileNameContainer>}
              </FormDiv>
              <FormDiv>
                  <UploadButton type="submit">Submit</UploadButton>
              </FormDiv>
          </Form>
      </UploadAndInputFileButtonContainer>   
    </Container>
  )
}

export default NewPost