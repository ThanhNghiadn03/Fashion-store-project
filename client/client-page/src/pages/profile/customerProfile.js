import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import axios from "axios";
import { store } from "../../redux/store";

const CustomerProfile = () => {
//   const location = useLocation();
//   const [prevLocation, setPrevLocation] = useState("");
//   const [productInfo, setProductInfo] = useState([]);
const [items, setItems] = useState([]);
// const isAuthenticated = store.getState().account.isAuthenticated;
const isAuthenticated = store.getState().account.isAuthenticated;
const idCustomer = store.getState().account.user.id;

  useEffect(() => {
    const fetchData = async() => {
        if(isAuthenticated === false) {
            window.location.href = '/signin';
            return;
        }
        try {
            const response = await axios.get(`http://localhost:6969/customers/${idCustomer}`)
            console.log(response);
            if (response.data.statusCode === 200) {
              setItems(response.data.data.customer);
            } else {
              console.error('Error fetching data:', response);
            }

            // setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2>{items.fullName}</h2>
        <p>{items.email}</p>
        <p>{items.gender}</p>
        <p>{items.phoneNumber}</p>
      </div>
    </div>
  );
};

export default CustomerProfile;
