import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
		query: '',
		sortingActive: null,
		filtersActive: [],
	},
	mutations: {
		queryUpdate(state, payload) {
			state.query = payload;
		}
	},
})