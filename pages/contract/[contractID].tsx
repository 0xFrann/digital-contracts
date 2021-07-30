import React, { useEffect, useState } from "react";
import DefaultHead from "../../components/DefaultHead";
import { Button, Card, Checkbox, Col, Form, Input, Popconfirm, Row, Space, Typography } from "antd";
import Content from "../../components/Content";
import { useRouter } from "next/router";
import { useContracts } from "../../services/contracts";
import { EContractStatus, TContract } from "../../types/Contracts";
import ContractStatusPill from "../../components/ContractStatusPill";
import SignaturePadCard from "../../components/SignaturePadCard";

type TEditContractForm = {
  firstName: string;
  lastName: string;
  idDocPhotos: boolean;
  signImage: string;
};

const ContractForm = (): React.ReactElement => {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { contractID } = router.query;
  const { getContract, updateContract } = useContracts();
  const { data: contract, isValidating } = getContract(contractID as string);
  const [form] = Form.useForm();
  const [isUpdateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [isCanceledOrApproved, setIsCanceledOrApproved] = useState(
    contract?.status === EContractStatus.canceled || contract?.status === EContractStatus.approved
  );

  const handleOnSign = (base64Image): void => {
    form.setFieldsValue({ signImage: base64Image });
    setUpdateButtonDisabled(false);
  };

  const handleOnClear = (): void => {
    form.setFieldsValue({ signImage: null });
    setUpdateButtonDisabled(false);
  };

  useEffect(() => {
    setIsCanceledOrApproved(
      contract?.status === EContractStatus.canceled || contract?.status === EContractStatus.approved
    );
  }, [contract?.status]);

  const handleOnSubmitForm = (updatedContract: TEditContractForm): void => {
    const setStatus = (isSigned, oldStatus): EContractStatus[keyof EContractStatus] => {
      if (isSigned) {
        return EContractStatus.signed;
      } else if (oldStatus === EContractStatus.signed) {
        return EContractStatus.created;
      } else {
        return oldStatus;
      }
    };

    updateContract({
      ...contract,
      ...updatedContract,
      status: setStatus(updatedContract?.signImage, contract.status),
    } as TContract);

    setUpdateButtonDisabled(true);
  };

  const approveContract = (): void => {
    updateContract({
      ...contract,
      status: EContractStatus.approved,
    } as TContract);
  };

  const cancelContract = (): void => {
    updateContract({
      ...contract,
      status: EContractStatus.canceled,
    } as TContract);
  };

  return (
    !isValidating && (
      <>
        <DefaultHead />
        <Content>
          <Row justify="center">
            <Col md={16}>
              <Space size="large" direction="vertical" style={{ width: "100%" }}>
                <Row>
                  <Col sm={16}>
                    <Title level={1}>{`Contract to sign ${contractID}`}</Title>
                    <Space>
                      {contract?.status && <ContractStatusPill status={contract?.status} />}
                      {contract?.updated && (
                        <Text type="secondary">{`Updated at: ${Intl.DateTimeFormat("es-AR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        }).format(new Date(contract?.updated))}`}</Text>
                      )}
                    </Space>
                  </Col>
                  <Col sm={8}>
                    <Space direction="vertical" align="end" style={{ width: "100%" }}>
                      <Button
                        type="primary"
                        disabled={
                          contract?.status !== EContractStatus.signed || isCanceledOrApproved
                        }
                        onClick={approveContract}
                      >
                        Approve contract
                      </Button>
                      <Popconfirm
                        title="Are you sure?"
                        onConfirm={cancelContract}
                        okText="Yes, Cancel"
                        cancelText="No"
                        disabled={isCanceledOrApproved}
                      >
                        <Button danger disabled={isCanceledOrApproved}>
                          Cancel contract
                        </Button>
                      </Popconfirm>
                    </Space>
                  </Col>
                </Row>
                <Card>
                  <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div>
                      <Title level={3}>{`${contract?.firstName} ${contract?.lastName}`}</Title>
                      <Text>DNI: {contract?.idNumber}</Text>
                    </div>
                    <Form
                      form={form}
                      initialValues={{
                        firstName: contract?.firstName,
                        lastName: contract?.lastName,
                        idDocPhotos: contract?.idDocPhotos,
                        signImage: contract?.signImage,
                      }}
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
                        <Input disabled={isCanceledOrApproved} />
                      </Form.Item>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: "Please, enter the last name" }]}
                      >
                        <Input disabled={isCanceledOrApproved} />
                      </Form.Item>
                      <Form.Item
                        name="idDocPhotos"
                        label="Upload ID photos"
                        valuePropName="checked"
                      >
                        <Checkbox disabled={isCanceledOrApproved} />
                      </Form.Item>
                      <Form.Item name="signImage" hidden>
                        <Input disabled={isCanceledOrApproved} />
                      </Form.Item>
                      <Form.Item>
                        <SignaturePadCard
                          onClear={handleOnClear}
                          onDraw={handleOnSign}
                          disabled={isCanceledOrApproved}
                          defaultData={contract?.signImage}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isUpdateButtonDisabled || isCanceledOrApproved}
                        >
                          Update contract
                        </Button>
                      </Form.Item>
                    </Form>
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>
        </Content>
      </>
    )
  );
};

export default ContractForm;
