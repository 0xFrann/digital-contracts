import styled from "styled-components";
import { Layout } from "antd";

const ANTDContent = Layout.Content;

const StyledContent = styled(ANTDContent)`
  padding: ${({ theme }) => theme.spaces[8] * 2}rem;
  height: 100%;
`;

interface IContentProps {
  children: React.ReactNode;
}

const Content = (props: IContentProps): JSX.Element => <StyledContent {...props} />;

export default Content;
