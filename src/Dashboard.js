import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function Dashboard(){

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
            // 'authorization': your_token,
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
    
    const [recurl,setRecurl]=useState([]);
    useEffect(()=>{
        axios.get(`${API}/shorturl/dashboard`,{ responseType: "json"})
        .then((res)=>{
             console.log(res.data[0]); 
             res.data.forEach(element => {recurl.push(element);
                console.log(element);
                
             });
            // recurl.push((res.data));

            // const result= Object.entries(res.data).forEach((ele)=>{recurl.push(ele)});
            setRecurl(res.data);
            // result.forEach((ele)=>{console.log("this is element",ele)});
             console.log(recurl);
            // console.log("This is result", result)
        });    
    },[]);

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

            <h1>{done}</h1>
         <h1>Welcome to Dashboard</h1> 

         {/* this is for table   */}
         <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Full URL</TableCell>
            <TableCell align="center" noWrap="false">Short URL</TableCell>
            <TableCell align="right">Created on</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {recurl.map((row) => (
            <TableRow
              key={row.shorturl}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="table" noWrap="false">
                {row.fullurl}
              </TableCell>
              <TableCell align="right" noWrap="false">https://url-shortern.onrender.com/shorturl/{row.shorturl}</TableCell>
              <TableCell align="right" noWrap="false">{row.date}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         


        </div>
    )
};