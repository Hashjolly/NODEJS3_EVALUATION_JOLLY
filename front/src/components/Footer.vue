<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>🪑 Furniture Design</h3>
        <p>Votre destination pour les meubles et matériaux de qualité supérieure.</p>
      </div>
      
      <div class="footer-section">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/furniture">Meubles</router-link></li>
          <li><router-link to="/materials">Matériaux</router-link></li>
          <li><router-link to="/suppliers">Fournisseurs</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Informations</h4>
        <ul>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><a href="#" @click.prevent>Conditions d'utilisation</a></li>
          <li><a href="#" @click.prevent>Politique de confidentialité</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Contact</h4>
        <div class="contact-info">
          <p>📧 contact@furniture-design.com</p>
          <p>📞 +33 1 23 45 67 89</p>
          <p>📍 123 Rue du Design, 75001 Paris</p>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Furniture Design. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #3498db;
  font-size: 1.5rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #ecf0f1;
  font-size: 1.1rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #3498db;
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  margin: 0;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
