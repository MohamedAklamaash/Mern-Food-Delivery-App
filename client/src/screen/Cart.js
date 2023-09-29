import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Trashpng from "../assets/Trash.png";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-3 text-center fs-3">
            <h1 style={{textAlign:"center",fontWeight:"bolder",fontSize:"100px",margin:"80px auto"}} >
              Your cart is empty!{" "}
            </h1>
        </div>
      </div>
    );
  }
  const handleCheckout=async(req,res)=>{
      let userEmail = localStorage.getItem("UserEmail");
      let response = await fetch("http://localhost:5000/api/orders",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          order_data : data,
          email:userEmail,
          order_date:new Date().toDateString()
        })
      });
      console.log("Order response:",response.json());
      if(response.status===200)
      {
          dispatch({type:"DROP"})
      }
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={Trashpng}
                      style={{ width: "2rem", height: "2rem" }}
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-5"
            onClick={handleCheckout}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
