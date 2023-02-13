import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { API } from "./global";


const formvali = Yup.object({
  url: Yup.string()
  .matches(
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
      'Enter correct url!'
  )
  .required('Please enter website')
  
});

export default function Shorturl(){

  const [done,setDone]=useState("");


  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      url: "",  
    },
    validationSchema: formvali,
    onSubmit: (values) => {
      console.log(values.url);
      const url = {
        fullurl: values.url
      };
      console.log(url);

      try {
        axios.post(`${API}/shorturl`, url, {
          headers: {
            'x-auth-token': sessionStorage.getItem("jwttoken"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((res)=>{console.log(res);setDone(res)})
      } catch (error) {
        console.log(error);
        setDone(error);
      }
    },
  });
    
    

    return(
        <div>
          <h2>Create a short url</h2>
            <form onSubmit={handleSubmit}>
            <div>
          <TextField
            required
            type="url"
            id="url"
            name="url"
            placeholder="Enter full url:"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="error_message">{errors.url}</p>
          
        </div>

            <div>
          <Button type="submit" variant="contained">
            {" "}
            Submit
          </Button>
        </div>
            </form>
            <h2>{done}</h2>



        </div>
    )
};