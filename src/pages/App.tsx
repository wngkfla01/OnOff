import { Route, Routes } from 'react-router-dom'
import { NavLayout } from 'components/index'
import {
  DayOff,
  Duty,
  AdminSchedule,
  AdminEmployee,
  HomeCalendar,
  SignUp,
  Login,
  MyPage
} from 'pages/index'
import { modalStore } from 'stores/index'
import { useAxiosInterceptor } from 'hooks/index'

import GlobalStyle from '@/GlobalStyle'
import { ConfigProvider, Modal } from 'antd'
import { config } from '@/GlobalThemeConfig'
import locale from 'antd/lib/locale/ko_KR'
import { useCallback } from 'react'

export const App = () => {
  const { modal, closeModal } = modalStore()

  const handleClickModalOk = useCallback(() => {
    modal.okCallback()
    closeModal()
  }, [modal, closeModal])

  const handleClcikModalCancel = useCallback(() => {
    if (modal.cancelCallback) {
      modal.cancelCallback()
    }
    closeModal()
  }, [modal, closeModal])

  useAxiosInterceptor()
  return (
    <>
      <GlobalStyle />
      <ConfigProvider theme={config} locale={locale}>
        <Routes>
          <Route element={<NavLayout />}>
            {/* 아래 Route Page 추가 */}
            <Route path="/" element={<HomeCalendar />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/day_off" element={<DayOff />} />
            <Route path="/duty" element={<Duty />} />
            <Route path="/admin/schedule" element={<AdminSchedule />} />
            <Route path="/admin/employee" element={<AdminEmployee />} />
          </Route>
          {/* Nav 필요없는 페이지는 아래 바로 Route 추가 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ConfigProvider>
      <Modal
        centered={true}
        closeIcon={null}
        title={modal.title}
        open={modal.isOpen}
        onOk={handleClickModalOk}
        onCancel={handleClcikModalCancel}
        okText={modal.okButton}
        cancelText={modal.cancelButton}
        cancelButtonProps={{ style: { display: `${modal.cancelCallback ? 'inline' : 'none'}` } }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{modal.content}</p>
      </Modal>
    </>
  )
}
