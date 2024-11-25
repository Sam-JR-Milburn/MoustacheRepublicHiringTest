"use client" // So that the API call works.

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import '../../styles/product.css'; // Alignment

// This should probably be more dynamic, like taking the data from the API call.
function AddCartSection(props){
  var productid = props.productid;
  function HandleButton(event){
    event.preventDefault();
    // Handle Cart JS here.
    var size = document.getElementById("sizes").value;
    console.log("Size: "+size); // I work!

    var req = new XMLHttpRequest();
    req.open('POST', '/cart'); // POST to cart.
    req.setRequestHeader("Content-Type", "application/json");
    // Need to implement a Cart POST handler in cart/page.js.
    req.send(JSON.stringify({ "size": {size}, "productid": AddCartSection.productid }));

  }
  function HandleSubmit(event){ event.preventDefault(); }

  return (
    <form id="purchaseitem" method="post" action="/cart"
      onSubmit={HandleSubmit} onClick={HandleButton}>
      <select name="sizes" id="sizes">
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <button>Add To Cart</button>
    </form>
  );
}

// Looks like it doesn't need to be dynamic([].js) right now.
export default function ProductPage(){
  const [data, setData] = useState(null);
  // Grab state page-wide for the product with an API GET request.
  function GetProductInformation(){
    // Make a GET Request for the product.
    var req = new XMLHttpRequest();
    req.open('GET', 'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
    req.onload = function(){
      if(req.status == 200){ setData(JSON.parse(req.responseText)); }
      else {} // Server error should be sent back, later.
    };
    req.send();
  }

  // Grab product information on page load.
  useEffect(() => {
    let ignoreRequest = false;
    if(!ignoreRequest){
      GetProductInformation();
    }
    return() => { ignoreRequest = true; } // Doesn't run every re-render.
  });



  // Render the page.
  return (
    <>
      <body>
        <h1>{data ? data.title : "Product Title"}</h1>
        <div className="productinfo">
          <div className="productsquare">
            <Image width={300} height={400}
              src={data ? data.imageURL : "/MoustacheRepublic.png"}
              alt={data ? data.title : "Product Title" }></Image>
          </div>
          <div className="productsquare">
            <p>{data ? data.description : "Product Description"}</p>
            <p>Price: {data ? data.price : "Product Price"}</p>
            <AddCartSection productid={data ? data.id : -1}/>
          </div>
        </div>
      </body>
    </>
  );
}
