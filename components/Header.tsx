import { PageHeader } from "antd";
import styled from "styled-components";

const StyledHeader = styled.div`
  background: ${({ theme }) => theme.colors.neutrals[0]};
  box-shadow: 0 -80px 64px 64px ${({ theme }) => theme.colors.primary};
`;

const StyledPageHeader = styled(PageHeader)`
  padding: ${({ theme }) => theme.spaces[8]}rem;
  .ant-page-header-heading-title:first-letter {
    text-transform: uppercase;
  }
`;

interface IHeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: IHeaderProps): JSX.Element => (
  <StyledHeader>
    <StyledPageHeader title={title} subTitle={description} />
  </StyledHeader>
);

Header.defaultProps = {
  description: "",
};

export default Header;
