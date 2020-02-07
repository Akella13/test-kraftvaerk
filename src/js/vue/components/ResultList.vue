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

export default {
  data() {
    return {
      result: null,
    }
  },
  mounted() {
    this.pullResults();
  },
  methods: {
    pullResults() {
      axios({
        method: 'get',
        url: '/public/data/pages/1.json',
      })
        .then((response) => {
          this.result = response.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    }
  }
}
</script>