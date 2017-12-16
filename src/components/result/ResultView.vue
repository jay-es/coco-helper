<template>
  <div class="layout-padding">
    <section class="row">
      <label class="col-xs-4">トッピング:</label>
      <p class="col-xs-8">
        <q-checkbox v-model="counts" val="1" label="1個" />
        <q-checkbox v-model="counts" val="2" label="2個" />
        <q-checkbox v-model="counts" val="3" label="3個" />
      </p>
    </section>

    <section class="row">
      <label class="col-xs-4">並び順:</label>
      <p class="col-xs-8">
        <q-radio v-model="sortOrder" val="random" label="ランダム" />
        <q-radio v-model="sortOrder" val="priceAsc" label="価格順" />
      </p>
    </section>

    <result-list
      :base-total="baseTotal"
      :results="results"
    ></result-list>
  </div>
</template>

<script>
import store from '../store'
import ResultList from './ResultList.vue'

export default {
  name: 'result-view',
  components: {
    ResultList
  },
  props: ['baseTotal', 'categoryId', 'maxPrice', 'minPrice', 'toppingId'],
  data () {
    return {
      counts: ['1', '2', '3'],
      sortOrder: 'random',
      timestamp: 0
    }
  },
  activated () {
    this.updateTimestamp()
  },
  computed: {
    // 条件に合う組み合わせの配列
    filtered () {
      const counts = this.counts.map(v => Number(v))
      const { categoryId, toppingId } = this
      const fixedCategory = store.categories[categoryId]
      const fixedTopping = store.toppings[toppingId]

      return store.toppingCombinations.filter((itemSet) => {
        // 個数
        if (counts.indexOf(itemSet.length) === -1) {
          return false
        }

        // カテゴリー指定（組み合わせ内の全トッピングが該当しなければ終了）
        if (fixedCategory && itemSet.every(v => v.category !== fixedCategory)) {
          return false
        }

        // トッピング指定（組み合わせ内の全トッピングが該当しなければ終了）
        if (fixedTopping && itemSet.every(v => v !== fixedTopping)) {
          return false
        }

        // 価格
        const price = this.baseTotal + itemSet.total
        return price >= this.minPrice && price < this.maxPrice
      })
    },
    // filteredを並べ替えた配列
    results () {
      const filtered = this.filtered.slice(0, this.timestamp)

      if (this.sortOrder === 'random') {
        // シャッフル
        for (let i = filtered.length; i--;) {
          const r = Math.floor(Math.random() * i);
          [filtered[i], filtered[r]] = [filtered[r], filtered[i]]
        }
      }
      else if (this.sortOrder === 'priceAsc') {
        // 価格順
        filtered.sort((a, b) => a.total - b.total)
      }

      return filtered
    }
  },
  methods: {
    updateTimestamp () {
      this.timestamp = Date.now()
    }
  }
}
</script>

<style>
.q-pagination .q-btn {
  padding: 0 10px !important
}
.q-pagination .q-input {
  margin-right: 5px;
  margin-left: 5px;
  max-width: 6rem;
}
</style>
