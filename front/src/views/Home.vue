<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">🪑 Furniture Design</h1>
        <p class="hero-subtitle">
          Découvrez notre collection exceptionnelle de meubles, matériaux et fournisseurs
        </p>
        <div class="hero-buttons">
          <router-link to="/furniture" class="btn btn-primary">
            Voir les Meubles
          </router-link>
          <router-link to="/materials" class="btn btn-secondary">
            Découvrir les Matériaux
          </router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-card">
          <h3>🎨 Design Moderne</h3>
          <p>Des créations uniques pour votre intérieur</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🪑</div>
            <div class="stat-number">{{ stats.furniture }}</div>
            <div class="stat-label">Meubles</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🧱</div>
            <div class="stat-number">{{ stats.materials }}</div>
            <div class="stat-label">Matériaux</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏭</div>
            <div class="stat-number">{{ stats.suppliers }}</div>
            <div class="stat-label">Fournisseurs</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Pourquoi nous choisir ?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">✨</div>
            <h3>Qualité Premium</h3>
            <p>Tous nos meubles sont fabriqués avec des matériaux de haute qualité et un savoir-faire artisanal.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Design Unique</h3>
            <p>Nos créations allient esthétique moderne et fonctionnalité pour sublimer votre intérieur.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>Éco-responsable</h3>
            <p>Nous privilégions les matériaux durables et les pratiques respectueuses de l'environnement.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Livraison Rapide</h3>
            <p>Livraison soignée et installation professionnelle dans toute la France.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Products Section -->
    <section class="recent-products">
      <div class="container">
        <h2 class="section-title">Dernières Créations</h2>
        <div class="products-grid">
          <Card
            v-for="item in recentFurniture"
            :key="item._id"
            :title="item.name"
            :description="item.description"
            :price="item.totalCost"
            :category="item.category"
            @click="viewFurniture(item._id)"
          />
        </div>
        <div class="text-center">
          <router-link to="/furniture" class="btn btn-primary">
            Voir tous les meubles
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue'
import { furnitureService, materialService, supplierService, type Furniture } from '../services/api'

const router = useRouter()

const stats = ref({
  furniture: 0,
  materials: 0,
  suppliers: 0
})

const recentFurniture = ref<Furniture[]>([])

const viewFurniture = (id: string) => {
  router.push(`/furniture/${id}`)
}

onMounted(async () => {
  try {
    // Charger les statistiques
    const [furniture, materials, suppliers] = await Promise.all([
      furnitureService.getAll(),
      materialService.getAll(),
      supplierService.getAll()
    ])

    stats.value = {
      furniture: furniture.length,
      materials: materials.length,
      suppliers: suppliers.length
    }

    // Prendre les 6 derniers meubles
    recentFurniture.value = furniture.slice(0, 6)
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 8rem;
  display: flex;
  align-items: center;
  min-height: 50vh;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  max-width: 300px;
}

.hero-card h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.stats {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
  font-weight: 500;
}

.features {
  padding: 4rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

.recent-products {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.text-center {
  text-align: center;
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
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  color: white;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-image {
    margin-top: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
