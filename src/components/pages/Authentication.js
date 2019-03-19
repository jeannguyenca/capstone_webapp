import React, { Component } from 'react';
import Styled, {ThemeProvider} from "styled-components";
import { Link, withRouter } from 'react-router-dom';


import {Grid, Button, TextField} from '@material-ui/core/';
// import {connect} from 'react-redux';

import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../graphql'
import { USER_ID, AUTH_TOKEN} from '../Layout/Auth/constants'

import Error from '../Layout/Components/Error'

import backGround from '../../assets/contact_blur.jpg';
import logoText from '../../assets/logo_text.svg';

import { theme } from '../parts/theme';
import user from '../../media/icons/profile.svg';
import lock from '../../media/icons/password.svg';

let Figure = Styled.figure `
  margin-top: 0;
  display: flex;
  justify-content: center;
  img {
    width: 320px;
    height: 72px;
  }
  @media only screen and (min-width: 1150px){
    justify-content: flex-start;
    margin-left: 0;
    img {
      width: 360px;
      height: 92px;
    }


  }
`;

let TextField1 = Styled(TextField)`
  width: 220px;
  input[placeholder] { text-align: center }
  fieldset{ 
    border-radius: 24.5px !important;
  }
`;

let Login = Styled.div `
  background: url(${backGround});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .lWrapper{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

  }

  p, .signUp {
    font-size: 14pt;
  }
  .Gtitle{
    width: 100%;
    p {
      color: white;
      text-shadow: 1px 2px 3px rgb(0, 0, 0);
      display: none;
    }
  }
  h1,h2{
    color: ${props => props.theme.main};
    font-weight: 800;
    text-align: center;
  } 
  h1{
    font-size: 35pt;
    letter-spacing: 2pt;
    text-shadow: 1px 2px 3px rgb(0, 0, 0);
  }
  h2{
    font-size: 35pt;
    
  }
  
  .loginForm {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    /* height: 600px; */
    max-width: 320px;
    box-shadow: 1px 2px 3px rgb(0, 0, 0);
    padding: 24px 0;
    h2{margin: 0 auto }
    p{
      color: black;
      text-align: center;
      padding: 0 16px;
    }
    .signUp{
      color: ${ props => props.theme.second }
      margin: 8px auto 24px auto;
      &:hover {
        font-weight: 700;
      }
    }
    /* .emailField label {left: 75px !important}
    .passField label {left: 65px !important}
    .pass2Field label {left: 45px !important}
    .emailField .MuiFormLabel-focused-114, .passField .MuiFormLabel-focused-114, .pass2Field .MuiFormLabel-focused-114{
      left: 0 !important
    } */
  }
  .forgot{color: black;  margin: 12px auto 16px auto }
  .form-actions{
    display: flex;
    margin-left: 20px;
    flex-flow: column nowrap;
    .btnForm{
      width: 220px;
      height: 53px;
      margin: 8px auto;
      font-size: 14pt;
      border-radius: 24.5px
      
    }
    .btnGmail{ 
      border: 2px solid ${props => props.theme.main} 
      font-size: 12pt;
    }
    .btnLogin{
      background-color: ${props => props.theme.main}
      color: white;
      &:hover {
        background-color: white
        color: black !important;
        border: 2px solid ${props => props.theme.main} 
      }
    }

  }

  @media only screen and (min-width: 550px){
    height: 100vh;
    .loginForm{
      max-width: 400px
    }
    h1{font-size: 42pt;}
  }
  @media only screen and (min-width: 1150px){
    .lWrapper {
      withRouter
      width: 1250px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
    }
    .Gtitle{
      h1{
        margin: 24px auto; 
        width: 400px
      }
      h1, h2{text-align: left;}
      p{width: 400px; display: initial}
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
    .loginForm, .Gtitle {
      height: 570px;
      width: 520px;

    }
  }

`;

const initialState = {
  email: '',
  password: ''
}

class Authentication extends Component {
  state = {
    isLogin: true,
     ...initialState 
  };

  clearState = () => {
    this.setState({...initialState});
  }

  HandleChange = e => {
    e.preventDefault();
    this.setState ({
      [ e.target['name'] ]: e.target['value']
    })
    // const { name, value } = e.target;
    // this.setState({ [name]: value });
  }


  validateForm = () => {
    const { email, password } = this.state;
    const isInvalid = !email || !password;
    return isInvalid;
  };

  submitHandler = (e, signinUser) => {
    e.preventDefault();
    signinUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      // await this.props.refetch();
      this.clearState();
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const {HandleChange, submitHandler} = this;
    const { email, password } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Login>
          <div className="lWrapper">
            <div className="Gtitle">
              <Link to="/">
                <Figure>
                  <img src={logoText} alt="Logo Text"/>
                </Figure>
              </Link>
              <h1>Hello Partner!</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat molestias nulla voluptas velit sit ipsa accusantium ipsum eum assumenda molestiae. Sunt quas corrupti et iusto cupiditate. Totam est numquam obcaecati nesciunt quasi voluptatum nemo perferendis?</p>
            </div>
            <Mutation mutation={LOGIN_USER} variables={{ email, password }}>
              {(signinUser, { data, loading, error }) => {
              return (

              <form className="auth-form loginForm" 
                  onSubmit={ e => this.submitHandler(e, signinUser) }>
                <h2>Log in</h2>
                <p style={{marginBottom: 0, padding: 'auto 12px'}}>Welcome back! If you not a member yet.</p>
                <Link className="signUp" to="/signup">Sign up free!</Link>

                <div className="email">
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <figure style={{margin: '12px'}}><img src={user} alt="user"/></figure>
                    </Grid>
                    <Grid item style={{marginRight: '35px'}}>
                      <TextField1 
                                label="Email" 
                                margin="normal"
                                variant="outlined"
                                placeholder="Email"
                                name="email"
                                onChange={HandleChange}
                                type="email"
                                className="emailField"
                                
                                />
                    </Grid>
                  </Grid>
                </div>

                <div className="password">
                  <Grid className="field" container spacing={8}                  alignItems="flex-end"
                        style={{marginRight: '35px'}}>
                    <Grid item>
                      <figure style={{margin: '12px'}}><img src={lock} alt="lock"/></figure>
                    </Grid>
                    <Grid item>
                      <TextField1 
                                label="Password" 
                                margin="normal"
                                variant="outlined"
                                placeholder="Password"
                                name="password"
                                onChange={HandleChange}
                                type="password"
                                className="passField"
                                
                                />
                    </Grid>
                  </Grid>
                </div>
                <Link className="forgot" style={{}} to="/forgot">Forgot Password</Link>
                <div className="form-actions">
                  <Button className=" btnForm btnLogin" 
                          type="submit"
                          disabled={loading || this.validateForm()}
                          >Log In</Button>
                  <Button className="btnForm btnGmail" type="button">Log In with Gmail</Button>
                </div>
                  {error && <Error className="errorL" error={error} />}
              </form>
              )}
              }
              </Mutation>
          </div>
        </Login>
      </ThemeProvider>  
    );
  }
}

export default withRouter(Authentication)