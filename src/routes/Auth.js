import React, {useState} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {authService} from "fbase";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("")
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)

  const onSocialClick = async (event) => {
    const {target: {name}} = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }

  return (
      <div>
        <form onSubmit={onSubmit}>
          <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
          <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
          <input type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
          {error}
        < /form>
        <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        <div>
          <button onClick={onSocialClick} name="google">Continue with Google</button>
        </div>
      </div>
  );
}
export default Auth;