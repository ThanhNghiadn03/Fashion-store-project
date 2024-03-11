import React from "react";
import { addToCart } from "../../../redux/orebiSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { store } from "../../../redux/store";
import { setCart } from "../../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.account.user);
  const isAuthenticated = store.getState().account.isAuthenticated;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <button
        onClick={
          async () => {
            if (!isAuthenticated) {
              navigate('/')
              return;
            }
            
            let isExist = false;
            let cart = store.getState().cartReducer.cart;
            for (let i = 0; i < cart.length; i++) {
              console.log('cart[i].idProducts: ', cart[i].idProducts);
              console.log('productInfo._id: ',productInfo._id);
              if (productInfo._id === cart[i].idProducts) {
                isExist = true;
                break;
              }
            }
            if (isExist) {
              console.log('update số lượng');
              await axios.patch(`http://localhost:6969/carts/${productInfo._id}/${customer.id}`, {
                quantity: productInfo.quantity+1, 
                price: productInfo.price * (productInfo.quantity+1),
                productName: productInfo.productName,
                img: productInfo.img,
              });
            } else {
              await axios.post('http://localhost:6969/carts/create', {
                idCustomers: customer.id,
                idProduct: productInfo._id,
                quantity: 1,
                price: productInfo.price,
                nameProduct: productInfo.productName,
                imageProduct: productInfo.img
              });
            }

            dispatch(setCart({
              idProducts : productInfo._id,
              quantity: 1,
              price: productInfo.price,
              productName: productInfo.productName,
              img: productInfo.img,
            }))
          }
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      {/* <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p> */}
    </div>
  );
};

export default ProductInfo;
