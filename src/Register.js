

import React,{useState} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import API from './global';



export default function Register(){
    const [email, setEmail]=useState("");
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [password, setPassword]= useState("");

    function sendemail(){
        console.log("This is send email function");
        const topost={"email":email};
        fetch(`https://forgor-reset.onrender.com/api/users/forgot_password`,{
            method:"POST",
            body:JSON.stringify(topost),
            header:{ "content-Type":"application/json" }
        }).then((data)=>{data.json()})
        .then((res)=>console.log(res));
    }
    
   
    const navigate=useNavigate();

    return(
        <div>
            This is Register page
            <form onSubmit={()=>{navigate("/checkmail");
            sendemail();
        }}>
            <div className="inputbox">
                <label> Enter First name: </label>
               <input type="text" name="fname"  onChange={(e)=>{console.log(e.target.value);setFname(e.target.value)}} />
            </div>

            <div className="inputbox">
                <label> Enter Last name: </label>
               <input type="text" name="lname"  onChange={(e)=>{console.log(e.target.value);setLname(e.target.value)}} />
            </div>

            <div className="inputbox">
                <label> Enter Email: </label>
               <input type="email" name="email"  onChange={(e)=>{console.log(e.target.value);setEmail(e.target.value)}} />
            </div>
            <div className="inputbox">
                <label> Enter Password: </label>
               <input type="password" name="lname"/>
            </div>
            
            <div>
             <Button variant="contained" type="submit" >Login</Button>

        </div>

        </form>
            
        </div>
    )
}