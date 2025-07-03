// Fonctions JavaScript pour l'application

document.addEventListener('DOMContentLoaded', function() {
  // Auto-masquage des alertes
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 5000);
  });

  // Confirmation de suppression
  const deleteButtons = document.querySelectorAll('[data-confirm-delete]');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const message = this.getAttribute('data-confirm-delete') || 'Êtes-vous sûr de vouloir supprimer cet élément ?';
      if (!confirm(message)) {
        e.preventDefault();
      }
    });
  });

  // Gestion des formulaires dynamiques (ajout de matériaux)
  const addMaterialBtn = document.getElementById('addMaterial');
  if (addMaterialBtn) {
    addMaterialBtn.addEventListener('click', addMaterialRow);
  }

  // Recherche en temps réel
  const searchInputs = document.querySelectorAll('[data-live-search]');
  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(liveSearch, 300));
  });

  // Initialisation des graphiques
  initCharts();
});

// Fonction pour ajouter une ligne de matériau
function addMaterialRow() {
  const container = document.getElementById('materialsContainer');
  const template = document.getElementById('materialRowTemplate');
  if (container && template) {
    const clone = template.content.cloneNode(true);
    const index = container.children.length;
    
    // Mise à jour des noms des inputs
    clone.querySelectorAll('input, select').forEach(input => {
      const name = input.getAttribute('name');
      if (name) {
        input.setAttribute('name', name.replace('[0]', `[${index}]`));
      }
    });

    container.appendChild(clone);
  }
}

// Fonction pour supprimer une ligne de matériau
function removeMaterialRow(button) {
  const row = button.closest('.material-row');
  if (row) {
    row.remove();
  }
}

// Recherche en temps réel
function liveSearch(event) {
  const query = event.target.value;
  const target = event.target.getAttribute('data-live-search');
  
  if (query.length < 2) {
    clearSearchResults(target);
    return;
  }

  fetch(`/api/search?q=${encodeURIComponent(query)}&type=${target}`)
    .then(response => response.json())
    .then(data => {
      displaySearchResults(data, target);
    })
    .catch(error => {
      console.error('Erreur de recherche:', error);
    });
}

// Affichage des résultats de recherche
function displaySearchResults(data, target) {
  const resultsContainer = document.getElementById(`${target}Results`);
  if (!resultsContainer) return;

  resultsContainer.innerHTML = '';
  
  if (data.length === 0) {
    resultsContainer.innerHTML = '<div class="text-muted">Aucun résultat trouvé</div>';
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'list-group-item list-group-item-action';
    div.innerHTML = `
      <h6 class="mb-1">${item.name}</h6>
      <p class="mb-1">${item.description || ''}</p>
      <small>${item.category || ''}</small>
    `;
    div.addEventListener('click', () => selectSearchResult(item, target));
    resultsContainer.appendChild(div);
  });
}

// Sélection d'un résultat de recherche
function selectSearchResult(item, target) {
  const input = document.querySelector(`[data-live-search="${target}"]`);
  if (input) {
    input.value = item.name;
    input.setAttribute('data-selected-id', item._id);
  }
  clearSearchResults(target);
}

// Effacement des résultats de recherche
function clearSearchResults(target) {
  const resultsContainer = document.getElementById(`${target}Results`);
  if (resultsContainer) {
    resultsContainer.innerHTML = '';
  }
}

// Fonction debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialisation des graphiques Chart.js
function initCharts() {
  // Graphique des meubles par catégorie
  const categoryChart = document.getElementById('categoryChart');
  if (categoryChart) {
    fetch('/dashboard/api/stats')
      .then(response => response.json())
      .then(data => {
        createPieChart(categoryChart, data.furnitureByCategory, 'Meubles par catégorie');
      });
  }

  // Graphique des matériaux par catégorie
  const materialChart = document.getElementById('materialChart');
  if (materialChart) {
    fetch('/dashboard/api/stats')
      .then(response => response.json())
      .then(data => {
        createBarChart(materialChart, data.materialsByCategory, 'Matériaux par catégorie');
      });
  }

  // Graphique des statuts
  const statusChart = document.getElementById('statusChart');
  if (statusChart) {
    fetch('/dashboard/api/stats')
      .then(response => response.json())
      .then(data => {
        createDoughnutChart(statusChart, data.furnitureByStatus, 'Meubles par statut');
      });
  }
}

// Création d'un graphique en secteurs
function createPieChart(canvas, data, title) {
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: data.map(item => item._id),
      datasets: [{
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Création d'un graphique en barres
function createBarChart(canvas, data, title) {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(item => item._id),
      datasets: [{
        label: 'Nombre',
        data: data.map(item => item.count),
        backgroundColor: '#36A2EB',
        borderColor: '#2C3E50',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Création d'un graphique en anneau
function createDoughnutChart(canvas, data, title) {
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: data.map(item => item._id),
      datasets: [{
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
