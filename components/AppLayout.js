import propTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

// antd의 컴포넌트 css 커스텀
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
.ant-row{
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.ant-col:first-child{
  padding-left: 0 !important;
}
.ant-col:last-child{
  padding-right: 0 !important;
}
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const menuItems = [
    {
      label: (
        <Link href="/">
          <a>노드버드</a>
        </Link>
      ),
      key: "노드버드",
    },
    {
      label: (
        <Link href="/profile">
          <a>프로필</a>
        </Link>
      ),
      key: "프로필",
    },
    {
      label: (
        <>
          <SearchInput enterButton />
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </>
      ),
      key: "회원가입",
    },
  ];

  return (
    <div>
      <Global />
      <Menu mode="horizontal" items={menuItems} />
      <Row gutter={8}>
        {/* gutter : 컬럼 사이에 간격을 주는 것 */}
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/hyounji375"
            target="_blank"
            rel="noreferrer noopener"
          >
            {/* target="_blank"로 새 창에서 띄우면 보안 위협이 있어서 보통 rel="noreferrer noopener"을 적어줌. */}
            Made by Editha
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
