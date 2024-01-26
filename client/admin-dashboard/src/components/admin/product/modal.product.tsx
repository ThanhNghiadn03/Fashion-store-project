import { ModalForm, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import { callCreateProduct, callFetchCompany, callUpdateProduct } from "@/config/api";
import { IProduct } from "@/types/backend";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IProduct | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

const ModalProduct = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit?._id) {
            // if (dataInit.company) {
            //     setCompanies([{
            //         // label: dataInit.company.name,
            //         // value: dataInit.company._id,
            //         // key: dataInit.company._id,
            //     }])
            // }
        }
    }, [dataInit])
    const submitProduct = async (valuesForm: any) => {
        const { 
            nameProduct,
            price,
            discount,
            descriptionProduct,
            imageProduct,
            quantity,
            idCategory} = valuesForm;
        if (dataInit?._id) {
            //update
            const product = {
                _id: dataInit._id,
                nameProduct,
                price,
                discount,
                descriptionProduct,
                imageProduct,
                quantity,
                idCategory
            }

            const res = await callUpdateProduct(product);
            if (res.data) {
                message.success("Cập nhật product thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const product = {
                nameProduct,
                price,
                discount,
                descriptionProduct,
                imageProduct,
                quantity,
                idCategory,
            }
            const res = await callCreateProduct(product);
            if (res.data) {
                message.success("Thêm mới product thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật product" : "Tạo mới product"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitProduct}
                initialValues={dataInit?._id ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên sản phẩm"
                            name="nameProduct"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập tên sản phẩm"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giá cả"
                            name="price"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập đơn giá"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giảm giá ban đầu"
                            name="discount"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập giá trị giảm giá ban đầu (%)"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập số lượng"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormUploadButton 
                            title="upload"
                            label="upload"
                            name="imageProduct"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormTextArea
                            label="Mô tả sản phẩm"
                            name="descriptionProduct"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập mô tả sản phẩm"
                        />
                    </Col>
                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            disabled={dataInit?._id ? true : false}
                            label="Password"
                            name="password"
                            rules={[{ required: dataInit?._id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col> */}
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Danh mục"
                            name="idCategory"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập id danh mục"
                        />
                    </Col>
                    {/* <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Họ"
                            name="lastName"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên họ"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số điện thoại"
                        />
                    </Col> */}
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalProduct;
