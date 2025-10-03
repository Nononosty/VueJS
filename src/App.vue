<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="50" alt="Library Logo" />
      </span>
    </template>

    <template #item="{ item }">
      <router-link :to="item.route" class="flex align-items-center p-menuitem-link">
        <span :class="item.icon" class="mr-2"></span>
        <span>{{ item.label }}</span>
      </router-link>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-user mr-2"></span>
          <span class="mr-4">{{ user.name }}</span>
          <Button label="Выйти" @click="logout" class="p-button-text" />
        </div>

        <div v-else>
          <form @submit.prevent="login" class="flex align-items-center gap-2">
            <InputText
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-12rem"
              :class="{ 'p-invalid': authError }"
            />
            <InputText
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
              class="w-12rem"
              :class="{ 'p-invalid': authError }"
            />
            <Button type="submit" label="Войти" />
            <small v-if="authError" class="error ml-2">{{ authError }}</small>
          </form>
        </div>
      </div>
    </template>
  </Menubar>

  <div class="p-4">
    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

import Toast from 'primevue/toast'

export default {
  components: { Button, Menubar, InputText, Toast },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Выданные экземпляры',
          icon: 'pi pi-fw pi-book',
          route: '/',
        },
        {
          label: 'Издания',
          icon: 'pi pi-fw pi-folder',
          route: '/editions',
        },
        {
          label: 'Экземпляры',
          icon: 'pi pi-fw pi-copy',
          route: '/copies',
        },
      ],
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
.error {
  color: #e24c4c;
}

.p-menuitem-link {
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  border-radius: 3px;
}

.p-menuitem-link:hover {
  background-color: #f5f5f5;
}

.p-menuitem-link.router-link-active {
  background-color: #e9ecef;
  font-weight: bold;
}
</style>
