<template>
  <div>
    <section class="filter__top">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-2">
            <h4 class="heading heading__filter">HAE</h4>
          </div>
          <div class="col-5">
            <form class="search" @submit.prevent="queryUpdate(query)">
              <input class="search__input" type="text" v-model="query">
              <button class="search__button" type="submit">Search</button>
            </form>
          </div>
          <div class="col-12 col-md-5">
            <div class="filter__top-sorting d-flex">
              <h4 class="heading heading__filter">Lajitteluperuste</h4>
              <div class="tab">
                <button
                  v-for="(sorting, index) in sortings"
                  :key="index"
                  class="tab__button"
                  :class="{ 'filter__top-sorting--active': sorting === sortingActive }"
                  @click="sortingUse(sorting)"
                >
                  {{ sorting.Heading }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>

    <section class="filter__bottom">
      <div class="container">
          <div class="row">
              <div class="col">
                <h5 class="heading heading__filter">Valitse maalaustyö</h5>
                <div>
                  <button
                    v-for="filter in filters"
                    :key="filter.Id"
                    class="button button--round"
                    :class="{ 'filter__bottom-button--active': filtersActive.includes(filter) }"
                    @click="filtersUpdate(filter)"
                  >
                    {{ filter.Name }}
                  </button>
                </div>
              </div>
          </div>
      </div>
      <hr class="hr">
      <p class="filter__bottom-desc">Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
    </section>
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