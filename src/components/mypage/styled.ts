import { Button, Form,} from 'antd'
import styled from 'styled-components'

export const MyPageStyleddiv = styled.div`
  display: flex;
`

export const MyPageStyledForm = styled(Form)`
  width: 600px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const MyPageStyledFormItemWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MyPageStyledFormItem = styled(Form.Item)`
  display: flex;
  margin-bottom: 48px;
  justify-content: flex-end;
`

export const MyPageStyledButton = styled(Button)`
  margin-left: 8px;
`