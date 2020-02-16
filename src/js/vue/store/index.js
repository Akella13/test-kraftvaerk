import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';

Vue.use(Vuex);
Vue.use(VueCookie);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
		query: '',
		sortingActive: {},
		filtersActive: [],
		cart: [],
	},
	getters: {
		params(state) {
			return {
				Searchstring: state.query,
				SortBy: state.sortingActive.Reverse ? 'desc' : 'asc',
				SortField: state.sortingActive.Name,
				certificateStrings: state.filtersActive,
				pageNumber: 1,
				sc_lang: 'fi-FI',
				sc_site: 'FindPromotePainter',
			}
		},
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
			if (state.filtersActive.includes(payload.Name)) {
				state.filtersActive = state.filtersActive.filter(name => payload.Name !== name);
			} else {
				state.filtersActive.push(payload.Name);
			}
		},
		// include/exclude painter id if it is in cart
		cartUpdate(state, payload) {
			if (state.cart.includes(payload)) {
				state.cart = state.cart.filter(item => payload !== item);
			} else if (state.cart.length < 3) {
				state.cart.push(payload);
			}
			Vue.cookie.set('tikkurila-mypainters', JSON.stringify({
				painters: [
					...state.cart.map(item => ({ id: item.ID }))
				]
			}));
		},
	},
})