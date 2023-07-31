import { useState,useEffect } from 'react'
import { DatePicker, Input, Select, Space } from 'antd'
import axios from 'axios'
import {
  Styleddiv,
  StyledForm,
  StyledFormItemWrapper,
  StyledFormItem,
  StyledButton
} from './styled'

interface SignUpData {
  name: string
  position: string
  email: string
  joinDate: string
  password: string
}

export const SignUp = () => {

  
  const [loginData, setLoginData] = useState<SignUpData>({
    name: '',
    position: '',
    email: '',
    joinDate: '',
    password: ''
  })
  useEffect(() => {
    console.log(loginData);
  }, [loginData]);
  
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handlePositionChange = (value: string) => {
    setLoginData({
      ...loginData,
      position: value
    })
  }

  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPasswordConfirm(value)
  }

  const handleSubmit = async () => {
    if (loginData.password === passwordConfirm) {
      try {
        const response = await axios.post(api, loginData)
        console.log('API 호출 성공!')
        console.log(response.data)
      } catch (error) {
        console.error('API 호출 실패!')
        console.error(error)
      }
    } else {
      console.log('비밀번호 확인 실패!')
    }
  }

  return (
    <Styleddiv>
      <StyledForm name="basic" autoComplete="off" onFinish={handleSubmit}>
        <StyledFormItemWrapper>
          <StyledFormItem
            label="이름"
            name="이름"
            rules={[{ required: true, message: '이름을 입력하세요!' }]}>
            <Input
              style={{ width: 250 }}
              name="name"
              onChange={handleChange}
              value={loginData.name}
            />
          </StyledFormItem>

          <Space wrap>
            <StyledFormItem name="직급" rules={[{ required: true, message: '직급을 입력하세요!' }]}>
              <Select
                style={{ width: 150 }}
                placeholder="직급 선택"
                onChange={handlePositionChange}
                options={[
                  { value: '사원', label: '사원' },
                  { value: '주임', label: '주임' },
                  { value: '대리', label: '대리' },
                  { value: '과장', label: '과장' },
                  { value: '팀장', label: '팀장' }
                ]}
              />
            </StyledFormItem>
          </Space>
        </StyledFormItemWrapper>

        <StyledFormItemWrapper>
          <StyledFormItem
            label="이메일"
            name="이메일"
            rules={[{ required: true, message: '이메일을 입력하세요!' }]}>
            <Input
              style={{ width: 250 }}
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
          </StyledFormItem>
          <StyledFormItem
            name="입사일"
            rules={[{ required: true, message: '입사일을 입력하세요!' }]}>
            <DatePicker placeholder="입사일 선택" style={{ width: 150 }} />
          </StyledFormItem>
        </StyledFormItemWrapper>

        <StyledFormItem
          label="비밀번호"
          name="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}>
          <Input.Password
            style={{ width: 400 }}
            name="password"
            onChange={handleChange}
            value={loginData.password}
          />
        </StyledFormItem>

        <StyledFormItem
          label="비밀번호 확인"
          name="비밀번호 확인"
          rules={[{ required: true, message: '비밀번호 확인을 입력하세요!' }]}>
          <Input.Password
            style={{ width: 400 }}
            name="passwordConfirm"
            onChange={handlePasswordConfirmChange}
            value={passwordConfirm}
          />
        </StyledFormItem>

        <StyledFormItem
          label="전화번호"
          name="전화번호"
          rules={[{ required: true, message: '전화번호를 입력하세요!' }]}>
          <Input style={{ width: 50 }} defaultValue="010" />
          <Input style={{ width: 300 }} defaultValue="" />
        </StyledFormItem>

        <StyledFormItemWrapper>
          <StyledButton type="primary" htmlType="submit">
            가입하기
          </StyledButton>
        </StyledFormItemWrapper>
      </StyledForm>
    </Styleddiv>
  )
}
