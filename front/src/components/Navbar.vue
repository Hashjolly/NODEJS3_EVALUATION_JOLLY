<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">
          <h1>🪑 Furniture Design</h1>
        </router-link>
      </div>
      
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item" @click="closeMenu">
            🏠 Accueil
          </router-link>
          <router-link to="/furniture" class="navbar-item" @click="closeMenu">
            🪑 Meubles
          </router-link>
          <router-link to="/materials" class="navbar-item" @click="closeMenu">
            🧱 Matériaux
          </router-link>
          <router-link to="/suppliers" class="navbar-item" @click="closeMenu">
            🏭 Fournisseurs
          </router-link>
          <router-link to="/about" class="navbar-item" @click="closeMenu">
            ℹ️ À propos
          </router-link>
          <router-link to="/contact" class="navbar-item" @click="closeMenu">
            📞 Contact
          </router-link>
        </div>
      </div>
      
      <div class="navbar-burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 5vh;
  display: flex;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  text-decoration: none;
  color: white;
}

.brand-link h1 {
  margin: 0;
  margin-right: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-start {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.navbar-burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem;
}

.navbar-burger span {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 2px 0;
  transition: 0.3s;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-burger {
    display: flex;
  }
  
  .navbar-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    padding: 1rem 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .navbar-menu.is-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .navbar-start {
    flex-direction: column;
    width: 100%;
  }
  
  .navbar-item {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
