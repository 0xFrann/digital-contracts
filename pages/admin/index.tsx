import React from "react";
import DefaultHead from "../../components/DefaultHead";
import { Typography } from "antd";
import Content from "../../components/Content";

const AdminPage = (): React.ReactElement => {
  const { Title } = Typography;

  return (
    <>
      <DefaultHead />
      <Content>
        <Title level={1}>Admin</Title>
      </Content>
    </>
  );
};

export default AdminPage;
