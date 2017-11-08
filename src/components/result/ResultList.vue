<template>
  <div>
    <q-list separator v-if="pageItems.length">
      <q-item v-for="itemSet of pageItems" :key="timestamp">
        <q-item-main>
          <template v-for="item of itemSet">
            {{ item.name }}
            <small v-if="item.is_limited">
              ［期間限定］
            </small>
            <br>
          </template>
        </q-item-main>
        <q-item-side right>
          <span>{{ (itemSet.total + baseTotal).toLocaleString() }}</span>
          円
        </q-item-side>
      </q-item>
    </q-list>
    <q-list separator v-else>
      <q-item>条件に合う組み合わせはありません</q-item>
    </q-list>

    <div class="text-center">
      <q-pagination v-model="page" :max="maxPages" />
    </div>

  </div>
</template>

<script>
const PER_PAGE = 5

export default {
  name: 'result-list',
  props: ['baseTotal', 'results', 'timestamp'],
  data () {
    return {
      page: 1
    }
  },
  activated () {
    this.page = 1
  },
  computed: {
    maxPages () {
      return Math.ceil(this.results.length / PER_PAGE)
    },
    pageItems () {
      const start = (this.page - 1) * PER_PAGE
      return this.results.slice(start, start + 5)
    }
  },
  watch: {
    results () {
      this.page = 1
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.q-list {
  padding: 0;
}
.q-item {
  font-size: 13px;
}
.q-item-side-right {
  display: block;
  font-size: 11px;
  white-space: nowrap;
}
.q-item-side-right span {
  font-size: 14px;
  font-weight: 500;
}
</style>
