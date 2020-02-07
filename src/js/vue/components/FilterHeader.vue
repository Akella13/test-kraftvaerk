<template>
  <div>
    <section class="filter__top">
      <h4>HAE</h4>
      <div class="filter__top-search">
        <input type="text" v-model="query">
        <button type="button">Search</button>
      </div>
      <div class="filter__top-sorting">
        <h5>Lajitteluperuste</h5>
        <button
          v-for="(sorting, index) in sortings"
          :key="index"
          :class="{ 'filter__top-sorting--active': sorting === sortingActive }"
          @click="sortingActive = sorting">
          {{ sorting.Heading }}
        </button>
      </div>
    </section>

    <section class="filter__bottom">
      <h5>Valitse maalaustyö</h5>
      <div>
        <button
          v-for="filter in filters"
          :key="filter.Id"
          :class="{ 'filter__bottom-button--active': filtersActive.includes(filter) }"
          @click="switchFilter(filter)">
          {{ filter.Name }}
        </button>
      </div>
    </section>

    <hr>
    <p>Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      sortings: [],
      sortingActive: null,
      filters: [],
      filtersActive: [],
    }
  },
  mounted() {
    this.pullSortings();
    this.pullFilters();
  },
  methods: {
    pullSortings() {
      axios({
        method: 'get',
        url: '/public/data/sortings.json',
      })
        .then((response) => {
          this.sortings = response.data;
          this.sortingActive = this.sortings[0];
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    },
    pullFilters() {
      axios({
        method: 'get',
        url: '/public/data/filters.json',
      })
        .then((response) => {
          this.filters = response.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    },
    switchFilter(item) {
      // remove or add filter basing on its activity
      if (this.filtersActive.includes(item)) {
        this.filtersActive = this.filtersActive.filter(el => item !== el);
      } else {
        this.filtersActive.push(item);
      }
    }
  },
}
</script>