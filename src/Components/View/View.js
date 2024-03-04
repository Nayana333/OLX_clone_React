import React,{ useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { fireEvent } from '@testing-library/react';
import { FirebaseContext } from '../../store/Context';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails ? postDetails.url : 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg' }
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails ? postDetails.price : ''}</p>
          <span>{postDetails ? postDetails.name : 'Sorry'}</span>
          <p>{postDetails ? postDetails.category : ''}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
