<template>
  <div>
    <h2>Список экземпляров книг</h2>
    <DataTable
      :value="copies"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="copies_total"
      @page="onPageChange"
      responsiveLayout="scroll"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column header="Наименование издания">
        <template #body="slotProps">
          {{ slotProps.data.edition?.name }}
        </template>
      </Column>
      <Column field="wear_coefficient" header="Коэффициент износа" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'Copy',
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    copies() {
      return this.dataStore.copy
    },
    copies_total() {
      return this.dataStore.copy_total
    },
  },
  mounted() {
    console.log('CopyBook component MOUNTED!')
    this.dataStore.get_copy()
    this.dataStore.get_copy_total()
    console.log('Copies-', this.copies)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_copy(this.offset / this.perpage, this.perpage)
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
