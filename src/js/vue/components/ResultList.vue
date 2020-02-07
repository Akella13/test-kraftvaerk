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
        url: `/public/data/pages/${pageNumber}.json`,
        params: this.params,
      })
        .then((response) => {
          this.result = response.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    },
  }
}
</script>