import { navigate } from "../_routing/start.js";

export const isAuthenticated = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken){
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.status == 200

  }else{
    return false
  }

}

export const setAccessToken = async (code) => {

  if (!await isAuthenticated() && code) {
    let response = await fetch(`${API_ENDPOINT}/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        code: code
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    });
    if (response){
        let body = await response.json();
        sessionStorage.setItem('accessToken', body['access_token']);
        navigate('');
    }
  } else{
  console.log('failed to set access token');
  navigate('login') ;
  }
}

export const getUserDetails = async () =>{

  const accessToken = sessionStorage.getItem('accessToken');
  if (await isAuthenticated() ){
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.json()

  }else{
    return {
      message: 'user is not authenticated'
    }
  }

}