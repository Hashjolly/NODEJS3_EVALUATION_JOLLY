<template>
  <div class="contact-page">
    <div class="container">
      <div class="contact-header">
        <h1>Contactez-nous</h1>
        <p>Nous sommes là pour répondre à toutes vos questions</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Nos Coordonnées</h2>
          
          <div class="info-card">
            <div class="info-icon">🏢</div>
            <div class="info-details">
              <h3>Adresse</h3>
              <p>123 Rue du Design<br>75001 Paris, France</p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">📞</div>
            <div class="info-details">
              <h3>Téléphone</h3>
              <p><a href="tel:+33123456789">+33 1 23 45 67 89</a></p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">📧</div>
            <div class="info-details">
              <h3>Email</h3>
              <p><a href="mailto:contact@furniture-design.com">contact@furniture-design.com</a></p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">🕒</div>
            <div class="info-details">
              <h3>Horaires</h3>
              <p>
                Lundi - Vendredi: 9h - 18h<br>
                Samedi: 10h - 16h<br>
                Dimanche: Fermé
              </p>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Envoyez-nous un message</h2>
          
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="form-input"
                placeholder="Votre nom complet"
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="form-input"
                placeholder="votre@email.com"
              />
            </div>

            <div class="form-group">
              <label for="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-input"
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div class="form-group">
              <label for="subject">Sujet *</label>
              <select id="subject" v-model="form.subject" required class="form-select">
                <option value="">Choisissez un sujet</option>
                <option value="general">Question générale</option>
                <option value="quote">Demande de devis</option>
                <option value="furniture">Information sur un meuble</option>
                <option value="material">Question sur les matériaux</option>
                <option value="supplier">Contact fournisseur</option>
                <option value="support">Support technique</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="form-textarea"
                placeholder="Décrivez votre demande en détail..."
              ></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.newsletter" />
                <span class="checkmark"></span>
                Je souhaite recevoir la newsletter avec les nouveautés et offres spéciales
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
                <span v-if="isSubmitting">Envoi en cours...</span>
                <span v-else>📤 Envoyer le message</span>
              </button>
            </div>
          </form>

          <div v-if="formStatus" class="form-status" :class="formStatus.type">
            {{ formStatus.message }}
          </div>
        </div>
      </div>

      <div class="additional-info">
        <div class="info-section">
          <h3>🚚 Livraison</h3>
          <p>Nous livrons dans toute la France métropolitaine. Livraison gratuite pour les commandes supérieures à 500€.</p>
        </div>
        
        <div class="info-section">
          <h3>🔧 Installation</h3>
          <p>Notre équipe d'experts peut installer vos meubles directement chez vous. Service d'installation professionnel disponible.</p>
        </div>
        
        <div class="info-section">
          <h3>📋 Devis gratuit</h3>
          <p>Nous établissons des devis gratuits et sans engagement pour tous vos projets d'aménagement.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)
const formStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)

const submitForm = async () => {
  isSubmitting.value = true
  formStatus.value = null

  try {
    // Simulation d'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Ici, vous pourriez envoyer les données à votre API
    console.log('Form submitted:', form)
    
    formStatus.value = {
      type: 'success',
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    }
    
    // Réinitialiser le formulaire
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    })
    
  } catch (error) {
    formStatus.value = {
      type: 'error',
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.contact-info h2,
.contact-form h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-icon {
  font-size: 2rem;
  color: #3498db;
}

.info-details h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.info-details p {
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

.info-details a {
  color: #3498db;
  text-decoration: none;
}

.info-details a:hover {
  text-decoration: underline;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
}

.form-actions {
  margin-top: 1rem;
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

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-status {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.form-status.success {
  background: #d5f4e6;
  color: #27ae60;
  border: 1px solid #27ae60;
}

.form-status.error {
  background: #fadbd8;
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.info-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.info-section p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
  
  .additional-info {
    grid-template-columns: 1fr;
  }
}
</style>
