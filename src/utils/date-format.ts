import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// UTC时间格式化
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}

// 时间戳时间格式化
export function formatTimeStamp(
  timeStamp: number,
  format: string = DATE_TIME_FORMAT
) {
  if (Number.isInteger(timeStamp)) {
    if (timeStamp.toString().length === 13) {
      // 毫秒
      return dayjs(timeStamp).format(format)
    } else if (timeStamp.toString().length === 10) {
      // 秒
      return dayjs(timeStamp).format(format)
    }
  }
}
