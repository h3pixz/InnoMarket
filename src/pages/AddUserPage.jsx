import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/add-user.css';

export default function AddUserPage() {
  return (
    <div className="add-user">
      <Breadcrumbs
        variant="admin"
        items={['User Management', 'List of Bringing Customers']}
      />

      <section className="admin-card">
        <h1 className="add-user__title">Add New User</h1>
      </section>
    </div>
  );
}
