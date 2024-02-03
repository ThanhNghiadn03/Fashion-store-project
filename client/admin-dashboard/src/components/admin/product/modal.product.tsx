import { FooterToolbar, ModalForm, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-components";
import { Col, ConfigProvider, Form, Modal, Row, Upload, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import { callCreateProduct, callFetchCompany, callUpdateProduct, callUploadSingleFile } from "@/config/api";
import { IProduct } from "@/types/backend";
import { v4 as uuidv4 } from 'uuid';
import { CheckSquareOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import enUS from 'antd/lib/locale/en_US';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IProduct | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

interface IProductImage {
    name: string;
    uid: string;
}

const ModalProduct = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [animation, setAnimation] = useState<string>('open');
    const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
    const [dataImage, setDataImage] = useState<IProductImage[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [value, setValue] = useState<string>("");
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
        if (dataImage.length === 0) {
            message.error('Vui lòng upload ảnh Logo')
            return;
        }
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
                imageProduct: dataImage[0].name,
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
                imageProduct: dataImage[0].name,
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

    const handleRemoveFile = (file: any) => {
        setDataImage([])
    }

    const handlePreview = async (file: any) => {
        if (!file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }
        getBase64(file.originFileObj, (url: string) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };

    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoadingUpload(true);
        }
        if (info.file.status === 'done') {
            setLoadingUpload(false);
        }
        if (info.file.status === 'error') {
            setLoadingUpload(false);
            // message.error(info?.file?.error?.event?.message ?? "Đã có lỗi xảy ra khi upload file.")
            message.error("Đã có lỗi xảy ra khi upload file.")
        }
    };

    const handleUploadFileImage = async ({ file, onSuccess, onError }: any) => {
        const res = await callUploadSingleFile(file, "products");
        if (res && res.data) {
            setDataImage([{
                name: res.data.fileName,
                uid: uuidv4()
            }])
            if (onSuccess) onSuccess('ok')
        } else {
            if (onError) {
                setDataImage([])
                const error = new Error(res.message);
                onError({ event: error });
            }
        }
    };

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật product" : "Tạo mới product"}</>}
                open={openModal}
                modalProps={{
                    // onCancel: () => { handleReset() },
                    // afterClose: () => handleReset(),
                    // destroyOnClose: true,
                    // width: isMobile ? "100%" : 900,
                    // keyboard: false,
                    // maskClosable: false,
                    // okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    // cancelText: "Hủy"
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    footer: null,
                    keyboard: false,
                    maskClosable: false,
                    className: `modal-product ${animation}`,
                    rootClassName: `modal-product-root ${animation}`,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                // scrollToFirstError={true}
                // preserve={false}
                // form={form}
                // onFinish={submitProduct}
                // initialValues={dataInit?._id ? dataInit : {}}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitProduct}
                initialValues={dataInit?._id ? dataInit : {}}
                // submitter={{
                //     render: (_: any, dom: any) => <FooterToolbar>{dom}</FooterToolbar>,
                //     submitButtonProps: {
                //         icon: <CheckSquareOutlined />
                //     },
                //     searchConfig: {
                //         resetText: "Hủy",
                //         submitText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                //     }
                // }}
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
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Ảnh sản phẩm"
                            name="imageProduct"
                            rules={[{
                                required: true,
                                message: 'Vui lòng không bỏ trống',
                                validator: () => {
                                    if (dataImage.length > 0) return Promise.resolve();
                                    else return Promise.reject(false);
                                }
                            }]}
                        >
                            <ConfigProvider locale={enUS}>
                                <Upload
                                    name="imageProduct"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileImage}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onRemove={(file) => handleRemoveFile(file)}
                                    onPreview={handlePreview}
                                    defaultFileList={
                                        dataInit?._id ?
                                            [
                                                {
                                                    uid: uuidv4(),
                                                    name: dataInit?.imageProduct ?? "",
                                                    status: 'done',
                                                    url: `${import.meta.env.VITE_BACKEND_URL}/images/products/${dataInit?.imageProduct}`,
                                                }
                                            ] : []
                                    }

                                >
                                    <div>
                                        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ConfigProvider>
                        </Form.Item>

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
                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormUploadButton 
                            title="upload"
                            label="upload"
                            name="imageProduct"
                        />
                    </Col> */}
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
            <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={() => setPreviewOpen(false)}
                        style={{ zIndex: 1500 }}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

export default ModalProduct;
