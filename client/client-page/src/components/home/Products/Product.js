import React, { useEffect } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import axios from "axios";
import { addToCart } from "../../../redux/orebiSlice";
import { store } from "../../../redux/store";
import { setCart } from "../../../redux/slice/cartSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  
  const customer = useSelector((state) => state.account.user);
  const isAuthenticated = store.getState().account.isAuthenticated;
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  
  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={async() => {
                if(isAuthenticated === false) {
                  navigate('/');
                  return;
                }
                let isExist = false;
                let index = 0;
                let cart = store.getState().cartReducer.cart;
                for(let i=0; i<cart.length; i++) {
                  console.log('cart[i].idProducts: ', cart[i].idProducts);
                  console.log('props._id: ',props._id);
                  if(props._id === cart[i].idProducts) {
                    isExist = true;
                    index = i;
                    break;
                  }
                }
                if(isExist) {
                  await axios.patch(`http://localhost:6969/carts/${props._id}/${customer.id}`, {
                    quantity: store.getState().cartReducer.cart[index].quantity +1, 
                    price: props.price * (store.getState().cartReducer.cart[index].quantity+1)});
                } else {
                  await axios.post('http://localhost:6969/carts/create', {
                      idCustomers: customer.id,
                      idProduct: props._id,
                      quantity: 1,
                      price: props.price
                    });
                    console.log('customer: ',customer);
                    console.log('props: ',props);
                }
                dispatch(setCart({
                  idProducts : props._id,
                  quantity: 1,
                  price: props.price
                }))
                
                
              }
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
