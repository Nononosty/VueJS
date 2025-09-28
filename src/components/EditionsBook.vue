<template>
  <div>
    <h2>Список изданий книг</h2>
    <DataTable
      :value="editions"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="editions_total"
      @page="onPageChange"
      responsiveLayout="scroll"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column field="name" header="Наименование издания" />
      <Column field="author" header="Автор" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'Editions',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    editions() {
      return this.dataStore.edition // используем edition из store
    },
    editions_total() {
      return this.dataStore.edition_total // используем edition_total из store
    },
  },
  mounted() {
    console.log('Editions component MOUNTED!')
    this.dataStore.get_edition()
    this.dataStore.get_edition_total()
    console.log('Editions-', this.editions)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_edition(this.offset / this.perpage, this.perpage)
    },
  },
}
</script>

<style scoped>
h2 {
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
