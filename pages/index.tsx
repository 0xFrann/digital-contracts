import React from "react";
import DefaultHead from "../components/DefaultHead";
import { Typography } from "antd";
import Content from "../components/Content";

const IndexPage = (): React.ReactElement => {
  const { Title } = Typography;

  return (
    <>
      <DefaultHead />
      <Content>
        <Title level={1}>Digital Contracts</Title>
      </Content>
    </>
  );
};

export default IndexPage;
