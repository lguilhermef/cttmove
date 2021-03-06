import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Login.css";
import picture from "../../Assets/girl-picture.jpg"

import AuthService from "../../services/auth-service";

const required = (value) => {
  if (!value) {
    return <div className="message">Campo obrigatório.</div>;
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.history.push("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div style={{height: "100%", width: "50%", display:"flex", justifyContent: "center", alignItems: "center"}}>

      <div className="form">
        <Form onSubmit={handleLogin} ref={form}>
          <h1>Entrar</h1>
          <h5>Por favor introduza os dados que colocou durante o seu registo.</h5>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <Input
              placeHolder="nome@dominio.com"
              type="text"
              name="email"
              value={email}
              onChange={(e) => onChange(e, setEmail)}
              validations={[required]}
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <Input
              placeHolder="6+ caracteres"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e, setPassword)}
              validations={[required]}
            />
          </div>

          <button disabled={loading}>
            {loading && <span></span>}
            <span>Entrar</span>
          </button>
          {message && <div className="message">{message}</div>}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          <p>
            Ainda não tem conta? Registe-se{" "}
            <Link to="/register">
              <span id="aqui-word">aqui.</span>
            </Link>
          </p>
          <p id="forgot-password">Esqueceu-se da password?</p>
        </Form>
      </div>
      </div>
      <div style={{height: "100%", width: "50%"}}>

      <img src={picture}></img>
      </div>
    </div>
  );
};

export default Login;
