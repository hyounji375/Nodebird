import { Form, Input, Button } from "antd";
import { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import useinput from "../hooks/useinput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useinput("");
  const [password, onChangePassword] = useinput("");

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user_email">이메일</label>
        <br />
        <Input
          name="user_email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user_password">비밀번호</label>
        <br />
        <Input
          name="user_password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
