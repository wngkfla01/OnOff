import { useCallback, useState } from 'react'
import {
  DayOffSummary,
  DayOffRequestItem,
  DayOffHistorytItem,
  DayOffRequestModal
} from 'components/index'
import { styled } from 'styled-components'

import { List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export interface DummyDayOffItem {
  id: number
  status: string
  type: string
  startDate: string
  endDate: string
  reason: string
}

const requestData: DummyDayOffItem[] = [
  {
    id: 1,
    status: '승인대기',
    type: '연차',
    startDate: new Date('2023-07-29').toLocaleDateString(),
    endDate: new Date('2023-07-29').toLocaleDateString(),
    reason: '가족 모임'
  },
  {
    id: 2,
    status: '승인대기',
    type: '오후반차',
    startDate: new Date('2023-07-30').toLocaleDateString(),
    endDate: new Date('2023-07-30').toLocaleDateString(),
    reason: '개인 사정'
  }
]

export const DayOff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
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
          연차 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>나의 연차</h2>
        <DayOffSummary />
      </Wapper>

      <Wapper>
        <h2>
          연차 신청 내역 <span>{requestData.length}</span>
        </h2>
        <List
          pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
          dataSource={requestData}
          renderItem={item => <DayOffRequestItem item={item} />}
        />
      </Wapper>

      <Wapper>
        <h2>
          연차 사용 내역 <span>{requestData.length}</span>
        </h2>
        <List
          pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
          dataSource={requestData}
          renderItem={item => <DayOffHistorytItem item={item} />}
        />
      </Wapper>
      <DayOffRequestModal
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