<template>
  <div class="search-bar">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        @input="onInput"
        @keyup.enter="onSearch"
        class="search-input"
      />
      <button @click="onSearch" class="search-button">
        🔍 Rechercher
      </button>
    </div>
    
    <div v-if="filters" class="filters">
      <select v-model="selectedCategory" @change="onCategoryChange" class="filter-select">
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  placeholder?: string
  filters?: boolean
  categories?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Rechercher...',
  filters: false,
  categories: () => []
})

const emit = defineEmits<{
  search: [query: string]
  categoryChange: [category: string]
}>()

const searchQuery = ref('')
const selectedCategory = ref('')

const onInput = () => {
  // Recherche en temps réel avec debounce
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 300)
}

let debounceTimer: ReturnType<typeof setTimeout>

const onSearch = () => {
  emit('search', searchQuery.value)
}

const onCategoryChange = () => {
  emit('categoryChange', selectedCategory.value)
}

// Nettoyer le timer quand le composant est détruit
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

<style scoped>
.search-bar {
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.search-button:hover {
  transform: translateY(-2px);
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #3498db;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .search-button {
    width: 100%;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>
