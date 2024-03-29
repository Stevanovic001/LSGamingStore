/* NASLOV: SignupScreen
    AUTORI: Luka Stevanovic, Sara Nastic
    DATUM: 22.05.2023
    OPIS: Komponenta SignupScreen pokazuje obrazac za registrovanje korisnika na sajt, postavlja API zahteve i azurira stanje
    PRISTUP: Ovoj komponenti se pristupa putem komponente App.js
    INPUT: / 
    OUTPUT: Output je renderovanje forme name, email, password, confirmPassword */


import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function SingupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState( ''); //Uzimamo vrednost trenutnog stanja i uzimamo f-ju te vrednosti
  const [email, setEmail] = useState(''); //Definisemo emai
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault(); //Sprecava refresh stranice
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
                return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", { //Saljemo post req name email pass u formi data
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNUP", payload: data }); //Update state of context
      localStorage.setItem("userInfo", JSON.stringify(data)); 
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sing Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sing In</Link>
        </div>
      </Form>
    </Container>
  );
}
