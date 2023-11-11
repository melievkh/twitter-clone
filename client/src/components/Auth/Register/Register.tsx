import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";

import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";
import { IRegisterProps } from "types";
import styles from "../style";

const SignUp = () => {
  const initialValues: IRegisterProps = {
    username: "",
    fullname: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { username, fullname, email, password } = formValues;
  const { registerUser } = useAuth();

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    registerUser(formValues);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formWraper} onSubmit={handleRegister}>
        <h1 className='text-2xl font-bold'>Welcome!</h1>
        <FaTwitter size={28} color='blue' />
        <input
          type='text'
          placeholder='Username'
          className={styles.input}
          name='username'
          value={username}
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Fullname'
          className={styles.input}
          name='fullname'
          value={fullname}
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='Email'
          className={styles.input}
          name='email'
          value={email}
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          name='password'
          value={password}
          onChange={handleChange}
          autoComplete='off'
        />
        <button className={styles.formButton}>Sign Up</button>

        <p className='text-xs mt-4'>
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className='border-b border-b-[#444444]'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
