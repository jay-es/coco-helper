<template>
  <section>
    <p>
      <label class="caption">ベース:</label>
        <a href="http://www.ichibanya.co.jp/menu/area_kakaku.html"
          target="_blank" class="area_kakaku"
        >地域別価格について</a>
      <q-select class="no-margin" v-model="baseIndex" :options="baseOptions" />
    </p>

    <p>
      <label class="caption">ライス:</label> {{ riceAmount }}g
      <q-slider snap markers v-model="riceAmount" :min="200" :max="700" :step="100" />
    </p>

    <p>
      <label class="caption">辛さ:</label> {{ hotAmount | hotFilter }}
      <q-slider snap markers v-model="hotAmount" :min="0" :max="5" />
    </p>

    <p>
      <q-checkbox v-model="isAddSource" label="カレーソース増量" />
    </p>
  </section>
</template>

<script>
import store from '../store'

export default {
  name: 'base-settings',
  data () {
    return {
      baseIndex: 0,
      bases: store.bases,
      hotAmount: 0,
      isAddSource: false,
      riceAmount: 300
    }
  },
  computed: {
    baseOptions () {
      return this.bases.map((v, i) => ({
        label: v.name.replace('（', '<small>（').replace('）', '）</small>'),
        value: i
      }))
    },
    basePrice () {
      if (!this.bases.length) {
        return 0
      }

      return this.bases[this.baseIndex].price
    },
    baseTotal () {
      const ricePrice = (() => {
        if (this.riceAmount === 200) {
          return -51
        }
        else if (this.riceAmount === 300) {
          return 0
        }

        return (this.riceAmount - 300) * this.bases[this.baseIndex].riceRate
      })()

      const hotPrice = this.hotAmount * 21
      const sourcePrice = this.isAddSource ? 103 : 0

      return this.basePrice + ricePrice + hotPrice + sourcePrice
    }
  },
  filters: {
    hotFilter (value) {
      if (value === 0) {
        return '普通'
      }

      return `${value}辛`
    }
  },
  watch: {
    baseTotal (newValue) {
      this.$emit('update', newValue)
    }
  }
}
</script>

<style scoped>
.area_kakaku {
  float: right;
  font-size: 70%;
  color: inherit;
  text-decoration: underline;
}
</style>
