import {React, useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import axios from "../utils/axios.js";
import { requests } from "../utils/requests";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from 'react-redux';
import {
    showLoader,
    hideLoader
  } from "../../store/modules/application/app.action";

export default function HandleAddMail() {

    const [mailCred, setMailCred] = useState();
    const authToken = useSelector((state) => state.auth.token);      
    const dispatch = useDispatch();  

    useEffect(()=>{

        if (!authToken) {
            window.location.href = "/login";
            }
        async function fetchCredMail() {
            dispatch(showLoader());
            const request = await axios.get(requests["getMailCred"]);
            return request;
          }
        
        fetchCredMail().then((res)=>{
            const data = res.data;
            console.log(data);
            if(data.credential){
                setMailCred(data.credential);
            }
            dispatch(hideLoader());

        }).catch((e)=>{
            alert("Something Went Wrong");
            dispatch(hideLoader());

        });
        
    }, []);

    function responseGoogleSuccess(resp) {
        // console.log(resp.mc.access_token);
        async function doOAuthLogin() {
            dispatch(showLoader());
          const request = await axios.post(requests["addMailCred"], resp);
          return request;
        }
        doOAuthLogin()
          .then((res) => {
            const data = res.data;
            // console.log(data);
            setMailCred(data);
            dispatch(hideLoader());

          })
          .catch((e) => {
            alert("Something Went Wrong");
            dispatch(hideLoader());

          });
      }

    return (
        <div className="inner">
            <h1>Manage Mail Credentials</h1>
            <div className="mailcred-inner">
                <p className="mail-cred-para">
                    Currently we only support single gmail mail credential for a single user.<br/> 
                    Our developers are working on integrating multiple mailing systems.
                </p>
                {mailCred && <div>
                    <p className="mail-cred-para">
                        Name : {mailCred.name}
                    </p>
                    <p className="mail-cred-para">
                        Email : {mailCred.email}
                    </p>
                </div>}
                <p className="mail-cred-para">
                    Add a new mail cred: 
                    <div className="submit-google-cont mailcred-google">
                    <GoogleLogin
                    clientId="880095652773-fa64olbb7s5u063d05cdva3pl88mrbm2.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogleSuccess}
                    accessType = "offline"
                    responseType="code"
                    prompt="consent"
                    scope="profile email https://www.googleapis.com/auth/gmail.send"
                    onFailure={(e) => {
                        console.log(e);
                    }}
                    />
                </div>
                </p>
            </div>
        </div>
    )
}
