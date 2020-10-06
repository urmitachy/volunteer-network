import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import logo from '../../image/logos/Group 1329.png';
import google from '../../image/images/google2.jpg';
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = (e) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email: email} 
            setLoggedInUser(signedInUser);
            console.log(signedInUser)
            console.log(loggedInUser)
            storeAuthToken();
            
            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
          e.preventDefault();
    }
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
        //    console.log(idToken)
            history.replace(from);
          }).catch(function(error) {
            // Handle error
          });
    }

    return (
        <div>
            <img className='logo' src={logo} alt="Volunteer Network" /> <br/><br/>
        <div className='box-model'><h1>Login with</h1>
            <button onClick={handleGoogleSignIn} className="pill-button"><img src={google} alt="Google" />Continue with Google</button>
            <p>Don't have an account? Create one!</p>
            </div>
            
        </div>
    );
};

export default Login;