"use client";

import FormLayout from '@/app/layouts/form-layout';
import { AppDispatch, RootState } from '@/store';
import { login } from '@/store/authSlice';
import { PATHS } from '@/constants/paths';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [email, password]); 

  const onLogin = async () => {
    dispatch(login({ email, password }));

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      router.push(PATHS.HOME);
    } 
  };

  return (
    <FormLayout title="Welcome again!!!">
      <form 
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }} 
        className="w-full max-w-md mx-auto space-y-6"
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Email</legend>
          <input 
            className="input validator w-full" 
            type="email" 
            required 
            placeholder="email@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="validator-hint">Enter valid email address</div>
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Password</legend>
          <input 
            type="password" 
            className="input validator w-full" 
            required 
            placeholder="Password" 
            minLength={8} 
            title="Must be more than 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="validator-hint">
            Must be more than 8 characters.
          </div>
        </fieldset>

        <button type="submit" 

          className="btn btn-primary w-full"
         disabled={authState.loading || !formValid}>
        {authState.loading ? "Loading..." : "Login"}
      </button>
      {authState.error && <p style={{ color: "red" }}>{authState.error}</p>}
      </form>
    </FormLayout>
  );
}
