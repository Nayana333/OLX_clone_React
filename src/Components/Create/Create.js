import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {
  const { Firebase, auth, db, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');

  const handleSubmit = async () => {

    setNameError('');
    setCategoryError('');
    setPriceError('');

    let isError = false;

  
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Name should contain only letters');
      isError = true;
    }


    if (!/^[a-zA-Z\s]+$/.test(category)) {
      setCategoryError('Category should contain only letters');
      isError = true;
    }

   
    if (isNaN(price) || price === '') {
      setPriceError('Price should be a number');
      isError = true;
    }

   
    if (isError) {
      return; 
    }

   
    console.log(image);
    const storageRef = ref(storage, 'images/' + image.name);
    console.log(storageRef);
    uploadBytes(storageRef, image).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef);
      console.log(url);

      const doc = {
        name: name,
        category: category,
        price: price + '',
        url: url,
        createdAt: new Date().toLocaleDateString()
      };
      const setDoc = await addDoc(collection(db, 'products'), doc);
      console.log(setDoc);
      navigate('/');
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          onChange={(e) => {
            setName(e.target.value);
            setNameError(''); 
          }}
          name="Name"
          value={name}
        />
        <span className="error">{nameError}</span>
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          onChange={(e) => {
            setCategory(e.target.value);
            setCategoryError(''); 
          }}
          name="category"
          value={category}
        />
        <span className="error">{categoryError}</span>
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="fname"
          name="Price"
          onChange={(e) => {
            setPrice(e.target.value);
            setPriceError(''); 
          }}
          value={price}
        />
        <span className="error">{priceError}</span>
        <br />

        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
        <br />
        <input type="file" onChange={(e) => {
          setImage(e.target.files[0]);
        }} />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
