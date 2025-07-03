<template>
  <div class="card">
    <div class="card-image" v-if="imageUrl">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <div class="card-meta">
        <span v-if="price" class="card-price">{{ formatPrice(price) }}</span>
        <span v-if="category" class="card-category">{{ category }}</span>
      </div>
      <div class="card-actions">
        <button @click="$emit('click')" class="btn btn-primary">
          Voir détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  price?: number
  category?: string
  imageUrl?: string
}

defineProps<Props>()
defineEmits<{
  click: []
}>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-description {
  margin: 0 0 1rem 0;
  color: #7f8c8d;
  line-height: 1.6;
  flex: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #27ae60;
}

.card-category {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.card-actions {
  margin-top: auto;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

@media (max-width: 768px) {
  .card-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
