<template>
  <div>
    <button
      type="button"
      class="button button--transparent button__header"
      :class="{ 'button--active': cart.length > 0 }"
    >
      <span>Pyydä tarjous</span>
      <span v-show="cart.length > 0">{{ cart.length }}</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'cart',
    ]),
  },
}
</script>