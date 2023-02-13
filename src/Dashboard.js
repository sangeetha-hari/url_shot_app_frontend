import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { API } from "./global";




export default function Dashboard(){
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