import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Button from "@/src/components/Button/Button";
import { registerUser } from "@/api/user";
import { AxiosError } from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isError, setError] = useState(false);
  const [isRegisterIn, setRegisterIn] = useState(false);
  const router = useRouter();

  const onRegister = async () => {
    try {
      setRegisterIn(true);
      setError(false);
  
      if (password !== confirmPassword) {
        setError(true);
        setRegisterIn(false);
        return;
      }
  
      const userData = {
        username: username,
        email: email,
        password: password,
      };
  
      const response = await registerUser(userData);
  
      if (response.status === 200) {
        cookie.set("jwt_token", response.data.token);
        router.push("/");
      }
  
    } catch (err) {
      const error = err as AxiosError;
  
      setRegisterIn(false);
      setError(true);
  
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Register</h1>
      <input
        type="Username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button title="Register" onClick={onRegister} isLoading={isRegisterIn} />

      {isError && <div style={{ color: "red" }}>Register failed</div>}
    </div>
  );
};

export default RegisterForm;