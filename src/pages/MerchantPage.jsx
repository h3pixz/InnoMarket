import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/merchant.css';

export default function MerchantPage() {
  return (
    <div className="merchant">
      <Breadcrumbs items={['Home', 'Become a merchant']} />

      <section className="merchant__card">
        <h1 className="merchant__title">Become a merchant</h1>
        <p className="merchant__text">
          Sell your second-hand items through InnoMarket: reach customers in your city
          and manage your shop online.
        </p>
        <p className="merchant__text">
          Merchant onboarding is coming soon.
        </p>
      </section>
    </div>
  );
}
