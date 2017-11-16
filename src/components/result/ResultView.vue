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
      :timestamp="timestamp"
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
  props: ['baseTotal', 'maxPrice', 'minPrice'],
  data () {
    return {
      counts: ['1', '2', '3'],
      sortOrder: 'random',
      timestamp: 0,
      toppingCombinations: store.toppingCombinations
    }
  },
  activated () {
    this.updateTimestamp()
  },
  computed: {
    // 個数と値段で絞った配列
    filtered () {
      const counts = this.counts.map(v => Number(v))

      return this.toppingCombinations.filter((item) => {
        if (counts.indexOf(item.length) === -1) {
          return false
        }

        const price = this.baseTotal + item.total
        return price >= this.minPrice && price < this.maxPrice
      })
    },
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

<style lang="stylus">
</style>
