import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { API } from "./global";

const formvali = Yup.object({
  fname: Yup.string("Enter Only string").min(3).max(30).required("Enter First name"),
  lname: Yup.string("Enter Only string").min(3).max(30),
  email: Yup.string().email("Enter correct email"),
  password: Yup.string().min(5).max(15).required("Enter password"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

export default function Register() {
  const navigate = useNavigate();
  const [done,setDone]= useState();
  // const [email, setEmail]=useState("");
  // const [fname,setFname]=useState("");
  // const [lname,setLname]=useState("");
  // const [password, setPassword]= useState("");
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: formvali,
    onSubmit:async (values) => {
      console.log(values.fname);
      const userdetail = {
        username: values.fname,
        email: values.email,
        password: values.password,
      };
      console.log(userdetail);

      try {
        const res= await axios.post(`${API}/users/register`, userdetail, {
          headers: {
            // 'authorization': your_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response)=>{
          console.log("registration section");
          navigate("/checkmail")
        })
      } catch (error) {
        setDone("Something went wrong. Please try again!!!")

      }
    },
  });
//   function sendemail() {
//     console.log("This is send email function");
//     const topost = { email: email };
//     fetch(`https://forgor-reset.onrender.com/api/users/forgot_password`, {
//       method: "POST",
//       body: JSON.stringify(topost),
//       header: { "content-Type": "application/json" },
//     })
//       .then((data) => {
//         data.json();
//       })
//       .then((res) => console.log(res));
//   }

  

  return (
    <div>
     <h1>Register yourself</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            type="text"
            id="fname"
            name="fname"
            placeholder="First Name:"
            value={values.fname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="error_message">{errors.fname}</p>
        </div>

        <div>
          <TextField
            required
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name:"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="error_message">{errors.lname}</p>
        </div>

        <div>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder="Email:"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.email}</p>
        </div>
        

        <div>
          <TextField
            type="password"
            id="password"
            name="password"
            placeholder="Password:"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="error_message">{errors.password}</p>
        </div>
        <div>
          <TextField
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="confirm Password:"
            value={values.confirmpassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="error_message">{errors.confirmpassword}</p>
        </div>
        <div>
          <Button type="submit" variant="contained">
            {" "}
            Submit
          </Button>
        </div>
      </form>
      <p><a href="/login"> Do you want to Login?</a></p>
      <p><a href="/forgot_password">Forgot password?</a></p>
    </div>
  );
}
