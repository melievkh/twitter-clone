import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";
import { useAppDispatch } from "api/store";
import { getUserError } from "api/store/selectors";
import { userActions } from "api/store/reducers/slices/userSlice";
import { ILoginProps } from "types";
import styles from "../style";
import { AsyncThunks } from "api/store/action";

const Login = () => {
  const initialValues: ILoginProps = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { email, password } = formValues;
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useSelector(getUserError);

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(AsyncThunks.loginUser(formValues));
      if (!authError) {
        toast.success("Logged in successfully!");
        navigate(ROUTES.HOME);
      }
      toast.error(authError?.message);
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message);
      dispatch(userActions.clearError());
    }
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
