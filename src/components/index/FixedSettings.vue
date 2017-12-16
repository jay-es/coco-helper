<template>
  <section class="fixed-settings">
    <header>固定トッピング<small>（オプション）</small></header>
    <p>
      <label class="caption">カテゴリ:</label>
      <q-select class="no-margin" v-model="categoryId" :options="categoryOptions" />
    </p>

    <p v-if="categoryId !== null">
      <label class="caption">トッピング:</label>
      <q-select class="no-margin" v-model="toppingId" :options="toppingOptions" />
    </p>
  </section>
</template>

<script>
import store from '../store'

const any = { label: '特になし', value: null }

export default {
  name: 'fixed-settings',
  data () {
    return {
      categoryId: null,
      toppingId: null
    }
  },
  computed: {
    categoryOptions () {
      const retArr = store.categories.map((v, i) => ({ label: v, value: i }))
      retArr.unshift(any)
      return retArr
    },
    toppingOptions () {
      const fixedCategory = store.categories[this.categoryId]

      const retArr = store.toppings
        .map((v, i) => ({ category: v.category, label: v.name, value: i }))
        .filter(v => v.category === fixedCategory)
      retArr.unshift(any)
      return retArr
    }
  },
  watch: {
    categoryId (newValue) {
      this.toppingId = null
      this.$emit('update:categoryId', newValue)
    },
    toppingId (newValue) {
      this.$emit('update:toppingId', newValue)
    }
  }
}
</script>

<style>
.fixed-settings {
  margin-bottom: 1em;
  padding: .75em .75em 0;
  border: 1px dashed #ddd;
}
.fixed-settings header {
  font-size: 13px;
}
</style>
