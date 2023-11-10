import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";

import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";
import { ILoginProps } from "types";
import styles from "../style";

const Login = () => {
  const initialValues: ILoginProps = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const { email, password } = formValues;
  const { loginUser } = useAuth();

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    loginUser(formValues);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formWraper} onSubmit={handleLogin}>
        <h1 className='text-2xl font-bold'>Welcome back!</h1>
        <FaTwitter size={28} color='blue' />
        <input
          type='text'
          placeholder='Email'
          className={styles.input}
          name='email'
          value={email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          name='password'
          value={password}
          onChange={handleChange}
        />
        <button className={styles.formButton}>Login</button>

        <p className='text-xs mt-4'>
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER} className='border-b border-b-[#444444]'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
