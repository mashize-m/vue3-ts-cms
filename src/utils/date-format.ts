import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// UTC时间格式化
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 时间偏移8小时：utcOffset(8)
  return dayjs.utc(utcString).utcOffset(8).format(format)
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
