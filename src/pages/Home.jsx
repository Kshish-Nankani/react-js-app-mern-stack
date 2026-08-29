import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { buildApiUrl } from "../api";

const Home=()=>{
const [products, setProducts]=useState([])
const [loading, setLoading] = useState(true)
 
    useEffect(()=>{ 
        const fetchProducts = async()=>{
            try {
                const res= await fetch(buildApiUrl('/api/products'));
                if (!res.ok) {
                    throw new Error(`Failed to fetch products: ${res.status}`)
                }
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : [])

            } catch (error) {
                console.error(error)
            }
            finally{
                setLoading(false)
            }
        }

        fetchProducts()
    },[])
    return(
        <div className="home-container">
            <div className="hero-banner">
        <h1>Welcome to ShopNest</h1>
        <p> your one stop shop for all needs</p>
        </div>
        <h2>featured Products</h2>
        {loading ? (
            <div> Loading... </div>
        ):(
            <div className="product-grid">
                {products.map((product)=>(
                    <ProductCard key={product._id} product={product}/> 
                ))}

            </div>
        )}
        </div>

    )
}
export default Home;