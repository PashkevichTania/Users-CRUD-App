import {SERVER_PATH} from "const";

export const login = async (body) => {
  try {
    const response = await fetch(`${SERVER_PATH}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'accepts': 'application/json'
      },
    })
    const data = await response.json();
    console.log("login: ", data)
    return data;
  }catch (error){
    console.log(error)
  }
}

export const signUp = async (body) => {
  try {
    console.log(JSON.stringify(body))
    const response = await fetch(`${SERVER_PATH}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    console.log("sign up: ", data)
    return data;
  }catch (error){
    console.log(error)
  }
}
