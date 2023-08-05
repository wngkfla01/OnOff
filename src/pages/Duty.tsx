import { DUMMY_DUTY_REQUEST_LIST } from 'constants/index'
import { DutyRequestTable, DutyHistoryTable, DutyRequestModal } from 'components/index'
import { IDutyRequest } from 'types/index'
import { insertDuty } from 'apis/index'
import { modalStore } from 'stores/index'
import { resultModalDatas } from 'constants/index'

import { styled } from 'styled-components'

import { useCallback, useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const Duty = () => {
  const { openModal } = modalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = (request: IDutyRequest) => {
    insertDuty(request)
      .then(
        () => {
          setIsModalOpen(false)
          openModal({
            ...resultModalDatas.DUTY_INSERT_SUCCESS,
            okCallback: () => {
              // TODO: 당직 신청 갱신
            }
          })
        },
        error => {
          openModal({
            ...resultModalDatas.DUTY_INSERT_FAILURE,
            content: `${resultModalDatas.DUTY_INSERT_FAILURE.content}${error.message ?? ''}`
          })
        }
      )
      .finally(() => {
        setIsModalOpen(false)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleClickAdd = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  return (
    <Container>
      <ButtonBox>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>
          당직 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>
          당직 신청 내역 <span>{DUMMY_DUTY_REQUEST_LIST.length}</span>
        </h2>
        <DutyRequestTable requestList={DUMMY_DUTY_REQUEST_LIST} />
      </Wapper>

      <Wapper>
        <h2>
          나의 당직 내역 <span>{DUMMY_DUTY_REQUEST_LIST.length}</span>
        </h2>
        <DutyHistoryTable historyList={DUMMY_DUTY_REQUEST_LIST} />
      </Wapper>

      <DutyRequestModal
        isModalOpen={isModalOpen}
        onClickOk={handleOk}
        onClickCancel={handleCancel}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  min-height: calc(100% - 62px);
  position: relative;
`

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;

  &:first-child {
    flex-grow: 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;

    span {
      font-size: 18px;
      font-weight: 400;
      margin-left: 8px;
      color: var(--color-green-1);
    }
  }
`
const ButtonBox = styled.div`
  position: absolute;
  right: 0;
`
