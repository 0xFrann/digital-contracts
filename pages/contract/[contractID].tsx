import React, { useEffect, useState } from "react";
import DefaultHead from "../../components/DefaultHead";
import { Button, Card, Col, Form, Input, Popconfirm, Row, Space, Typography, Upload } from "antd";
import Content from "../../components/Content";
import { useRouter } from "next/router";
import { useContracts } from "../../services/contracts";
import { EContractStatus, TContract } from "../../types/Contracts";
import ContractStatusPill from "../../components/ContractStatusPill";
import SignaturePadCard from "../../components/SignaturePadCard";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import Firebase from "../../services/firebaseService";

type TEditContractForm = {
  firstName: string;
  lastName: string;
  idDocPhotosFront: UploadFile[];
  idDocPhotosBack: UploadFile[];
  signImage: string;
};

const ContractForm = (): React.ReactElement => {
  const { Title, Text } = Typography;
  const router = useRouter();
  const { contractID } = router.query;
  const { getContract, updateContract } = useContracts();
  const { data: contract, isValidating } = getContract(contractID as string);
  const [form] = Form.useForm();
  const [idDocPhotosFront, setIdDocPhotosFront] = useState(
    contract?.idDocPhotos.front || {
      fileName: "",
      fileLocation: "",
    }
  );
  const [idDocPhotosBack, setIdDocPhotosBack] = useState(
    contract?.idDocPhotos.back || {
      fileName: "",
      fileLocation: "",
    }
  );
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

  const handleOnSubmitForm = async (updatedContract: TEditContractForm): void => {
    const {
      idDocPhotosBack: b,
      idDocPhotosFront: f,
      signImage,
      ...restUpdatedContract
    } = updatedContract;

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
      ...restUpdatedContract,
      status: setStatus(signImage, contract.status),
      signImage,
      idDocPhotos: { front: idDocPhotosFront, back: idDocPhotosBack },
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

  const uploadFile = (
    { file, filename, onError, onProgress, onSuccess },
    updateState,
    customFileName
  ) => {
    const ref = Firebase.storage(Firebase.app())
      .ref(`/contracts/${contractID}`)
      .child(customFileName);

    const task = ref.put(file as Blob);
    task.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress = Math.round((100 * snapshot.bytesTransferred) / snapshot.totalBytes);
        onProgress({
          percent: progress,
        } as never);
      },
      onError,
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSuccess(downloadURL, file as never);
          updateState({
            fileName: customFileName,
            fileLocation: downloadURL,
          });
        });
      }
    );
  };

  const removeFile = (filename, updateState) => {
    const ref = Firebase.storage(Firebase.app()).ref(`/contracts/${contractID}`).child(filename);

    ref.delete().then(() =>
      updateState({
        fileName: "",
        fileLocation: "",
      })
    );
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
                        idDocPhotosFront: contract?.idDocPhotos.front.fileLocation
                          ? [
                              {
                                name: contract?.idDocPhotos.front.fileName,
                                url: contract?.idDocPhotos.front.fileLocation,
                              },
                            ]
                          : [],
                        idDocPhotosBack: contract?.idDocPhotos.back.fileLocation
                          ? [
                              {
                                name: contract?.idDocPhotos.back.fileName,
                                url: contract?.idDocPhotos.back.fileLocation,
                              },
                            ]
                          : [],
                        signImage: contract?.signImage,
                      }}
                      name="dynamic_form_nest_item"
                      autoComplete="off"
                      onFinish={handleOnSubmitForm}
                      onValuesChange={() => setUpdateButtonDisabled(false)}
                      layout="vertical"
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
                        name="idDocPhotosFront"
                        label="Upload ID Photo front side"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                      >
                        <Upload
                          name="front"
                          listType="picture"
                          maxCount={1}
                          multiple={false}
                          accept="image/*"
                          disabled={isCanceledOrApproved}
                          customRequest={(file) =>
                            uploadFile(file, setIdDocPhotosFront, "ID Photo Front")
                          }
                          onRemove={() => removeFile("ID Photo Front", setIdDocPhotosFront)}
                        >
                          <Button icon={<UploadOutlined />} disabled={isCanceledOrApproved}>
                            Click to upload
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="idDocPhotosBack"
                        label="Upload ID Photo back side"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                      >
                        <Upload
                          name="back"
                          listType="picture"
                          maxCount={1}
                          multiple={false}
                          accept="image/*"
                          disabled={isCanceledOrApproved}
                          customRequest={(file) =>
                            uploadFile(file, setIdDocPhotosBack, "ID Photo Back")
                          }
                          onRemove={() => removeFile("ID Photo Back", setIdDocPhotosBack)}
                        >
                          <Button icon={<UploadOutlined />} disabled={isCanceledOrApproved}>
                            Click to upload
                          </Button>
                        </Upload>
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
