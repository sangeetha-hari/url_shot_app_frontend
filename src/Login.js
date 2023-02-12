import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { API } from "./global";


const formvali=Yup.object({
    email:Yup.string().email("Enter correct email"),
    password:Yup.string().min(5).max(15).required("Enter password")   
})



export default function Login() {
  const [done,setDone]=useState("");
    const {values,errors,handleBlur,handleChange,handleSubmit}= useFormik({
        initialValues:{email:"", password:""},
        validationSchema:formvali,
        onSubmit:(values)=>{
            console.log(values.email);
            const userdetail={
                "email":values.email,
                "password":values.password
            };
            console.log(userdetail);

            try {
                axios.post(`${API}/users/login`,userdetail, {
                    headers: {
                        // 'authorization': your_token,
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response => {

                   //setting state (Redux's Style)
                  sessionStorage.setItem('jwttoken', response.data.jwttoken); //saving token
                  console.log(response.data.jwttoken)//pushes back the user after storing token
                  setDone(response.data.message);
              })
            } catch (error) {
              setDone(error);
              

                
            }


        }
    })

  const navigate = useNavigate();
  return (
    <div>
      <h1>User Login</h1>
       
      {/* <form>
            <div className="inputbox">
                <label> Enter username/Email: </label>
               <input type="email" name="lname"  />
            </div>
            <div className="inputbox">
                <label> Enter Password: </label>
               <input type="password" name="lname"/>
            </div>
            
            <div>
             <Button variant="contained" type="submit" onSubmit={()=>navigate("/resetauth")}>Login</Button>

        </div>

        <TextField name=""/>
        </form> */}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email:"
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
          <Button type="submit" variant="contained">
            {" "}
            Submit
          </Button>
        </div>
      </form>
      <p><a href="/forgot_password">Forgot password?</a></p>
      <p><a href="/register">Do you want to Register?</a></p>
      <h1>{done}</h1>
      
    </div>
  );
}
