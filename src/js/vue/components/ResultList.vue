<template>
  <div>
    <ul>
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

export default {
  data() {
    return {
      result: null,
    }
  },
  computed: {
    ...mapGetters([
      'params',
    ])
  },
  watch: {
    params() {
      this.pullResults(1);
    }
  },
  methods: {
    pullResults(pageNumber) {
      axios({
        method: 'get',
        url: `/public/data/pages/${this.params.SortField}/${pageNumber}.json`,
        params: this.params,
      })
        .then((response) => {
          this.result = null;
          // fake ajax response timeout
          setTimeout(() => {
            this.result = response.data;
          }, 1000);
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    },
  }
}
</script>