import axios from 'axios'
import Vue from 'vue'

const store = new Vue({
  data: {
    bases: [],
    toppings: [],
    toppingCombinations: []
  }
})

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
  .then(({ data }) => {
    const bases = data.records.map(v => v.fields)
    store.bases.push(...bases)
  })

// トッピングを取得
axios.get('toppings?view=JSON')
  .then(({ data }) => {
    const toppings = data.records.map(v => v.fields)
    store.toppings.push(...toppings)

    // トッピングの組み合わせを作成
    const toppingCombinations = createCombinations(toppings, 3)

    // 「トッピングなし」を追加
    toppingCombinations.unshift([{
      name: 'トッピングなし',
      price: 0
    }])

    // IDと合計金額プロパティを付与
    toppingCombinations.forEach((v, i) => {
      toppingCombinations[i].id = v.map(v => v.name).join()
      toppingCombinations[i].total = v.reduce((prev, curr) => prev + curr.price, 0)
    })

    store.toppingCombinations.push(...toppingCombinations)
  })

export default store
