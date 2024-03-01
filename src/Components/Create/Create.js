import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';

const Create = () => {
  const[name,setName]=useState('')
  const[category,setCategory]=useState('')
  const[price,setPrice]=useState('')
  const[image,setImage]=useState(null)
  const handleSubmit=()=>{
    
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{
                setName(e.target.value)
              }}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e)=>{
              setPrice(e.target.price)
            }} />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):'' }></img>
          
            <br />
            <input type="file" onChange={(e)=>{
                setImage(e.target.files[0])
            }}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
