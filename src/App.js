import React, { useState } from "react";
import { indianStates } from "./utils";
import "./App.css";

function App() {
  const NumberValidate = /^(\+91)?[\s-]?[0-9]\d{9}$/;
  const NameValidate = /^[a-zA-Z]+([_\s]?[a-zA-Z]+)*$/;
  const EmailValidate = /^[a-zA-Z]+([._0-9]+)?[@][a-z]+[.][a-z]{2,3}$/;
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [country, setCountry] = useState("");
  const [statte, setStatte] = useState("");
  const [district, setDistrict] = useState("");
  const [errName, setErrName] = useState("");
  const [errNumber, setErrNumber] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errSubmit, setErrSubmit] = useState("");
  const [submitValue, setSubmitValue] = useState(false);
  const onchangeHandler = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "number") {
      setNumber(e.target.value);
    } else {
      setEmail(e.target.value);
    }

    validateForm(e.target.name);
  };
  const validateForm = (name) => {
    let isValid = false;
    if (name === "name") {
      isValid = validateName();
    } else if (name === "number") {
      isValid = validateNumber();
    } else {
      isValid = validateEmail();
    }
    return isValid;
  };
  const validateName = () => {
    const value = name;
    if (value.trim() === "") setErrName("name can't be empty");
    else if (!NameValidate.test(value.trim())) {
      setErrName("Invalid Name");
    } else {
      setErrName("");
    }
    return errName === "";
  };
  const validateNumber = () => {
    const value = number;
    if (value.trim() === "") setErrNumber("Number can't be empty");
    else if (!NumberValidate.test(value.trim())) {
      setErrNumber("Invalid Number");
    } else {
      setErrNumber("");
    }
    return errNumber === "";
  };
  const validateEmail = () => {
    const value = email;
    if (value.trim() === "") setErrEmail("Email can't be empty");
    else if (!EmailValidate.test(value.trim())) {
      setErrEmail("Invalid Email");
    } else {
      setErrEmail("");
    }
    return errEmail === "";
  };
  const onblurHandler = (e) => {
    let { name } = e.target;
    validateForm(name);
    console.log(name);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let formfield = ["name", "number", "email"];
    let isValid = "true";
    formfield.forEach((field) => {
      isValid = validateForm(field) && isValid;
    });
    if (country === "" || statte === "" || district === "") {
      setErrSubmit("Please fill out all fields before submitting");
    }
    if (isValid && country && statte && district) {
      setSubmitValue(true);
      setErrSubmit("");
    } else setSubmitValue(false);
  };
  const countryHandle = (e) => {
    setCountry(e.target.value);
    console.log(e.target.value);
    const newStates = [];
    if (e.target.value === "INDIA") {
      for (const state in indianStates) {
        newStates.push(`${state}`);
      }
      setStates(newStates);
    } else {
      setStates([]);
      setDistricts([]);
    }
  };
  const stateHandle = (e) => {
    setStatte(e.target.value);
    if (e.target.value === "--select state") {
      setDistricts([]);
    }
    let val = e.target.value;
    let newdistricts = indianStates[val];
    setDistricts(newdistricts);
  };
  const districtHandle = (e) => {
    setDistrict(e.target.value);
  };
  return (
    <div>
      {submitValue ? (
        <div>
          <div> Name:{name}</div>
          <div> phone Number:{number}</div>
          <div>Email:{email}</div>
          <div>Country:{country}</div>
          <div>State:{statte}</div>
          <div>District:{district}</div>
        </div>
      ) : (
        <form className="app" onSubmit={submitHandler}>
          {errSubmit && <p>{errSubmit}</p>}
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={onchangeHandler}
              onBlur={onblurHandler}
              required="true"
              // autoComplete="off"
            />
          </label>
          {errName && <p>{errName}</p>}
          <label>
            Mobile:
            <input
              type="text"
              name="number"
              value={number}
              onChange={onchangeHandler}
              onBlur={onblurHandler}
              required="true"
              // autoComplete="off"
            />
          </label>
          {errNumber && <p>{errNumber}</p>}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={onchangeHandler}
              onBlur={onblurHandler}
              required="true"
              // autoComplete="off"
            />
          </label>
          {errEmail && <p>{errEmail}</p>}

          <select id="country" onChange={countryHandle}>
            <option value="--select country">--select country--</option>
            <option value="INDIA">INDIA</option>
          </select>
          <select id="state" onChange={stateHandle}>
            <option value="--select state">--select state--</option>
            {states &&
              states.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
          </select>
          <select id="district" onChange={districtHandle}>
            <option value="--select district">--select district--</option>
            {districts &&
              districts.map((district) => {
                return (
                  <option key={district} value={district}>
                    {district}
                  </option>
                );
              })}
          </select>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
