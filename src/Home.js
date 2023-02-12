
import React,{useState} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function Home(){

    // const navigate=useNavigate();
    return(
        <div>
            <h1> Welcome to short url </h1>
         <h3> This site will genertate short url for you.</h3> 
         <img src="https://miro.medium.com/max/566/1*j3xVt5zsYuAB19-QATkk_w.png"></img>
             
        </div>
    )
}