<template>
  <div>
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
      class="container"
    >
      <li v-for="(item, index) in result" :key="index">
        <img :src="`data:image/png;base64,${item.Logo}`">
        <div>{{ item.Name }}</div>
        <div>{{ item.City }}</div>
        <div>{{ item.PhoneNumber }}</div>
        <div>{{ item.Email }}</div>
        <div>{{ item.Description }}</div>
        <div>{{ item.Description }}</div>
        <ul>
          <li v-for="cert in item.Certificates" :key="cert.Id">
            {{ cert.Name }}
          </li>
        </ul>
        <div>{{ item.NumberOfProjects }}</div>
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
      loading: false,
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
      this.loading = true;
      axios({
        method: 'get',
        url: `/public/data/pages/${this.params.SortField}/${pageNumber}.json`,
        params: {
          ...this.params,
          pageNumber,
        },
      })
        .then((response) => {
          // fake ajax response timeout
          setTimeout(() => {
            this.result.push(...response.data);
            this.nextPage += 1;
          }, 1000);
        })
        .catch((error) => {
          // if there are no next pages
          setTimeout(() => {
            if (error.response.status === 404) {
              this.nextPage = 0;
            }
          }, 1000)
          console.error(error.response.data);
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        })
    },
    loadMore() {
      if (this.nextPage > 0 && this.params.SortField) {
        this.pullResults(this.nextPage);
      }
    },
  }
}
</script>