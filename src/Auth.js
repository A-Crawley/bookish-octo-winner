import { TextField, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SignUp, SignIn } from "./Supabase.js";

export default function Auth({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const regex = new RegExp(".+@.+");

  const handleSignUp = async () => {
    if (!regex.test(email)) {
      setEmailValid(false);
      return;
    }

    setLoading(true);

    let response = await SignUp(email, password);

    setLoading(false);

    if (!response) return;
    setLoggedIn(true);
  };

  const handleSignIn = async () => {
    if (!regex.test(email)) {
      setEmailValid(false);
      return;
    }

    setLoading(true);

    try{
        let response = await SignIn(email, password);
        setLoading(false);

        if (!response) return;
        setLoggedIn(true);
    } catch (error){
        setLoading(false);
        setPassword('');
        setLoginError(true);
    }
  };

  const handleGuest = async () => {
    let userId = crypto.randomUUID();

    setLoading(true);

    try{
        let response = await SignUp(`${userId}@email`, userId);
        setLoading(false);

        if (!response) return;
        localStorage.setItem("_v89+g", userId);
        setLoggedIn(true);
    } catch (error){
        setLoading(false);
        setPassword('');
        setLoginError(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmailValid(true);
    setLoginError(false);
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setLoginError(false);
    setPassword(event.target.value);
  };

  useEffect(() => {
    const session = localStorage.getItem("sb-rvujnmxbwpkogfnllrlr-auth-token");
    if (session){
        const sessionData = JSON.parse(session);

        if (sessionData.expires_at > Math.floor(new Date().getTime() / 1000)) {
            setLoggedIn(true);
            return;
        }
    }

    const guest = localStorage.getItem("_v89+g");
    if (guest){
        SignIn(`${guest}@email`, guest)
            .then(() => {
                setLoggedIn(true)
            })
            .catch(() => {
                localStorage.removeItem("_v89+g")}
            );
    }


  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10vh",
        left: "calc(50vw - calc(33vw / 2))",
        background: "rgb(40,40,40)",
        borderRadius: "10px",
      }}
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          width: "33vw",
        }}
      >
        <TextField
          error={!emailValid}
          helperText={!emailValid ? "Please enter a valid email" : ""}
          type={"email"}
          onChange={handleEmailChange}
          label={"Email"}
        />
        <TextField
          error={loginError}
          helperText={loginError ? 'Something went wrong' : ''}
          type={"password"}
          onChange={handlePasswordChange}
          label={"Password"}
          value={password}
          sx={{ mt: 2 }}
        />
        <Button onClick={handleSignIn} variant={"contained"} sx={{ mt: 2 }} disabled={loading}>
          Login
        </Button>
        <Button onClick={handleSignUp} variant={"contained"} sx={{ mt: 1 }} disabled={loading}>
          Sign Up
        </Button>
        <div
          style={{
            marginBlock: "16px",
          }}
        ></div>
        <Button onClick={handleGuest} variant={"contained"} color={'secondary'} disabled={loading}>
          Continue As Guest
        </Button>
      </Paper>
    </div>
  );
}
