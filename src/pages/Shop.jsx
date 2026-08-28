import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';
import Alert from '../components/Alert';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to load products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = !searchTerm || [product.name, product.description, product.category]
        .some((value) => value?.toLowerCase().includes(searchTerm));
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  return (
    <main className="shop-page">
      <section className="shop-intro">
        <div className="shop-intro-inner">
          <p className="shop-eyebrow">THE SHOPNEST COLLECTION</p>
          <h1>Find something worth bringing home.</h1>
          <p>Browse the complete catalog, from everyday essentials to considered upgrades.</p>
        </div>
      </section>

      <div className="container shop-container">
        <div className="shop-toolbar">
          <label className="shop-search-label">
            <span>Search products</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or category" />
          </label>
          <label className="shop-category-label">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <p className="shop-result-count">{visibleProducts.length} products</p>
        </div>

        {loading && <p className="shop-message">Loading products...</p>}
        {error && <div className="shop-message shop-error"><Alert>{error}</Alert></div>}
        {!loading && !error && visibleProducts.length === 0 && (
          <div className="shop-empty"><h2>No products found</h2><p>Try another search or category.</p></div>
        )}
        {!loading && !error && visibleProducts.length > 0 && (
          <div className="product-grid shop-grid">
            {visibleProducts.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
