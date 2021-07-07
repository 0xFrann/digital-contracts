import { PageHeader, PageHeaderProps } from "antd";
import styled from "styled-components";

const StyledPageHeader = styled(PageHeader)`
  padding: ${({ theme }) => theme.spaces[8]}rem;
  .ant-page-header-heading-title {
    font-size: ${({ theme }) => theme.default.spaces[8] * 2}rem;

    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

type IHeaderProps = PageHeaderProps;

const Header = (props: IHeaderProps): JSX.Element => <StyledPageHeader {...props} />;

export default Header;
