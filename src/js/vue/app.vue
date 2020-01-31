<template>
  <div>
    <filter-header></filter-header>
    <result-list></result-list>
  </div>
</template>

<script>
// component with all filtering abilities
import FilterHeader from './components/FilterHeader';
// component which renders results according to those filters
import ResultList from './components/ResultList';

export default {
  components: {
    FilterHeader,
    ResultList,
  },
  data() {
    return {
      greeting: 'wassup',
    }
  }
}
</script>