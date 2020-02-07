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
		},
		sortingUse(state, payload) {
			state.sortingActive = payload;
		},
		filtersUpdate(state, payload) {
			if (state.filtersActive.includes(payload)) {
				state.filtersActive = state.filtersActive.filter(el => payload !== el);
			} else {
				state.filtersActive.push(payload);
			}
		},
	},
})