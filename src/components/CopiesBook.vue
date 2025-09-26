<template>
  <div>
    <h2>Список экземпляров книг</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка загрузки: {{ error }}</div>
    <div v-else-if="copies.length === 0">Экземпляры книг не найдены</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID издания</th>
            <th>Коэффициент износа</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="copy in copies" :key="copy.id">
            <td>{{ copy.id }}</td>
            <td>{{ copy.edition_id }}</td>
            <td>{{ copy.wear_coefficient }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'CopiesBook',
  data() {
    return {
      copies: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchCopies()
  },
  methods: {
    async fetchCopies() {
      try {
        this.loading = true
        this.error = null

        const authStore = useAuthStore()
        const token = authStore.token

        const response = await axios.get('http://127.0.0.1:8000/api/copy', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.copies = response.data
      } catch (error) {
        console.error('Ошибка загрузки экземпляров:', error)
        this.error = 'Не удалось загрузить список экземпляров'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
h2 {
  font-weight: bold;
}
</style>
