import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import { useCallback, useState } from "react";
import useinput from "../hooks/useinput";
import styled from "styled-components";
import { SIGNUP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useinput("");
  const [nickname, onChangeNickname] = useinput("");
  const [password, onChangePassword] = useinput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird </title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage style={{ color: "red" }}>
              비밀번호가 일치하지 않습니다.
            </ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            위 약관에 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessage style={{ color: "red" }}>
              약관에 동의하셔야 합니다.
            </ErrorMessage>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default Signup;
