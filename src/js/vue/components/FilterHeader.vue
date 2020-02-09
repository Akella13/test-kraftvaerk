<template>
  <div>
    <section class="filter__top">
      <h4 class="heading heading__filter">HAE</h4>
      <form class="filter__search" @submit.prevent="queryUpdate(query)">
        <input class="filter__search-input" type="text" v-model="query">
        <button class="filter__search-button" type="submit">Search</button>
      </form>
      <div class="filter__top-sorting">
        <h4 class="heading heading__filter">Lajitteluperuste</h4>
        <div>
          <button
            v-for="(sorting, index) in sortings"
            :key="index"
            class="button button--round filter__top-sorting"
            :class="{ 'filter__top-sorting--active': sorting === sortingActive }"
            @click="sortingUse(sorting)"
          >
            {{ sorting.Heading }}
          </button>
        </div>
      </div>
    </section>

    <section class="filter__bottom">
      <h5 class="heading heading__filter">Valitse maalaustyö</h5>
      <div>
        <button
          v-for="filter in filters"
          :key="filter.Id"
          class="filter__bottom-button"
          :class="{ 'filter__bottom-button--active': filtersActive.includes(filter) }"
          @click="filtersUpdate(filter)"
        >
          {{ filter.Name }}
        </button>
      </div>
    </section>

    <hr class="hr">
    <p>Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      query: '',
      sortings: [],
      filters: [],
    }
  },
  computed: {
    ...mapState([
      'sortingActive',
      'filtersActive',
    ])
  },
  mounted() {
    // pull sorting types and assign them to data
    this.pullRequest('sortings', 'sortings')
      .then(() => {
        // use default sorting, so send first request
        this.sortingUse(this.sortings[0]);
      });
    // pull filter types and assign them to data
    this.pullRequest('filters', 'filters');
  },
  methods: {
    ...mapMutations([
      'queryUpdate',
      'sortingUse',
      'filtersUpdate',
    ]),
    async pullRequest(url, target) {
      const response = await axios.get(`/public/data/${url}.json`);
      try {
        this.$data[target] = response.data;
      } catch (error) {
        console.error(error.response.data);
      }
    },
  },
}
</script>