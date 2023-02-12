import React,{useState} from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { API } from "./global";
// import { sigupSchema } from "./schemas";
const formvali=Yup.object({
    name:Yup.string("Enter Only string").min(3).max(30).required("Enter name"),
    email:Yup.string().email("Enter correct email"),
    strseq:Yup.string().required("Please enter the sequence sent to email"),
    newpassword:Yup.string().min(5).max(15).required("Enter password"),
    confirmpassword:Yup.string().oneOf([Yup.ref("newpassword"),null],"Password must match")
})

export default function Resetpass()
{
    const {values,errors,handleBlur,handleChange,handleSubmit}= useFormik({
        initialValues:{name:"", email:"", strseq:"", newpassword:"", confirmpassword:""},
        validationSchema:formvali,
        onSubmit:(values)=>{
            console.log(values.name);
            const userdetail={
                "username":values.name,
                "email":values.email,
                "token":values.strseq,
                "newpassword":values.newpassword
            };
            console.log(userdetail);

            try {
                axios.post(`${API}/users/reset_password`,userdetail, {
                    headers: {
                        // 'authorization': your_token,
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            } catch (error) {
                
            }


        }
    })
    
    
    return(
        <div>
            <h1>
                This is Password reset page
            </h1>

            {/* this is form */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div> 
                       
                        <TextField required type= "text" id="name" name="name" placeholder="Name:" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="error_message">{errors.name}</p>
                    </div>
                    <div>
                    <TextField type= "email" id="email" name="email" placeholder="Email:" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    <p>{errors.email}</p>
                    </div>
                    <div>
                    <TextField type= "text" id="strseq" name="strseq" placeholder="Enter the sequence:" value={values.strseq} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="error_message">{errors.strseq}</p>
                    </div>
                    
                    <div>
                    <TextField type= "password"id="newpassword" name="newpassword" placeholder="New Password:" value={values.newpassword} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="error_message">{errors.newpassword}</p>
                    </div>
                    <div>
                    <TextField type= "password" id="confirmpassword" name="confirmpassword" placeholder="confirm Password:" value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="error_message">{errors.confirmpassword}</p>
                    </div>
                    <div>
                    <Button type="submit" variant="contained"> Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}