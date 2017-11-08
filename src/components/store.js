import axios from 'axios'

const store = {
  bases: [],
  toppings: [],
  toppingCombinations: []
}

const createCombinations = (arr, maxCount) => {
  const ret = [];

  (function innerFn (currentIndex = 0, count = 1, passedArr = []) {
    for (let i = currentIndex, len = arr.length; i < len; i++) {
      const tmpArr = passedArr.concat(arr[i])
      ret.push(tmpArr)

      if (count < maxCount) {
        innerFn(i + 1, count + 1, tmpArr)
      }
    }
  }())

  return ret
}

// デフォルト設定
axios.defaults.baseURL = 'https://api.airtable.com/v0/appg4X4RrCUFnVZUE'
axios.defaults.headers.common.Authorization = 'Bearer keyxkfl5JQ2YPKU8i'

// ベースを取得
axios.get('bases?view=JSON')
  .then((res) => {
    const fields = res.data.records.map(v => v.fields)
    store.bases.push(...fields)
  })

// トッピングを取得
axios.get('toppings?view=JSON')
  .then((res) => {
    const fields = res.data.records.map(v => v.fields)
    store.toppings.push(...fields)

    const combinations = createCombinations(fields, 3)

    // 「トッピングなし」を追加
    combinations.unshift([{
      name: 'トッピングなし',
      price: 0
    }])

    // 合計金額
    combinations.forEach((v, i) => {
      const total = v.reduce((prev, curr) => prev + curr.price, 0)
      combinations[i].total = total
    })

    store.toppings.push(...fields)
    store.toppingCombinations.push(...combinations)
  })

export default store
