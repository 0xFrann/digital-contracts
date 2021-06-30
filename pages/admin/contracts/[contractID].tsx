import React from "react";
import DefaultHead from "../../../components/DefaultHead";
import { Card, Typography } from "antd";
import Content from "../../../components/Content";
import { useRouter } from "next/router";

const ContractsListPage = (): React.ReactElement => {
  const { Title } = Typography;
  const router = useRouter();
  const { contractID } = router.query;

  return (
    <>
      <DefaultHead />
      <Content>
        <Title level={1}>{`Contract ${contractID}`}</Title>
        <Card>
          <Title level={3}>Title</Title>
        </Card>
      </Content>
    </>
  );
};

export default ContractsListPage;
