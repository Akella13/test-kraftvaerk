<template>
  <div>
    <button class="button button--transparent button__header" type="button">
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
    ])
  },
}
</script>