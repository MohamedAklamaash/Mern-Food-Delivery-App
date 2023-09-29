import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useDispatchCart, useCart } from "./ContextReducer";
import Card from "react-bootstrap/Card";
const CardComponent = (props) => {
  let dispatch = useDispatchCart();
  let options = props.options;
  let data = useCart();
  const priceOptions = Object.keys(options);
  const fooditem = props.fooditems;
  const [qnty, setqnty] = useState(1);
  const [size, setsize] = useState("");
  const HandleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id == fooditem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      console.log("food is",food);
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: fooditem._id,
          price: finalPrice,
          qnty
        });
        return;
      }
      if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: fooditem._id,
          name: fooditem.name,
          price: finalPrice,
          qnty,
          size: size,
        });
        return;
      }
    }
    //This will work if it doesn't enter into the for loop;
    await dispatch({
      type: "ADD",
      id: fooditem._id,
      name: fooditem.name,
      price: finalPrice,
      qnty,
      size: size,
    });
    console.log(data);
  };
  const refPrice = useRef();
  let finalPrice = qnty * Number(options[size]);
  useEffect(() => {
    setsize(refPrice.current.value);
  }, []);
  return (
    <div>
      <Card className="mt-3 " style={{ width: "18rem", maxHeight: "360px" }}>
        <Card.Img
          variant="top"
          src={fooditem.img}
          style={{ width: "299x", height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{fooditem.name}</Card.Title>
          <Card.Text>{}</Card.Text>
          <Container>
            <select
              className="m-2 h-100 p-10 bg-success "
              onChange={(event) => setqnty(event.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              ref={refPrice}
              className="m-2 h-100  bg-success"
              onChange={(event) => setsize(event.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 ">Total Price:{finalPrice}</div>
            <hr />
            <Button
              className="btn btn-success justify-center ms-2"
              onClick={HandleAddToCart}
            >
              Add To Cart
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
