import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";
import { useGlobalContext } from "../../GlobalContext";

const Login = () => {
  const [foundationName, setFoundationName] = useState("")
  const { newUser, setNewUser } = useGlobalContext();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const notify = (text) => toast(text);

  const login = async (e) => {
    e.preventDefault();
    if (validator.isEmail(loginEmail)) {
      try {
        const user = await axios.post("http://localhost:3030/orgs/login", {
          foundationName: foundationName,
          email: loginEmail,
          password: loginPassword,
        });

        const loginUser = {
          _id: user.data._id,
          email: user.data.email,
          fundation: user.data.fundation,
          token: user.data.token,
          isAuthenticated: true,
        };
        localStorage.setItem("newUser", JSON.stringify(loginUser));
        setNewUser(loginUser);
        console.log("newUser", newUser);
        navigate("/");
      } catch (error) {

        console.log(error.response);
      }
    } else {
      notify("Email invalido");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row content ">
          <div className="col-md-6 mb-">
            <img
              className="img-fluid"
              src="https://nupec.com/wp-content/uploads/2020/07/Captura-de-pantalla-2020-07-02-a-las-15.19.50.png"
            ></img>
          </div>
          <div className="col-md-6">
            <h3 className="signin-text mb-3">Log In</h3>
            <form>
            <div className="form-group">
                <input
                  className="form-control mt-3 mb-2"
                  type="fundacion"
                  name="text"
                  placeholder="Nombre de la fundacion"
                  onChange={(e) => setFoundationName(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-3 mb-2">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <input
                  className="form-control mt-3 mb-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></input>
              </div>
              <button onClick={login} className="btn btn-class">
                Login
              </button>
              <p className="mt-2">
                ??No ten??s cuenta?&nbsp;
                <a href="/register">Crear cuenta</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
