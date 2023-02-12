import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {API} from "./global"

const formvalidation=Yup.object({
  email:Yup.string().email().required("Please Enter your emailID")
})

export default function Forgot_password() {
const [done, setDone]=useState("");

  const {values,errors,handleBlur, handleChange,handleSubmit}= useFormik({
    initialValues:{email:""},
    onSubmit:(values)=>{
      console.log(values.email)
      const sendemail={
        "email":values.email
      }
      console.log(sendemail);
      try {
        axios.post(`${API}/users/forgot_password`,sendemail, {
        headers: {
            // 'authorization': your_token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res)=>{console.log(res); setDone(res.data.message)})
      } catch (error) {
        console.log(error);
        setDone("Invalid Credentials");
      }

      
     
    }
  })
  return (
    <div>
      <h1>
                Forgot password
            </h1>
      <form onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained">
            {" "}
            Submit
          </Button>
        </div>
      </form>
      <p><a href="/login">Do you want to Login?</a></p>
      <p><a href="/register">Do you want to Register?</a></p>
    <h1>{done}</h1>

    </div>
  );
}
