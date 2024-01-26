import { IUser } from "@/types/backend";
import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IUser | null;
    setDataInit: (v: any) => void;
}
const ViewDetailUser = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;

    return (
        <>
            <Drawer
                title="Thông Tin User"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Tên hiển thị">{dataInit?.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataInit?.email}</Descriptions.Item>

                    <Descriptions.Item label="Last name">{dataInit?.lastName}</Descriptions.Item>
                    {/* <Descriptions.Item label="Tuổi">{dataInit?.age}</Descriptions.Item> */}

                    <Descriptions.Item label="Vai trò" >
                        <Badge status="processing" text={dataInit?.idRole} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" >{dataInit?.phoneNumber}</Descriptions.Item>
                    {/* <Descriptions.Item label="Thông tin công ty" span={2}>
                        Id: {dataInit?.company?._id ?? "-"}
                        <br />
                        Tên: {dataInit?.company?.name ?? "-"}
                        <br />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailUser;