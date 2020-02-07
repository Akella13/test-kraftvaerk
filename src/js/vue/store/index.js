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
		// update search query value
		queryUpdate(state, payload) {
			state.query = payload;
		},
		// use sorting type
		sortingUse(state, payload) {
			state.sortingActive = payload;
		},
		// include/exclude filter if it is active
		filtersUpdate(state, payload) {
			if (state.filtersActive.includes(payload)) {
				state.filtersActive = state.filtersActive.filter(el => payload !== el);
			} else {
				state.filtersActive.push(payload);
			}
		},
	},
})