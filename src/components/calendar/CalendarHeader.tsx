import React from 'react'

import { Col, Row, Select, Typography } from 'antd'

import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import dayLocaleData from 'dayjs/plugin/localeData'
import 'dayjs/locale/ko'

dayjs.extend(dayLocaleData)
dayjs.locale('ko')

export const CalendarHeader = React.memo(
  ({ value, onChange }: { value: Dayjs; onChange: (date: Dayjs) => void }) => {
    const start = 0
    const end = 12
    const monthOptions = []

    let current = value.clone()
    const localeData = value.localeData()
    const months = []
    for (let i = 0; i < 12; i++) {
      current = current.month(i)
      months.push(localeData.months(current))
    }

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>
      )
    }

    const year = value.year()
    const month = value.month()
    const options = []
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>
      )
    }

    return (
      <div style={{ marginBottom: 10 }}>
        <Typography.Title level={4}>일정</Typography.Title>
        <Row gutter={8}>
          <Col>
            <Select
              size="middle"
              className="my-year-select"
              value={year}
              onChange={newYear => {
                const now = value.clone().year(newYear)
                onChange(now)
              }}>
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="middle"
              value={month}
              onChange={newMonth => {
                const now = value.clone().month(newMonth)
                onChange(now)
              }}>
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    )
  }
)
