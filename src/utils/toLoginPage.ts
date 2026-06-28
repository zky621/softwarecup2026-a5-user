import { getLastPage } from '@/utils'
import { debounce } from '@/utils/debounce'

interface ToLoginPageOptions {
  mode?: 'navigateTo' | 'reLaunch'
  queryString?: string
}

const LOGIN_ENTRY_PAGE = '/pages/me/me'

/**
 * 小程序端不使用额外账号密码登录页，统一回到“我的”页触发微信登录。
 */
export const toLoginPage = debounce((_options: ToLoginPageOptions = {}) => {
  const currentPage = getLastPage()
  const currentPath = `/${currentPage.route}`

  if (currentPath === LOGIN_ENTRY_PAGE) {
    uni.showToast({ title: '请使用微信登录', icon: 'none' })
    return
  }

  uni.showToast({ title: '请先登录', icon: 'none' })
  uni.switchTab({ url: LOGIN_ENTRY_PAGE })
}, 500)
