import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { useDispatch } from "react-redux";
import { combine, persistedReducer, store } from "../../redux/store";
import { reSetCart, startCart } from "../../redux/slice/cartSlice";
import { setLogoutAction } from "../../redux/slice/accountSlice";
import axios from "axios";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const [isStartCart, setStartCart] = useState(false)

  const dispatch = useDispatch();
  const isAuthenticated = store.getState().account.isAuthenticated;

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      const action = () => {
        return dispatch => {
          // store.dispatch(reSetCart());
          dispatch(setLogoutAction());
          dispatch(reSetCart());
        }
      }
      action();
      // }
    } else {
      const fetchCart = async() => {
        if(store.getState().cartReducer.cart.length === 0) {
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
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
