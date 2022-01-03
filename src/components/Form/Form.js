import React from "react";
import { useReducer } from "react";
import "./form.css";

const initialFormState = {
  emailValue: "",
  emailValid: null,
  passwordValue: "",
  passwordValid: null,
  formValid: null,
};

const validatePassword = (value)=>{
    return value.length > 3 ? true : false;
}

const validateEmail = (value)=>{
    return value.includes("@") ? true : false;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL-INPUT":
      return {
        ...state,
        formValid:false,
        emailValue: action.emailValue,
        emailValid: validateEmail(action.emailValue),
      };

    case "EMAIL-INPUT-BLUR":
      return {
        ...state,
        formValid:false,
        emailValid: validateEmail(state.emailValue),
      };
    case "PASSWORD-INPUT":
      return {
        ...state,
        formValid:false,
        passwordValue: action.passwordValue.trim(),
        passwordValid: validatePassword(action.passwordValue.trim()),
      };
    case "PASSWORD-INPUT-BLUR":
      return {
        ...state,
        formValid:false,
        passwordValid: validatePassword(state.passwordValue),
      };

    case "FORM-IS-VALID":
      if (state.passwordValid && state.emailValid) {
        return {
          ...state,
          formValid: true,
        };
      }
      return {
        ...state,
        emailValid: validateEmail(state.emailValue),
        passwordValid: validatePassword(state.passwordValue),
        formValid: false,
      };

    default:
      return state;
  }
};

const Form = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "FORM-IS-VALID" });
  };

  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const emailBlur = () => {
    dispatch({ type: "EMAIL-INPUT-BLUR" });
  };
  const emailChangeHandler = (e) => {
    dispatch({ type: "EMAIL-INPUT", emailValue: e.target.value });
  };

  const passwordBlur = () => {
    dispatch({ type: "PASSWORD-INPUT-BLUR" });
  };

  const passwordChangeHandler = (e) => {
    dispatch({ type: "PASSWORD-INPUT", passwordValue: e.target.value });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {formState.formValid === true && (
        <header>Form is OK. Thanks for login !</header>
      )}
      <div className="email_container">
        <label>Email</label>
        <input
          type="text"
          value={formState.emailValue}
          onBlur={emailBlur}
          onChange={emailChangeHandler}
          className={formState.emailValid === false ? 'red-border':''}
        />
        {formState.emailValid === false && (
          <div className="error">Email is not correct.</div>
        )}
      </div>
      <div className="password_container">
        <label>Password</label>
        <input
          type="text"
          value={formState.passwordValue}
          onBlur={passwordBlur}
          onChange={passwordChangeHandler}
          className={formState.passwordValid === false ? 'red-border':''}
        />
        {formState.passwordValid === false && (
          <div className="error">Password should be at least 4 digits.</div>
        )}
      </div>
      <div className="submit_container">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
