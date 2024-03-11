import React, { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { s4mlogo } from "../../assets/images";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserLoginInfo } from "../../redux/slice/accountSlice";
import { Button, Divider, Form, Input, message, notification, Checkbox } from 'antd';
import { Typography } from 'antd';
import { store } from "../../redux/store";
import { reSetCart } from "../../redux/slice/cartSlice";

const { Title } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    let res;
    try {
      res = await axios.post('http://localhost:6969/auth/customers/login', { username, password });
      setIsSubmit(false);
      // console.log(res);
      localStorage.setItem('access_token', res.data.data.access_token);
      dispatch(setUserLoginInfo(res.data.data.userData));
      message.success('Đăng nhập tài khoản thành công!');
      setTimeout(function() {
        window.location.href = '/';
      }, 1000);  
    } catch (error) {
      // console.log(error);
      message.error('Sai tên đăng nhập hoặc mật khẩu');
    }

  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-[#C6DCBA] px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={s4mlogo} alt="logoImg" className="w-70" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium text-[#070F2B]">
              Đăng nhập để không bỏ lỡ quyền lợi tích luỹ và hoàn tiền cho bất kỳ đơn hàng nào.
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-2/3 h-full">
        <div>
          {/* <Divider /> */}
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Title level={2}>Đăng nhập</Title>
              <Divider />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" style={{backgroundColor: "blue"}}>
                Đăng nhập
              </Button>
            </Form.Item>
            {/* <Divider> Or </Divider> */}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Divider>Or</Divider>
              <p> Chưa có tài khoản ?
                <span>
                  <Link to='/signup' > Đăng kí </Link>
                </span>
              </p>
            </Form.Item>
            
          </Form>
          
        </div>

        {/* )}  */}
      </div>
    </div>
  );

};

export default SignIn;
