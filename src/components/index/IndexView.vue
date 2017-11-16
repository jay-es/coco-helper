<template>
  <div class="layout-padding">
    <section>
      <p>
        <label class="caption">最小金額:</label> {{ minPrice | numFilter }}円
        <q-slider snap v-model="minPrice" :min="450" :max="maxPrice" :step="10" />
      </p>

      <p>
        <label class="caption">最大金額:</label> {{ maxPrice | numFilter }}円
        <q-slider snap v-model="maxPrice" :min="minPrice" :max="1500" :step="10" />
      </p>
    </section>

    <base-settings @update="v => baseTotal = v"></base-settings>

    <q-btn color="primary" class="full-width" @click="goNext">絞り込む</q-btn>

    <p class="copyright">&copy;jshindo-gladd</p>
  </div>
</template>

<script>
import BaseSettings from './BaseSettings.vue'

export default {
  name: 'index',
  components: {
    BaseSettings
  },
  data () {
    return {
      baseTotal: 0,
      maxPrice: 1000,
      minPrice: 450
    }
  },
  filters: {
    numFilter (value) {
      return value.toLocaleString()
    }
  },
  methods: {
    goNext () {
      this.$router.push({
        name: 'result',
        query: this.$data
      })
    }
  }
}
</script>

<style>
.caption {
  font-size: 85%;
  font-weight: 600;
}
.copyright {
  margin: 1.5em 0 0;
  font-size: 95%;
  font-weight: 300;
  text-align: center;
}
</style>
