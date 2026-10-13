import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
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

        <form className="add-user__form">
          <div className="add-user__grid">
            <div className="add-user__col">
              <label className="add-user__field">
                <span className="add-user__label">Client *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="___-___-___-___"
                />
              </label>

              <div className="add-user__row">
                <div className="add-user__group">
                  <span className="add-user__label">Archived</span>
                  <div className="add-user__radios">
                    <label className="add-user__radio">
                      <input type="radio" name="archived" />
                      <span>Yes</span>
                    </label>
                    <label className="add-user__radio">
                      <input type="radio" name="archived" defaultChecked />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="add-user__group">
                  <span className="add-user__label">Active</span>
                  <div className="add-user__radios">
                    <label className="add-user__radio">
                      <input type="radio" name="active" />
                      <span>Yes</span>
                    </label>
                    <label className="add-user__radio">
                      <input type="radio" name="active" defaultChecked />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <label className="add-user__field">
                <span className="add-user__label">Bring client number *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="----"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Salutation</span>
                <div className="add-user__control">
                  <select
                    className="add-user__input add-user__select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Salutation
                    </option>
                  </select>
                  <IoIosArrowDown className="add-user__icon add-user__icon--chevron" />
                </div>
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Name *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Name"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">First name</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Text"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Email address *</span>
                <input
                  className="add-user__input"
                  type="email"
                  placeholder="Email address"
                />
              </label>
            </div>

            <div className="add-user__col">
              <label className="add-user__field">
                <span className="add-user__label">Mobile number</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Mobile number"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Street *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Street"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Number *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Text"
                />
              </label>

              <label className="add-user__field add-user__field--narrow">
                <span className="add-user__label">ZIP code *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="ZIP code (4-5 digits)"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">City *</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="City"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Country *</span>
                <div className="add-user__control">
                  <select
                    className="add-user__input add-user__select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Country
                    </option>
                  </select>
                  <IoIosArrowDown className="add-user__icon add-user__icon--chevron" />
                </div>
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Paypal account</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="Paypal account"
                />
              </label>
            </div>

            <div className="add-user__col">
              <label className="add-user__field">
                <span className="add-user__label">Notes</span>
                <textarea
                  className="add-user__input add-user__textarea"
                  rows="6"
                  placeholder="Notes"
                />
              </label>

              <div className="add-user__group">
                <span className="add-user__label">Shipping</span>
                <div className="add-user__radios">
                  <label className="add-user__radio">
                    <input type="radio" name="shipping" defaultChecked />
                    <span>Yes</span>
                  </label>
                  <label className="add-user__radio">
                    <input type="radio" name="shipping" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <label className="add-user__field">
                <span className="add-user__label">Sales quote</span>
                <input
                  className="add-user__input"
                  type="text"
                  placeholder="% 0"
                />
              </label>

              <label className="add-user__field">
                <span className="add-user__label">Year of birth</span>
                <div className="add-user__control">
                  <input
                    className="add-user__input"
                    type="text"
                    placeholder="Year of birth"
                  />
                  <FaRegCalendarAlt className="add-user__icon add-user__icon--calendar" />
                </div>
              </label>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
