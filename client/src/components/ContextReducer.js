import React, { useReducer, createContext, useContext } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action._id,
          name: action.name,
          qty: Number(action.qnty),
          size: String(action.size),
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index,1);
      return newArr;
    case "UPDATE":
      let arr=[...state];
      console.log("Arr is :",arr);
      arr.find((food,index)=>{
        if(food.id===action.id)
        {
            arr[index]={...food,qnty:parseInt(action.qnty)+food.qnty,price:action.price+food.price};
            console.log("The array is:",arr[index]);
        }
        return arr;
      })
      return arr;
    case "DROP":
      let emparray=[];
      return emparray;
    default:
      console.log("Error in Reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
