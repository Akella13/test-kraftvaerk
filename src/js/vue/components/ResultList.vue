<template>
  <div>
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
      class="container pb-3"
    >
      <li v-for="(item, index) in result"
       :key="index"
       class="row card"
      >
        <div class="col-12 col-md-2">
          <div>
            <img class="w-100" :src="`data:image/png;base64,${item.Logo}`">
          </div>
        </div>
        <div class="col-12 col-md-8 card__section">
          <a class="link card__name" :href="`/company/${item.UrlFriendlyName}`">
            {{ item.Name }}
          </a>
          <div class="card__city">
            <i class="icon icon--text icon--city"></i>
            {{ item.City }}
          </div>
          <span>
            <i class="icon icon--text icon--phone"></i>
            <a class="link card__contact" :href="`tel:${item.PhoneNumber}`">
              {{ item.PhoneNumber }}
            </a>
          </span>
          <span>
            <i class="icon icon--text icon--mail"></i>
            <a class="link card__contact" :href="`mailto:${item.Email}`">
              {{ item.Email }}
            </a>
          </span>
          <div class="card__desc">
            {{ item.Description }}
          </div>
          <ul class="card__cert-wrapper">
            <li v-for="cert in item.Certificates"
              :key="cert.Id"
              class="card__cert-item"
            >
              {{ cert.Name }}
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-2">
          <button
            class="button button__card"
            type="button"
            :class="{ 'button__card--active': cart.includes(item) }"
            @click="cartUpdate(item)"
          >
            <span v-if="cart.includes(item.ID)">
              <i class="icon icon--check"></i>
              <span>Lisätty listalle</span>
            </span>
            <span v-else>Pyydä tarjous!</span>
          </button>
          <div class="py-4 pl-3">
            <span class="icon icon--garage card__projects"></span><br>
            <strong class="ml-1">{{ item.NumberOfProjects }}</strong>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapMutations } from 'vuex';
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
    ...mapState([
      'cart',
    ]),
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
    ...mapMutations([
      'cartUpdate',
    ]),
  }
}
</script>