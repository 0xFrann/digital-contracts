import React from "react";
import DefaultHead from "../../../components/DefaultHead";
import { Card, Popconfirm, Space, Table, Typography } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import { theme } from "../../../constants/theme";

const MOCKUP = [
  {
    name: "Gus-Gus",
    identification: "12341234",
    completed: false,
    status: "sended",
    id: "123",
  },
];

const ContractsListPage = (): React.ReactElement => {
  const { Title } = Typography;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Identification",
      dataIndex: "identification",
      key: "identification",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      // eslint-disable-next-line react/display-name
      render: ({ completed }: { completed: boolean }): JSX.Element => (
        <span>{completed ? "yes" : "no"}</span>
      ),
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
          <EyeOutlined
            onClick={() => viewGeneratedPDF(id)}
            style={{ fontSize: "20px", color: theme.default.primaryColor }}
          />
          <a href={`/contracts/${id}`} target="_blank" rel="noreferrer">
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

  const viewGeneratedPDF = (id: string): void => {
    alert(`View PDF of ${id}`);
  };

  const onDelete = (id: string): void => {
    alert(`Delete ${id}`);
  };

  return (
    <>
      <DefaultHead />
      <Content>
        <Title level={1}>Contracts</Title>
        <Card>
          <Title level={3}>Title</Title>
          <Table columns={columns} dataSource={MOCKUP}></Table>
        </Card>
      </Content>
    </>
  );
};

export default ContractsListPage;
