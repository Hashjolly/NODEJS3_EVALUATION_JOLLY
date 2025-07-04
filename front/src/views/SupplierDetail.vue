<template>
  <div class="supplier-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement...</p>
      </div>

      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <router-link to="/suppliers" class="btn btn-primary">Retour aux fournisseurs</router-link>
      </div>

      <div v-if="supplier && !loading && !error" class="supplier-content">
        <nav class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <router-link to="/suppliers">Fournisseurs</router-link>
          <span>/</span>
          <span>{{ supplier.name }}</span>
        </nav>

        <div class="supplier-info">
          <div class="supplier-header">
            <h1>{{ supplier.name }}</h1>
          </div>
          
          <p class="description">{{ supplier.description }}</p>
          
          <div class="contact-info">
            <h3>Informations de contact</h3>
            <div class="contact-grid">
              <div class="contact-item">
                <strong>📧 Email:</strong>
                <a :href="'mailto:' + supplier.contact.email">{{ supplier.contact.email }}</a>
              </div>
              <div class="contact-item">
                <strong>📞 Téléphone:</strong>
                <a :href="'tel:' + supplier.contact.phone">{{ supplier.contact.phone }}</a>
              </div>
              <div class="contact-item">
                <strong>📍 Adresse:</strong>
                <span>{{ supplier.contact.address }}</span>
              </div>
            </div>
          </div>

          <div class="actions">
            <router-link to="/contact" class="btn btn-primary">
              📞 Nous contacter
            </router-link>
            <router-link to="/suppliers" class="btn btn-secondary">
              ← Retour aux fournisseurs
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supplierService, type Supplier } from '../services/api'

const route = useRoute()
const supplier = ref<Supplier | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const id = route.params.id as string
    if (!id) {
      error.value = 'ID du fournisseur manquant'
      return
    }

    supplier.value = await supplierService.getById(id)
  } catch (err) {
    error.value = 'Erreur lors du chargement du fournisseur'
    console.error('Error loading supplier:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.supplier-detail {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
}

.breadcrumb {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.breadcrumb a {
  color: #3498db;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span {
  color: #7f8c8d;
  margin: 0 0.5rem;
}

.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.supplier-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stars {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.rating-value {
  font-size: 1rem;
  color: #7f8c8d;
}

.description {
  color: #7f8c8d;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-info {
  margin-bottom: 2rem;
}

.contact-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.contact-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item strong {
  color: #2c3e50;
}

.contact-item a {
  color: #3498db;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.specialties {
  margin-bottom: 2rem;
}

.specialties h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.specialty-tag {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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
  font-weight: 500;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .supplier-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .supplier-header h1 {
    font-size: 2rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
