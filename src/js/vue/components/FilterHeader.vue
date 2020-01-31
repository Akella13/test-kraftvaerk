<template>
  <div>
    <section class="filter__top">
      <h4>HAE</h4>
      <div class="filter__top-search">
        <input type="text" v-model="query">
        <button type="button">Search</button>
      </div>
      <div class="filter__top-pag">
        <h5>Lajitteluperuste</h5>
        <button
          v-for="item in pagination"
          :key="item"
          :class="{ 'filter__top-pag--active': item === pagActive }"
          @click="pagActive = item">
          {{ item }}
        </button>
      </div>
    </section>

    <section class="filter__bottom">
      <h5>Valitse maalaustyö</h5>
      <div>
        <button
          v-for="filter in filters"
          :key="filter"
          :class="{ 'filter__bottom-button--active': filter.active }"
          @click="filter.active = !filter.active">
          {{ filter.name }}
        </button>
      </div>
    </section>

    <hr>
    <p>Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      pagination: [
        'Työnäytteet',
        'Nimi',
        'Palaute',
      ],
      pagActive: 'Työnäytteet',
      filters: [
        {
          name: 'Terassit',
          active: false,
        },
        {
          name: 'Katot',
          active: false,
        },
        {
          name: 'Puujulkisivut',
          active: false,
        },
        {
          name: 'Tasoitustyöt',
          active: false,
        },
        {
          name: 'Efektimaalaus',
          active: false,
        },
        {
          name: 'Sisämaalaukset',
          active: false,
        },
        {
          name: 'Lattiat',
          active: false,
        },
        {
          name: 'Kivijulkisivut ja sokkelit',
          active: false,
        },
        {
          name: 'Ovet ikkunat ja kalusteet',
          active: false,
        },
      ]
    }
  },
}
</script>