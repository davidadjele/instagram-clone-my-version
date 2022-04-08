import styled from 'styled-components'
import {mobile} from '../responsive.js'
import Navbar from '../Components/Navbar.jsx';
import EditProfile from '../Components/UserSettings/EditProfile.jsx';
import { useState } from 'react';
import PasswordActive from '../Components/UserSettings/PasswordEdit.jsx';
import Help from '../Components/UserSettings/Help.jsx';
import Privacy from '../Components/UserSettings/Privacy.jsx'

const Container = styled.div`
`;

const Wrapper = styled.div`
    display: flex;
    margin: 40px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    ${mobile({ flexDirection: 'column',fontSize:15})}
`;

const ContainerRight = styled.div`
    border-left: .5px solid #e2e2e2;
    width: 80%;
    display: flex;
    ${mobile({ width: '100%',paddingBottom: '10px'})}
`;

const ContainerLeft= styled.div`
    width: 20%;
    display: flex; 
    flex-direction: column;  
    ${mobile({ width: '100%'})}
`;

const MenuButtonEdit = styled.div`
    padding: 20px;
    cursor: pointer;
    color: ${(props) => props.active ? 'black': 'gray'};
    border-bottom: ${(props) => props.active ? '2px solid black': 'none'};
    ${mobile({ padding: '10px'})}
`;
const MenuButtonPassword = styled.div`
    padding: 20px;
    cursor: pointer;
    color: ${(props) => props.active ? 'black': 'gray'};
    border-bottom: ${(props) => props.active ? '2px solid black': 'none'};
    ${mobile({ padding: '10px'})}
`;
const MenuButtonPrivacy = styled.div`
    padding: 20px;
    cursor: pointer;
    color: ${(props) => props.active ? 'black': 'gray'};
    border-bottom: ${(props) => props.active ? '2px solid black': 'none'};
    ${mobile({ padding: '10px'})}
`;
const MenuButtonHelp = styled.div`
    padding: 20px;
    cursor: pointer;
    color: ${(props) => props.active ? 'black': 'gray'};
    border-bottom: ${(props) => props.active ? '2px solid black': 'none'};
    ${mobile({ padding: '10px'})}
`;


const SettingProfilePage = ({user}) => {

    const [editProfilActive,setEditProfilActive] = useState(true)
    const [editPasswordsActive,setEditPasswordsActive] = useState(false);
    const [editPrivacyActive,setEditPrivacyActive] = useState(false);
    const [consultHelp, setConsultHelp] = useState(false);

    const handleEditProfilActive = () =>{
        setEditProfilActive(true);
        setEditPasswordsActive(false);
        setEditPrivacyActive(false);
        setConsultHelp(false);
    }

    const handleEditPasswordActive = () =>{
        setEditProfilActive(false);
        setEditPasswordsActive(true);
        setEditPrivacyActive(false);
        setConsultHelp(false);
    }

    const handleEditPrivacyActive = () =>{
        setEditProfilActive(false);
        setEditPasswordsActive(false);
        setEditPrivacyActive(true);
        setConsultHelp(false);

    }

    const handleEditProfilHelp = () =>{
        setEditProfilActive(false);
        setEditPasswordsActive(false);
        setEditPrivacyActive(false);
        setConsultHelp(true);
    }

  return (
    <Container>
        <Navbar user={user}/>
        <Wrapper>

            <ContainerLeft>
                <MenuButtonEdit active={editProfilActive} onClick={handleEditProfilActive} >
                    Edit Profile
                </MenuButtonEdit>
                <MenuButtonPassword active={editPasswordsActive} onClick={handleEditPasswordActive} >
                    Change Password
                </MenuButtonPassword>
                <MenuButtonPrivacy active={editPrivacyActive} onClick={handleEditPrivacyActive} >
                    Privacy and Security
                </MenuButtonPrivacy>
                <MenuButtonHelp active={consultHelp} onClick={handleEditProfilHelp} >
                    Help
                </MenuButtonHelp>
                
            </ContainerLeft>

            <ContainerRight>
                {editProfilActive && <EditProfile user={user} />}
                {editPasswordsActive && <PasswordActive user={user} />}
                {editPrivacyActive && <Privacy/>}
                {consultHelp && <Help/>}
            </ContainerRight>
        </Wrapper>

    </Container>
  )
}

export default SettingProfilePage