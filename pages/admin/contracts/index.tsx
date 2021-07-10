import getConfig from "next/config";
import React, { useState } from "react";
import DefaultHead from "../../../components/DefaultHead";
import { Button, Card, Form, Input, Modal, Popconfirm, Space, Table, Typography } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import { theme } from "../../../constants/theme";
import Header from "../../../components/Header";
import { useContracts } from "../../../services/contracts";

const { publicRuntimeConfig } = getConfig();
const DOMAIN_URL = publicRuntimeConfig.DOMAIN_URL;

const { Title } = Typography;

const ContractsListPage = (): React.ReactElement => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form] = Form.useForm();
  const { contracts, newContract, deleteContract } = useContracts();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Name",
      ellipsis: true,
      render: (record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Identification",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (record) => `${record ? "yes" : "no"}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "id",
      // eslint-disable-next-line react/display-name
      render: ({ id }: { id: string }): JSX.Element => (
        <Space size="middle">
          <CopyOutlined
            onClick={() => copyLink(id)}
            style={{ fontSize: "20px", color: theme.default.primaryColor }}
          />
          <EyeOutlined
            onClick={() => viewGeneratedPDF(id)}
            style={{ fontSize: "20px", color: theme.default.primaryColor }}
          />
          <a href={`/contract/${id}`} target="_blank" rel="noreferrer">
            <EditOutlined style={{ fontSize: "20px", color: theme.default.primaryColor }} />
          </a>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => onDelete(id)}
            okText="Delete"
            cancelText="No"
          >
            <DeleteOutlined style={{ fontSize: "20px", color: theme.default.primaryColor }} />
          </Popconfirm>
        </Space>
      ),
      width: "150px",
    },
  ];

  const copyLink = (id: string): void => {
    navigator.clipboard.writeText(`${DOMAIN_URL}/contract/${id}`).then(() => {
      alert(navigator.clipboard.readText());
    });
  };

  const viewGeneratedPDF = (id: string): void => {
    alert(`View PDF of ${id}`);
  };

  const onDelete = (id: string): void => {
    deleteContract(id);
  };

  const handleOnCloseForm = (): void => {
    setIsFormOpen(false);
    form.resetFields();
  };

  const triggerSubmitForm = (): void => {
    form.submit();
  };

  const handleOnSubmitForm = (value): void => {
    setIsFormOpen(false);
    form.resetFields();
    newContract({ ...value, status: "created", completed: false });
  };

  return (
    <>
      <DefaultHead />
      <Content>
        <Header
          title="Contracts"
          extra={
            <Button type="primary" onClick={() => setIsFormOpen(true)}>
              New Contract
            </Button>
          }
        />
        <Card>
          <Title level={3}>Title</Title>
          <Table
            columns={columns}
            dataSource={contracts.data}
            loading={contracts.isValidating}
          ></Table>
        </Card>
        <Modal
          visible={isFormOpen}
          onOk={triggerSubmitForm}
          onCancel={handleOnCloseForm}
          okText="Create"
          title="Create a contract"
        >
          <Form
            form={form}
            name="dynamic_form_nest_item"
            autoComplete="off"
            onFinish={handleOnSubmitForm}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please, enter a name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please, enter the last name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="idNumber"
              label="ID Number"
              rules={[
                {
                  required: true,
                  min: 8,
                  max: 8,
                  message: "Please, enter the identification number",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </>
  );
};

export default ContractsListPage;
