import React from "react";
import DefaultHead from "../../components/DefaultHead";
import { Card, Col, Input, Row, Space, Typography } from "antd";
import Content from "../../components/Content";
import { useRouter } from "next/router";

const ContractForm = (): React.ReactElement => {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { contractID } = router.query;

  return (
    <>
      <DefaultHead />
      <Content>
        <Row justify="center">
          <Col md={16}>
            <Title level={1}>{`Contract to sign ${contractID}`}</Title>
            <Card>
              <Space direction="vertical" size="large">
                <div>
                  <Title level={3}>Title</Title>
                  <Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </Text>
                </div>
                <Row>
                  <Col md={12}>
                    <Input placeholder="Name" />
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default ContractForm;
