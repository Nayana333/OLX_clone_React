import React from 'react';
import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';


function Posts() {


const { Firebase, auth, db } = useContext(FirebaseContext)

const [products,setProducts]=useState([])
const {setPostDetails} = useContext(PostContext)
const navigate=useNavigate()

// useEffect(()=>{
//   // firebase.firestore().collection('products').get().then((snapshot)=>{
//   //   const allPost=snapshot.docs.map((product)=>{
//   //     return{
//   //       ...product.data(),
//   //      id: product.id
//   //     }
//   //   })

//     const getData = async () => {

//     }



//     // setProducts(allPost)
//   })
// },[])
const getData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(productsData);
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

useEffect(()=>{
  getData()
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { products && products.length > 0 && products.map(product=>{
            return <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          })
           }
        </div>
      </div>
   
    </div>
  );
}

export default Posts;
