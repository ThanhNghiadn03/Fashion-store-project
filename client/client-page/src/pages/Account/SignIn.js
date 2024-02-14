import React, { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { s4mlogo } from "../../assets/images";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserLoginInfo } from "../../redux/slice/accountSlice";
import { Button, Divider, Form, Input, message, notification } from 'antd';

const SignIn = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //đã login => redirect to '/'
    if (localStorage.getItem('access_token')) {
      // navigate('/');
      window.location.href = '/';
    }
  }, [])

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    try {
      const res = await axios.post('http://localhost:6969/customers/login', { username, password });
      setIsSubmit(false);
      if (res?.data) {
        localStorage.setItem('access_token', res.data.access_token);
        dispatch(setUserLoginInfo(res.data.user))
        message.success('Đăng nhập tài khoản thành công!');
        window.location.href = '/';
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description:
            res.message && Array.isArray(res.message) ? res.message[0] : res.message,
          duration: 5
        })
        // console.log("Có lỗi xảy ra");
      }
    } catch (error) {
      console.log('Error sending data to API:', error);

    }
    // const res = await callLogin(username, password);

  };

  // ============= Initial State Start here =============
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // // ============= Initial State End here ===============
  // // ============= Error Msg Start here =================
  // const [errEmail, setErrEmail] = useState("");
  // const [errPassword, setErrPassword] = useState("");

  // // ============= Error Msg End here ===================
  // const [successMsg, setSuccessMsg] = useState("");
  // // ============= Event Handler Start here =============
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   setErrEmail("");
  // };
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   setErrPassword("");
  // };
  // // ============= Event Handler End here ===============
  // const handleSignUp = (e) => {
  //   e.preventDefault();

  //   if (!email) {
  //     setErrEmail("Nhập email");
  //   }

  //   if (!password) {
  //     setErrPassword("Nhập mật khẩu");
  //   }
  //   // ============== Getting the value ==============
  //   if (email && password) {
  //     setSuccessMsg(
  //       `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
  //     );
  //     setEmail("");
  //     setPassword("");
  //   }
  // };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={s4mlogo} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Đăng nhập để không bỏ lỡ quyền lợi tích luỹ và hoàn tiền cho bất kỳ đơn hàng nào.
            </h1>
            {/* <p className="text-base">When you sign in, you are with us!</p> */}
          </div>
          <div className="w-[300px] flex items-start gap-3">
            {/* <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with 
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p> */}
          </div>
          <div className="w-[300px] flex items-start gap-3">
            {/* <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all  services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p> */}
          </div>
          <div className="w-[300px] flex items-start gap-3">
            {/* <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p> */}
          </div>
          {/* <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © 
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div> */}
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Đăng kí
              </button>
            </Link>
          </div>
        ) : (
          // <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onFinish={onFinish}>
          //   <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          //     <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
          //       Đăng nhập
          //     </h1>
          //     <div className="flex flex-col gap-3">
          //       {/* Email */}
          //       <div className="flex flex-col gap-.5">
          //         <p className="font-titleFont text-base font-semibold text-gray-600">
          //           Email
          //         </p>
          //         <input
          //           // onChange={handleEmail}
          //           value={email}
          //           className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
          //           type="email"
          //           placeholder="john@workemail.com"
          //         />
          //         {errEmail && (
          //           <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
          //             <span className="font-bold italic mr-1">!</span>
          //             {errEmail}
          //           </p>
          //         )}
          //       </div>

          //       {/* Password */}
          //       <div className="flex flex-col gap-.5">
          //         <p className="font-titleFont text-base font-semibold text-gray-600">
          //           Password
          //         </p>
          //         <input
          //           // onChange={handlePassword}
          //           value={password}
          //           className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
          //           type="password"
          //           placeholder="Create password"
          //         />
          //         {errPassword && (
          //           <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
          //             <span className="font-bold italic mr-1">!</span>
          //             {errPassword}
          //           </p>
          //         )}
          //       </div>

          //       <button
          //         // onClick={handleSignUp}
          //         className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
          //       >
          //         Đăng nhập
          //       </button>
          //       <p className="text-sm text-center font-titleFont font-medium">
          //         Bạn chưa có tài khoản?{"  "}
          //         <Link to="/signup">
          //           <span className="hover:text-blue-600 duration-300">
          //             Đăng kí
          //           </span>
          //         </Link>
          //       </p>
          //     </div>
          //   </div>
          // </form>
          <Form
            name="basic"
            // style={{ maxWidth: 600, margin: '0 auto' }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="username"
              rules={[{ required: true, message: 'Email không được để trống!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
            // wrapperCol={{ offset: 6, span: 16 }}
            >
              <Button type="primary" htmlType="submit" loading={isSubmit}>
                Đăng nhập
              </Button>
            </Form.Item>
            <Divider>Or</Divider>
            <p className="text text-normal">Chưa có tài khoản ?
              <span>
                <Link to='/register' > Đăng Ký </Link>
              </span>
            </p>
          </Form>
        )}
      </div>
    </div>
  );

};

export default SignIn;
