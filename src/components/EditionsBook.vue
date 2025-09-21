<template>
  <div>
    <h2>Список изданий</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка загрузки: {{ error }}</div>
    <div v-else-if="editions.length === 0">Издания не найдены</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Наименование</th>
            <th>Автор</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="edition in editions" :key="edition.id">
            <td>{{ edition.id }}</td>
            <td>{{ edition.name }}</td>
            <td>{{ edition.author }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditionsList',
  data() {
    return {
      editions: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchEditions()
  },
  methods: {
    async fetchEditions() {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get('http://127.0.0.1:8000/api/edition')
        this.editions = response.data
      } catch (error) {
        console.error('Ошибка загрузки изданий:', error)
        this.error = 'Не удалось загрузить список изданий'
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
</style>
