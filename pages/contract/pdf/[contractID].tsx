import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Row, Col, Typography, Button } from "antd";
import { useContracts } from "../../../services/contracts";
import { Space } from "antd";
import * as CONSTANTS from "../../../constants/pdfContract";
import { PrinterOutlined } from "@ant-design/icons";

const ContractPDF = (): React.ReactElement => {
  const router = useRouter();
  const { contractID } = router.query;
  const { getContract } = useContracts();
  const { data: contract, isValidating } = getContract(contractID as string);

  return (
    !isValidating && (
      <StyledWrapper>
        <StyledDocument>
          <StyledPage size="A4">
            <StyledView>
              <StyledHeader align="center">
                <Text>
                  <Typography.Title level={1} style={{ fontWeight: 400 }}>
                    Vehicle purchase agreement
                  </Typography.Title>
                </Text>
                <Text>
                  <Typography.Title level={5} style={{ fontWeight: 300 }}>
                    Contract <strong>{contractID}</strong>
                  </Typography.Title>
                </Text>
              </StyledHeader>
            </StyledView>
            <StyledView>
              <StyledParagraph>{CONSTANTS.contractBody}</StyledParagraph>
            </StyledView>
            <StyledView>
              <Row justify="space-around" align="bottom">
                <Col>
                  <Space direction="vertical" align="center">
                    <Text>
                      <Typography.Title level={3}>
                        {`${contract.firstName} ${contract.lastName}`}
                      </Typography.Title>
                    </Text>
                    <Text>
                      <Typography.Text type="secondary">Client</Typography.Text>
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" align="center">
                    <Image src={contract.signImage}>
                      <img src={contract.signImage} alt="sign" width="256" />
                    </Image>
                    <Text>
                      <Typography.Text type="secondary">Signature</Typography.Text>
                    </Text>
                  </Space>
                </Col>
              </Row>
            </StyledView>
            <StyledButtonWrapper>
              <StyledButton
                onClick={() => window.print()}
                type="primary"
                size="large"
                shape="round"
                icon={<PrinterOutlined />}
              >
                Print
              </StyledButton>
            </StyledButtonWrapper>
          </StyledPage>
        </StyledDocument>
      </StyledWrapper>
    )
  );
};

export default ContractPDF;

const StyledButtonWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media only print {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 5%;
  right: 0;
  transform: translateX(50%);
  box-shadow: 3px 6px 15px 0 rgba(0, 0, 0, 0.2);
`;

const StyledWrapper = styled.div`
  background: #ddd;
  @media only screen {
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const StyledDocument = styled(Document)`
  display: flex;
  justify-content: center;
`;

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  width: 100%;
  position: relative;
  @media only screen {
    max-width: 1000px;
    margin: 4rem;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 3px 9px 32px 0 rgba(0, 0, 0, 0.25);
  }
`;

const StyledView = styled(View)`
  margin: 0.5rem;
  padding: 0.5rem;
`;

const StyledHeader = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

const StyledParagraph = styled(Typography.Paragraph)`
  white-space: break-spaces;
`;
