/** @format */

import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import axios from "axios";
import { MyContext } from "../../Container";

export default function Login(props) {
  const { setIsLogin, setUser, user, reset } = useContext(MyContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state);
      setFormData({
        email: props.location.state.email,
        password: props.location.state.password,
      });
    }
    if (user && user.role) {
      user.role === "Manager"
        ? props.history.push({ pathname: "/mpage" })
        : props.history.push({ pathname: "/tpage" });
    }
  }, [user]);

  const submitForm = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3001/users/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formData,
    })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
          setIsLogin(true);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          console.log(response);
        }
      })
      .catch((err) =>
        err.response.status == 401 ? reset() : console.log(err)
      );
  };

  return (
    <div className={styles.fcontainer}>
      <form className={styles.loginContainer} onSubmit={submitForm}>
        <div className='reg'>Login to Account!</div>

        <div className={styles.loginBox}>
          <div className='inputBox'>
            <label className='details'>E-mail</label>
            <br />
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className='inputBox'>
            <label className='details'>Password</label>
            <br />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <br />
          <div className={styles.btnContainer}>
            <button type='submit' value='Login' className='next'>
              Login
            </button>
            <Link to='/'>
              <button className='cancel'>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
