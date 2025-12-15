<template>
  <div>
    <h2>Все выданные книги</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка загрузки: {{ error }}</div>
    <div v-else-if="users.length === 0">Нет выданных книг</div>

    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-section">
        <div v-if="user.copies && user.copies.length > 0">
          <h5>
            Читатель ID: {{ user.id }} — {{ user.last_name }} {{ user.first_name }}
            {{ user.middle_name }}
          </h5>

          <DataTable :value="user.copies" responsiveLayout="scroll">
            <Column field="id" header="ID экземпляра" />
            <Column header="Издание">
              <template #body="slotProps">
                {{ slotProps.data.edition?.name || '—' }}
              </template>
            </Column>
            <Column field="wear_coefficient" header="Коэффициент износа" />
            <Column header="Дата выдачи">
              <template #body="slotProps">
                {{ slotProps.data.pivot?.lending_date || '—' }}
              </template>
            </Column>
            <Column header="План. возврат">
              <template #body="slotProps">
                {{ slotProps.data.pivot?.plan_return_date || '—' }}
              </template>
            </Column>
            <Column header="Факт. возврат">
              <template #body="slotProps">
                {{ slotProps.data.pivot?.fact_return_date || '—' }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  name: 'LendingBook',
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      users: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchLendings()
  },
  methods: {
    async fetchLendings() {
      try {
        this.loading = true
        this.error = null

        const authStore = useAuthStore()
        const token = authStore.token

        const response = await axios.get('http://www.libcore.ru:8001/api/lending', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.users = response.data
      } catch (error) {
        console.error('Ошибка загрузки выданных книг:', error)
        this.error = 'Не удалось загрузить данные о выданных книгах'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
h2 {
  font-weight: bold;
  margin-bottom: 20px;
}

.user-section {
  margin-bottom: 30px;
}

.user-section h5 {
  margin: 20px 0 10px 0;
  color: #333;
  font-weight: bold;
}
</style>
