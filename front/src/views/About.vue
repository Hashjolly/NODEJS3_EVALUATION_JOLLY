<template>
  <div class="about-page">
    <div class="container">
      <div class="about-header">
        <h1>À propos de Furniture Design</h1>
        <p class="subtitle">Votre partenaire de confiance pour des meubles d'exception</p>
      </div>

      <div class="about-content">
        <section class="story">
          <h2>Notre Histoire</h2>
          <p>
            Depuis plus de 20 ans, Furniture Design est spécialisé dans la création et la fourniture de meubles 
            design pour les professionnels et les particuliers. Notre expertise s'étend de la conception sur mesure 
            à la sélection des meilleurs matériaux et fournisseurs du marché.
          </p>
          <p>
            Nous croyons que chaque espace mérite des meubles qui allient beauté, fonctionnalité et durabilité. 
            C'est pourquoi nous travaillons exclusivement avec des artisans qualifiés et des fournisseurs 
            respectueux de l'environnement.
          </p>
        </section>

        <section class="mission">
          <h2>Notre Mission</h2>
          <div class="mission-grid">
            <div class="mission-card">
              <div class="mission-icon">🎨</div>
              <h3>Design Innovation</h3>
              <p>Créer des meubles qui repoussent les limites du design contemporain tout en respectant les traditions artisanales.</p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">🌱</div>
              <h3>Durabilité</h3>
              <p>Promouvoir des pratiques écologiques en sélectionnant des matériaux durables et des processus de fabrication responsables.</p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">🤝</div>
              <h3>Partenariat</h3>
              <p>Construire des relations à long terme avec nos clients, fournisseurs et artisans basées sur la confiance mutuelle.</p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">⭐</div>
              <h3>Excellence</h3>
              <p>Maintenir les plus hauts standards de qualité dans chaque étape de notre processus, de la conception à la livraison.</p>
            </div>
          </div>
        </section>

        <section class="values">
          <h2>Nos Valeurs</h2>
          <div class="values-list">
            <div class="value-item">
              <strong>Qualité:</strong> Nous ne faisons aucun compromis sur la qualité de nos produits et services.
            </div>
            <div class="value-item">
              <strong>Innovation:</strong> Nous investissons constamment dans la recherche de nouvelles solutions design.
            </div>
            <div class="value-item">
              <strong>Transparence:</strong> Nous communiquons ouvertement sur nos processus et nos sources d'approvisionnement.
            </div>
            <div class="value-item">
              <strong>Responsabilité:</strong> Nous assumons notre responsabilité envers l'environnement et la société.
            </div>
          </div>
        </section>

        <section class="team">
          <h2>Notre Équipe</h2>
          <p>
            Notre équipe multidisciplinaire réunit des designers, des artisans, des ingénieurs et des experts en matériaux. 
            Ensemble, nous mettons notre passion et notre expertise au service de vos projets les plus ambitieux.
          </p>
          <div class="team-stats">
            <div class="stat">
              <div class="stat-number">25+</div>
              <div class="stat-label">Années d'expérience</div>
            </div>
            <div class="stat">
              <div class="stat-number">500+</div>
              <div class="stat-label">Projets réalisés</div>
            </div>
            <div class="stat">
              <div class="stat-number">50+</div>
              <div class="stat-label">Fournisseurs partenaires</div>
            </div>
            <div class="stat">
              <div class="stat-number">98%</div>
              <div class="stat-label">Clients satisfaits</div>
            </div>
          </div>
        </section>

        <section class="commitment">
          <h2>Notre Engagement</h2>
          <p>
            Nous nous engageons à vous accompagner dans tous vos projets d'aménagement, qu'ils soient résidentiels 
            ou commerciaux. Notre service client est disponible pour vous conseiller et vous guider dans le choix 
            des meubles et matériaux les plus adaptés à vos besoins.
          </p>
          <div class="cta">
            <router-link to="/contact" class="btn btn-primary">
              📞 Contactez-nous
            </router-link>
            <router-link to="/furniture" class="btn btn-secondary">
              🪑 Découvrir nos meubles
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.about-header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.3rem;
  color: #7f8c8d;
  font-weight: 300;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

section p {
  color: #7f8c8d;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.mission-card {
  text-align: center;
  padding: 1.5rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-5px);
  border-color: #3498db;
}

.mission-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.mission-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.mission-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.values-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.value-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.value-item strong {
  color: #2c3e50;
}

.team-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.stat {
  padding: 1rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border-radius: 8px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
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
  .about-header h1 {
    font-size: 2rem;
  }
  
  .mission-grid {
    grid-template-columns: 1fr;
  }
  
  .team-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta {
    flex-direction: column;
  }
}
</style>
