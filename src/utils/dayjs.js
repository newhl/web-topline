import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

export const fmDate = (value) => {
  // dayjs获取当前时间(dayjs中一个特殊的对象)
  // dayjs(value) 指定的时间, (dayjs中一个特殊的对象)
  return dayjs().to(dayjs(value))
}
