import React, { useEffect } from "react";
import DefaultHead from "../../components/DefaultHead";
import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import Content from "../../components/Content";
import { useRouter } from "next/router";
import { useContracts } from "../../services/contracts";
import { TContract } from "../../types/Contracts";
import { useState } from "react";

const ContractForm = (): React.ReactElement => {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { contractID } = router.query;
  const { getContract, updateContract } = useContracts();
  const { data: contract, isValidating } = getContract(contractID as string);
  const [form] = Form.useForm();
  const [isUpdateButtonDisabled, setUpdateButtonDisabled] = useState(true);

  const handleOnSubmitForm = (updatedContract: Pick<TContract, "firstName" | "lastName">) => {
    const completedValidation = false; // TODO validate completed form

    updateContract({
      ...contract,
      completed: completedValidation,
      ...updatedContract,
    } as TContract & { id: string });
  };

  return (
    !isValidating && (
      <>
        <DefaultHead />
        <Content>
          <Row justify="center">
            <Col md={16}>
              <Title level={1}>{`Contract to sign ${contractID}`}</Title>
              <Card>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <div>
                    <Title level={3}>{`${contract?.firstName} ${contract?.lastName}`}</Title>
                    <Text>DNI: {contract?.idNumber}</Text>
                  </div>
                  <Form
                    form={form}
                    initialValues={{ firstName: contract?.firstName, lastName: contract?.lastName }}
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                    onFinish={handleOnSubmitForm}
                    onValuesChange={() => setUpdateButtonDisabled(false)}
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
                    <Form.Item>
                      <Button type="primary" htmlType="submit" disabled={isUpdateButtonDisabled}>
                        Update contract
                      </Button>
                    </Form.Item>
                  </Form>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
      </>
    )
  );
};

export default ContractForm;
