<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user" class="welcome-container">
        <div class="welcome-card">
          <div class="welcome-content">
            <span class="welcome-text">Welcome, </span>
            <span class="user-name">{{ user.name }}</span>
          </div>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>

      <div v-else class="auth-container">
        <h2>Вход в систему</h2>
        <form @submit.prevent="login" class="auth-form">
          <div class="form-group">
            <label for="email"><strong>E-mail:</strong></label>
            <input v-model="email" type="email" id="email" placeholder="admin@admin.ru" required />
            <div class="input-hint">Введите ваш email</div>
          </div>

          <div class="form-group">
            <label for="password"><strong>Пароль:</strong></label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Введите пароль"
              required
            />
            <div class="input-hint">Введите ваш пароль</div>
          </div>

          <button type="submit" class="login-btn">Войти</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    },
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password })
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  },
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.auth-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
}

label strong {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.input-hint {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  font-style: italic;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0056b3;
}

.error {
  color: #dc3545;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

/* Стили для placeholder */
input::placeholder {
  color: #999;
  font-size: 14px;
}

.welcome-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.welcome-card {
  background: white;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.welcome-content {
  display: flex;
  flex-direction: column;
}

.welcome-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
