<template>
  <div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <li v-for="(item,index) in result" :key="index">
        {{ item.Name }}
        <img :src="`data:image/png;base64,${item.Logo}`">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';

export default {
  directives: { infiniteScroll },
  data() {
    return {
      result: [],
      nextPage: 1,
      busy: false,
    }
  },
  computed: {
    ...mapGetters([
      'params',
    ])
  },
  watch: {
    params() {
      // reset result while pulling new data
      this.result = [];
      this.nextPage = 1;
      this.pullResults(1);
    }
  },
  methods: {
    pullResults(pageNumber) {
      this.busy = true;
      axios({
        method: 'get',
        url: `/public/data/pages/${this.params.SortField}/${pageNumber}.json`,
        params: this.params,
      })
        .then((response) => {
          // fake ajax response timeout
          setTimeout(() => {
            this.result.push(...response.data);
            this.nextPage += 1;
            this.busy = false;
          }, 1000);
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    },
    loadMore: function() {
      if (this.nextPage < 7) {
        this.pullResults(this.nextPage);
      }
    },
  }
}
</script>