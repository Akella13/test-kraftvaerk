<template>
  <div>
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
      class="container"
    >
      <li v-for="(item, index) in result"
       :key="index"
       class="row card"
      >
        <div class="col-12 col-md-2">
          <div class="card__img">
            <img :src="`data:image/png;base64,${item.Logo}`">
          </div>
        </div>
        <div class="col-12 col-md-8">
          <a class="link card__name" :href="`/company/${item.UrlFriendlyName}`">
            {{ item.Name }}
          </a>
          <div class="card__city">
            {{ item.City }}
          </div>
          <a class="link card__phone" :href="`tel:${item.PhoneNumber}`">
            {{ item.PhoneNumber }}
          </a>
          <a class="link card__email" :href="`mailto:${item.Email}`">
            {{ item.Email }}
          </a>
          <div class="card__desc">
            {{ item.Description }}
          </div>
          <ul class="card__certs">
            <li v-for="cert in item.Certificates"
              :key="cert.Id"
              class="card__cert-item"
            >
              {{ cert.Name }}
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-2">
          <button class="button button__card" type="button">
            Pyydä tarjous!
          </button>
          <div>{{ item.NumberOfProjects }}</div>
        </div>
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