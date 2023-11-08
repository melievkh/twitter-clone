import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

import ROUTES from "router/routes";
import useAuth from "hooks/useAuth";
import { getUserError } from "api/store/selectors";
import { IRegisterProps } from "types";
import styles from "../style";
import { userActions } from "api/store/reducers/slices/userSlice";
import { useAppDispatch } from "api/store";
import { AsyncThunks } from "api/store/action";

const SignUp = () => {
  const initialValues: IRegisterProps = {
    username: "",
    fullname: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { username, fullname, email, password } = formValues;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useSelector(getUserError);
  console.log(authError);

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(AsyncThunks.registerUser(formValues));

      if (!authError) {
        toast.success("registered successfully!");
        navigate(ROUTES.LOGIN);
      }
      return toast.error(authError?.message);
    } catch (error: any) {
      toast.error(error.message);
      dispatch(userActions.clearError());
    }
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.formWraper} onSubmit={handleRegister}>
        <h1 className='text-2xl font-bold'>Welcome</h1>
        <FaTwitter size={28} color='blue' />
        <input
          type='text'
          placeholder='Username'
          className={styles.input}
          name='username'
          value={username}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Fullname'
          className={styles.input}
          name='fullname'
          value={fullname}
          onChange={handleChange}
        />
        <input
          type='email'
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
