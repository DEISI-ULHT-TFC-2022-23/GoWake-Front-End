import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom';
import AppBar from "./appBar/AppBar";
import {useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Container} from "@material-ui/core";
import axios from 'axios';
import {Button} from "react-bootstrap";

function Login() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [showRecoverPassword, setRecoverPassword] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' , email: ''});

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    //const username = 'admin';
    //const password = 'iVSK7X!ynP09';

    function handleChangeUsername(event) {
        setUser({ ...user, username: event.target.value });
    }
    function handleChangePassword(event) {
        setUser({ ...user, password: event.target.value });
    }
    function handleSubmit(event) {

        event.preventDefault();

        axios.post('https://mmonteiro.pythonanywhere.com/account/login/', user)
            .then(response => {

                const user = {
                    username: response.data.username,
                    token: response.data.token,
                    email: response.data.email,
                    role: response.data.role,
                };
                navigate('/login/dashboard', { state: user });
            })
            .catch(error => {
                if (error.response.status === 400) {

                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 2000);

                } else {
                    // lidar com outros erros
                    console.log(error);
                }
            });
    }
    function handleSubmitRecoverPassword(event){

        event.preventDefault();

/*        axios.post('https://gowake.daletech.pt/account/recoverpassword/', user)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                if (error.response.status === 400) {

                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 2000);

                } else {
                    // lidar com outros erros
                    console.log(error);
                }
            });*/
    } //falta o mauro fazer o endpoint
    function recoverPassword(event) {
        event.preventDefault();

        if (showRecoverPassword) {
            setRecoverPassword(false);
        } else {
            setRecoverPassword(true);
        }
    }

    return (
        <div className="sdd">
            <Box sx={{display: "flex"}}>
                <AppBar/>
                <Container>
                    <DrawerHeader/>
                    <MDBContainer className="p-3 my-4">
                        <MDBRow>
                            <MDBCol id="esconde" col='10' md='6'>
                                <img
                                    src="https://st2.depositphotos.com/1874273/9372/v/600/depositphotos_93724752-stock-illustration-athlete-on-board-glides-over.jpg"
                                    width="90%" height="90%" alt=""/>
                            </MDBCol>
                            <MDBCol col='4' md='6'>

                                <h5 className="fw-normal my-4 pb-3" style={{
                                    letterSpacing: '1px', fontSize: '30px'
                                }}>Sign into your account</h5>

                                <MDBInput wrapperClass='mb-4' value={user.username} onChange={handleChangeUsername}
                                          placeholder="Username" id='formControlLg' type='text'
                                          size="lg"/>
                                <MDBInput wrapperClass='mb-4' value={user.password} onChange={handleChangePassword}
                                          placeholder="Password" id='formControlLg' type='password'
                                          size="lg"/>

                                {showError && <p id="error">Wrong credentials</p>}

                                <Button type="submit" onClick={handleSubmit} className="mb-4 w-100" size="lg">Sign
                                    in</Button>

                                {showRecoverPassword && <div className="divider d-flex align-items-center my-4"/>}

                                {showRecoverPassword &&
                                    <MDBInput wrapperClass='mb-4' value={user.password} onChange={handleChangePassword}
                                              placeholder="Enter email to recover password" id='formControlLg' type='email'
                                              size="lg"/>
                                }

                                {showRecoverPassword &&
                                    <Button variant="secondary" type="submit" onClick={handleSubmitRecoverPassword} className="mb-4 w-100" size="lg">Recover password</Button>
                                }

                                <div className="divider d-flex align-items-center my-4"/>

                                <div className='d-flex flex-row justify-content-center'>
                                    <a id="fg" className="small text-muted me-1 fw-bold" onClick={recoverPassword}>Forgot Password?</a>
                                    <a id="fg" className="small text-muted me-1 fw-bold" href="/createlogin">Create an
                                        Account</a>
                                </div>

                                <div className='d-flex flex-row justify-content-center'>
                                    <a id="tu" href="#" className="small text-muted me-1">Terms of use.</a>
                                    <a id="pp" href="#" className="small text-muted">Privacy policy</a>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Container>
            </Box>
        </div>
    );
}

export default Login;