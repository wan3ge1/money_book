export const LIST_VIEW = 'list_view'
export const CHART_VIEW = 'chart_view'
export const TYPE_INCOME = 'income'
export const TYPE_OUTCOME = 'outcome'

export const range = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

export const padLeft = value => {
  return value < 10 ? '0' + value : value
}

export const parseToYearAndMonth = () => {
  let d = new Date()
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1
  }
}
