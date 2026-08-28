import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import Alert from '../components/Alert';

const emptyProduct = { name: '', description: '', price: '', category: '', stock: '' };

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const isAdmin = userInfo?.role === 'admin';
  const token = userInfo?.token || '';
  const section = location.pathname.split('/')[2] || 'overview';

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`/api${path}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  }, [token]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, productsData, ordersData, usersData] = await Promise.all([
        request('/analytics'),
        request('/products'),
        request('/orders'),
        request('/auth/users'),
      ]);
      setStats(statsData);
      setProducts(productsData);
      setOrders(ordersData);
      setUsers(usersData);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    loadData();
  }, [isAdmin, navigate, loadData]);

  const saveProduct = async (event) => {
    event.preventDefault();
    if (!editingId && !imageFile) {
      setError('Please upload a product picture.');
      return;
    }

    setError('');
    setMessage('');
    try {
      const path = editingId ? `/products/${editingId}` : '/products';
      const productData = new FormData();
      Object.entries(form).forEach(([field, value]) => productData.append(field, value));
      if (imageFile) productData.append('image', imageFile);

      const savedProduct = await request(path, {
        method: editingId ? 'PUT' : 'POST',
        body: productData,
      });
      setProducts((current) => editingId
        ? current.map((product) => product._id === editingId ? savedProduct : product)
        : [...current, savedProduct]);
      setForm(emptyProduct);
      setImageFile(null);
      setEditingId(null);
      setMessage(editingId ? 'Product updated.' : 'Product created.');
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await request(`/products/${productId}`, { method: 'DELETE' });
      setProducts((current) => current.filter((product) => product._id !== productId));
      setMessage('Product deleted.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await request(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      setOrders((current) => current.map((order) => order._id === orderId ? { ...order, status } : order));
    } catch (statusError) {
      setError(statusError.message);
    }
  };

  if (!isAdmin) return null;

  return (
    <main className="admin-page">
      <div className="container admin-container">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">SHOPNEST CONTROL ROOM</p>
            <h1>Admin workspace</h1>
          </div>
          <Link to="/" className="admin-store-link">View store</Link>
        </header>

        <nav className="admin-nav" aria-label="Admin navigation">
          <Link className={section === 'overview' ? 'active' : ''} to="/admin">Overview</Link>
          <Link className={section === 'products' ? 'active' : ''} to="/admin/products">Products</Link>
          <Link className={section === 'orders' ? 'active' : ''} to="/admin/orders">Orders</Link>
          <Link className={section === 'users' ? 'active' : ''} to="/admin/users">Users</Link>
        </nav>

        {error && <div className="admin-alert"><Alert>{error}</Alert></div>}
        {message && <div className="admin-alert"><Alert variant="success" role="status">{message}</Alert></div>}
        {loading ? <p className="admin-loading">Loading admin data...</p> : (
          <>
            {section === 'overview' && <section className="admin-stats-grid">
              <article><span>Products</span><strong>{stats?.totalProducts || 0}</strong></article>
              <article><span>Orders</span><strong>{stats?.totalOrders || 0}</strong></article>
              <article><span>Customers</span><strong>{stats?.totalUsers || 0}</strong></article>
              <article><span>Revenue</span><strong>${Number(stats?.totalRevenueData || 0).toFixed(2)}</strong></article>
            </section>}

            {section === 'products' && <section className="admin-section">
              <div className="admin-section-heading"><h2>Product catalog</h2><span>{products.length} products</span></div>
              <form className="admin-product-form" onSubmit={saveProduct}>
                <h3>{editingId ? 'Edit product' : 'Add product'}</h3>
                {['name', 'description', 'category', 'price', 'stock'].map((field) => (
                  <label key={field}>{field[0].toUpperCase() + field.slice(1)}
                    <input name={field} type={field === 'price' || field === 'stock' ? 'number' : 'text'} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} required />
                  </label>
                ))}
                <label>Product picture
                  <input type="file" name="image" accept="image/*" onChange={(event) => setImageFile(event.target.files[0] || null)} required={!editingId} />
                </label>
                <button type="submit" className="btn btn-primary">{editingId ? 'Save changes' : 'Add product'}</button>
                {editingId && <button type="button" className="admin-cancel-button" onClick={() => { setEditingId(null); setForm(emptyProduct); setImageFile(null); }}>Cancel</button>}
              </form>
              <div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>
                {products.map((product) => <tr key={product._id}><td>{product.name}</td><td>{product.category}</td><td>${Number(product.price).toFixed(2)}</td><td>{product.stock}</td><td><button type="button" onClick={() => { setEditingId(product._id); setForm({ name: product.name, description: product.description || '', price: product.price, category: product.category || '', stock: product.stock }); }}>Edit</button><button type="button" className="admin-danger" onClick={() => deleteProduct(product._id)}>Delete</button></td></tr>)}
              </tbody></table></div>
            </section>}

            {section === 'orders' && <section className="admin-section"><div className="admin-section-heading"><h2>Orders</h2><span>{orders.length} total</span></div><div className="admin-table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>
              {orders.map((order) => <tr key={order._id}><td>#{order._id.slice(-8)}</td><td>{order.user?.name || 'Unknown'}</td><td>${Number(order.totalAmount).toFixed(2)}</td><td><select value={order.status} onChange={(event) => updateStatus(order._id, event.target.value)}><option value="pending">Pending</option><option value="shipped">Shipped</option><option value="delievered">Delivered</option></select></td></tr>)}
            </tbody></table></div></section>}

            {section === 'users' && <section className="admin-section"><div className="admin-section-heading"><h2>Users</h2><span>{users.length} accounts</span></div><div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th></tr></thead><tbody>
              {users.map((user) => <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.verified ? 'Yes' : 'No'}</td></tr>)}
            </tbody></table></div></section>}
          </>
        )}
      </div>
    </main>
  );
};

export default AdminPage;
