
import Banner from "../../components/Banner/Banner";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { combine, persistedReducer, store } from "../../redux/store";
import { reSetCart, startCart } from "../../redux/slice/cartSlice";
import { setLogoutAction } from "../../redux/slice/accountSlice";
import axios from "axios";
const Home = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const [isStartCart, setStartCart] = useState(false)

  const dispatch = useDispatch();
  const isAuthenticated = store.getState().account.isAuthenticated;

  useEffect(() => {
    store.dispatch(reSetCart());
    if (!localStorage.getItem('access_token')) {
      const action = () => {
        return dispatch => {
          // store.dispatch(reSetCart());
          dispatch(setLogoutAction());
          dispatch(reSetCart());
        }
      }
      action();
    } else {
      const fetchCart = async() => {
        if(store.getState().cartReducer.cart.length===0) {
          try {
            const response = await axios.get(`http://localhost:6969/carts/cartByCustomer/${store.getState().account.user.id}`);
            console.log(response);
            if (response.data.statusCode === 200) {
              console.log('response.data.data: ',response.data.data)
              // setItemCart(response.data.data);
              let item = response.data.data;
              // store.dispatch(startCart(itemCart));
              console.log('item cart: ',item);
              store.dispatch(startCart(item));
              setStartCart(!isStartCart);
              console.log('ísStartcart: ',isStartCart);
            } else {
              console.error('Error fetching data:');
            }
          } catch (error) {
            console.log('axios error: ', error);
          }
        }
        
      }
      fetchCart();
    }
  },[])
  // useEffect(() => {
  //   if(!localStorage.getItem('access_token')) {
  //     dispatch(setLogoutAction({}));
  //   }
  // })
  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* <BannerBottom /> */}
      {/* <div className="max-w-container mx-auto px-4">
        <Sale />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div> */}
    </div>
  );
};

export default Home;
