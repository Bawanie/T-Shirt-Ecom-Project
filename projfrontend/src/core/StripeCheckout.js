/* eslint-disable react-hooks/rules-of-hooks */
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { isauthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import{createOrder} from "./helper/orderHelper"

const stripeCheckout=({
    products,
    setReload=f=>f,
    reload=undefined
})=> {
    const [data,setData]=useState({
        loading:false,
        sucess:false,
        error:"",
        address:""
    });

const token=isauthenticated() && isauthenticated().token
const userId=isauthenticated() && isauthenticated().token

const getFinalAmount=()=>{
   let amount=0;
   products.map(p=>{
     amount= amount+p.price
   })
   return amount;
};
 

const makePayment=(token)=>{
const body={
    token,
    products
}
const headers={
    "Content-Type":"application/json"
}

return fetch(`${API}/stripepayment`,{
    method:"POST",
    headers,
    body:JSON.stringify(body)
}).then(response=>{
   console.log(response)
   const {status}=response;
   console.log("STATUS" ,status)
   cartEmpty(()=>{
    console.log("did We crash")
  }) 


  //TODO: empty the cart
  //TODO: force reload
  setReload(!reload)
   
}).catch(error=>console.log(error))
}


const showStripeButton=()=>{
    return isauthenticated() ? (
        <StripeCheckoutButton
        stripeKey="pk_test_51Qa7htBp4x2OdtuR5bWS3mHXHjkcKg8ng5Uw81NCpNSVFjvlrB7s048ZaCdmi1i2D8QlNfA0Cg6qD6iduCXkdf0F00ZlbGWcEg"
        currency="USD"
        token={makePayment}
        amount={getFinalAmount()*100}
        name="Buy T-shirts"
        shippingAddress
        billingAddress
        >
         <button className='btn btn-success'>Pay with Stripe</button>

        </StripeCheckoutButton>
         
    ):(
        <Link to="/signin">
            <button className="btn btn-warning">sign in</button>
        </Link>
    )
}


  return (
    <div>
        <h3 className='text-white'>Stripe Checkout{getFinalAmount()}</h3>
        {showStripeButton()}
    </div>
  )
}

export default stripeCheckout