.products-page {
  min-height: 100vh;
  background: #ffffff;
  padding: 60px 20px;
}

.products-container {
  max-width: 800px;
  margin: 0 auto;
}

.products-page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
  line-height: 1.2;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
}

.products-page-subtitle {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #666666;
  margin-bottom: 60px;
  max-width: 100%;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
}

.empty-collections {
  text-align: center;
  padding: 80px 40px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.empty-collections h3 {
  font-size: 1.6rem;
  margin-bottom: 8px;
  color: var(--text-primary, #333);
}

.empty-collections p {
  color: var(--text-muted, #666);
  margin-top: 8px;
  font-size: 1.05rem;
}

.collections-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 20px 0;
}

.collection-link {
  text-decoration: none;
  color: inherit;
}

.collection-card {
  border: none;
  border-radius: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.collection-card-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
}

.collection-card-content {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.collection-card-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
  line-height: 1.3;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
}

.collection-card-description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #666666;
  margin-bottom: 20px;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
}

.collection-card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
}

.arrow-icon {
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.collection-card:hover .arrow-icon {
  transform: translateX(4px);
}

/* Responsive Design - Tablet */
@media (max-width: 768px) {
  .products-page {
    padding: 40px 20px;
  }

  .products-page-title {
    font-size: 2.5rem;
  }

  .products-page-subtitle {
    font-size: 1.15rem;
    margin-bottom: 40px;
  }

  .collections-grid {
    gap: 48px;
  }

  .collection-card-image {
    height: 350px;
  }

  .collection-card-title {
    font-size: 1.75rem;
  }

  .collection-card-description {
    font-size: 1.1rem;
  }

  .empty-collections {
    padding: 60px 20px;
  }

  .empty-collections h3 {
    font-size: 1.3rem;
  }

  .empty-collections p {
    font-size: 1rem;
  }
}

/* Responsive Design - Mobile */
@media (max-width: 480px) {
  .products-page {
    padding: 32px 16px;
  }

  .products-page-title {
    font-size: 2rem;
  }

  .products-page-subtitle {
    font-size: 1.05rem;
    margin-bottom: 32px;
  }

  .collections-grid {
    gap: 40px;
  }

  .collection-card-image {
    height: 280px;
  }

  .collection-card-title {
    font-size: 1.5rem;
  }

  .collection-card-description {
    font-size: 1rem;
  }

  .empty-collections {
    padding: 48px 16px;
  }

  .empty-collections h3 {
    font-size: 1.2rem;
  }

  .empty-collections p {
    font-size: 0.95rem;
  }
}
