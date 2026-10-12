import { Link } from 'react-router-dom';
import { FaRecycle, FaTags, FaStore } from 'react-icons/fa';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/about.css';

const STATS = [
  { value: '1 200+', label: 'Items in the catalog' },
  { value: '48', label: 'Partner shops' },
  { value: '12', label: 'Cities' },
  { value: '9 500', label: 'Happy customers' },
];

const STEPS = [
  {
    title: 'Browse the catalog',
    text: 'Filter by colour, price, brand and category to find exactly the piece you are looking for.',
  },
  {
    title: 'Reserve an item',
    text: 'Add it to your cart — the shop holds it for you for three days. No prepayment needed.',
  },
  {
    title: 'Pick it up',
    text: 'Come to the shop, try it on and pay on the spot. Most shops offer free delivery as well.',
  },
];

const VALUES = [
  {
    icon: FaRecycle,
    title: 'Sustainable',
    text: 'Second-hand keeps good clothes in use and out of landfill.',
  },
  {
    icon: FaTags,
    title: 'Affordable',
    text: 'Quality pieces at a fraction of their original price.',
  },
  {
    icon: FaStore,
    title: 'Local',
    text: 'Every order supports a small shop in your own city.',
  },
];

export default function AboutPage() {
  return (
    <div className="about">
      <Breadcrumbs items={['Home', 'About us']} />

      <section className="about-hero">
        <p className="about-hero__eyebrow">InnoMarket</p>
        <h1 className="about-hero__title">About us</h1>
        <p className="about-hero__text">
          InnoMarket is a marketplace for second-hand fashion. We give good clothes a
          second life and connect people with the shops around the corner.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-section__title">Our mission</h2>
        <p className="about-section__text">
          Every year millions of garments are thrown away while they are still in great
          shape. We make them easy to find again: reserve an item online and pick it up
          at a shop near you.
        </p>
        <p className="about-section__text">
          We work with small local shops, so every purchase supports the neighbourhood
          and keeps fashion affordable.
        </p>
      </section>

      <section className="about-stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="about-stat">
            <p className="about-stat__value">{stat.value}</p>
            <p className="about-stat__label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="about-section">
        <h2 className="about-section__title">How it works</h2>
        <div className="about-steps">
          {STEPS.map((step, index) => (
            <div key={step.title} className="about-step">
              <span className="about-step__number">{index + 1}</span>
              <p className="about-step__title">{step.title}</p>
              <p className="about-step__text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section__title">What we stand for</h2>
        <div className="about-values">
          {VALUES.map((value) => (
            <div key={value.title} className="about-value">
              <value.icon className="about-value__icon" />
              <p className="about-value__title">{value.title}</p>
              <p className="about-value__text">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2 className="about-cta__title">Ready to find something new?</h2>
        <p className="about-cta__text">Thousands of items are waiting in the catalog.</p>
        <Link to="/" className="about-cta__button">
          Browse the catalog
        </Link>
      </section>
    </div>
  );
}
