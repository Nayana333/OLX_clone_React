import React, { Fragment, useContext, useState } from 'react';// fragment is used to manage state   
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom'
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';


const Create = () => {
  const { Firebase, auth, db, storage } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const handleSubmit = async () => {
    console.log(image);
    const storageRef = ref(storage, 'images/' + image.name);
    console.log(storageRef);
    uploadBytes(storageRef, image).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef)
      console.log(url);

      const doc = {
        name: name,
        category: category,
        price: price + '',
        url: url,
        createdAt: new Date().toLocaleDateString()
      }
      const setDoc = await addDoc(collection(db, 'products'), doc)
      console.log(setDoc);
      navigate('/')
    });

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
            onChange={(e) => {
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
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" onChange={(e) => {
            setPrice(e.target.value)
          }} />
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

          <br />
          <input type="file" onChange={(e) => {
            setImage(e.target.files[0])
          }} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
