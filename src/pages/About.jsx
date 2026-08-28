import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const values = [
	{
		title: "Quality First",
		text: "Every product is screened for durability, finish, and value before it reaches your cart.",
	},
	{
		title: "Fast Fulfillment",
		text: "From order confirmation to dispatch, we optimize each step so your essentials reach you quickly.",
	},
	{
		title: "Real Support",
		text: "Our team helps with sizing, product questions, and post-purchase issues with human support.",
	},
];

const stats = [
	{ label: "Products Curated", value: "2,500+" },
	{ label: "Happy Customers", value: "12,000+" },
	{ label: "Cities Delivered", value: "90+" },
];

const About = () => {
	return (
		<main className="about-page">
			<section className="about-hero">
				<p className="about-eyebrow">About ShopNest</p>
				<h1>Your Everyday Store, Reimagined</h1>
				<p className="about-lead">
					ShopNest started with one simple mission: make online shopping feel
					clear, trustworthy, and enjoyable for every home.
				</p>

				<div className="about-stats">
					{stats.map((item) => (
						<article className="about-stat-card" key={item.label}>
							<h3>{item.value}</h3>
							<p>{item.label}</p>
						</article>
					))}
				</div>
			</section>

			<section className="about-story">
				<div className="about-story-panel">
					<h2>How We Built ShopNest</h2>
					<p>
						We began by solving the basics well: clear product information,
						honest pricing, and a checkout experience that stays fast on both
						mobile and desktop.
					</p>
					<p>
						Today, ShopNest serves thousands of customers with a catalog that
						blends daily essentials, trending picks, and handpicked seasonal
						collections.
					</p>
				</div>

				<div className="about-story-panel about-highlight">
					<h2>What Makes Us Different</h2>
					<p>
						We focus on long-term trust over short-term hype. That means real
						product checks, transparent updates, and quick response times when
						you need help.
					</p>
				</div>
			</section>

			<section className="about-values">
				<h2>Our Core Values</h2>
				<div className="about-values-grid">
					{values.map((value) => (
						<article className="about-value-card" key={value.title}>
							<h3>{value.title}</h3>
							<p>{value.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className="about-cta">
				<h2>Ready to Explore?</h2>
				<p>Discover products built for modern everyday life.</p>
				<div className="about-cta-actions">
					<Link to="/" className="about-btn about-btn-dark">
						Back to Home
					</Link>
					<Link to="/shop" className="about-btn about-btn-light">
						Start Shopping
					</Link>
				</div>
			</section>
		</main>
	);
};

export default About;
