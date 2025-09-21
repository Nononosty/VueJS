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
          <table>
            <thead>
              <tr>
                <th>ID экземпляра</th>
                <th>Издание</th>
                <th>Коэффициент износа</th>
                <th>Дата выдачи</th>
                <th>План. возврат</th>
                <th>Факт. возврат</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="copy in user.copies" :key="copy.id">
                <td>{{ copy.id }}</td>
                <td>{{ copy.edition?.name || '—' }}</td>
                <td>{{ copy.wear_coefficient }}</td>
                <td>{{ copy.pivot?.lending_date }}</td>
                <td>{{ copy.pivot?.plan_return_date }}</td>
                <td>{{ copy.pivot?.fact_return_date || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'LendingBook',
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

        // эндпоинт для получения выданных книг
        const response = await axios.get('http://127.0.0.1:8000/api/lending', {
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
.user-section {
  margin-bottom: 30px;
}

.user-section h5 {
  margin: 20px 0 10px 0;
  color: #333;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
