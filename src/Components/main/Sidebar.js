import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  adminLogo: state.logoReducer.logos.adminLogo,
});

function Sidebar({ adminLogo }) {
  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box" style={{ padding: "0px" }}>
        <Link to="/dashboard/" className="logo logo-dark">
          <span className="logo-sm">
            <img src={adminLogo} alt="" height="25" />
            <b style={{ color: "white" }}></b>
          </span>
          <span className="logo-lg">
            <img src={adminLogo} alt="" height="50" />
            <b style={{ color: "white" }}></b>
          </span>
        </Link>

        <Link to="index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src={adminLogo} alt="" height="25" />
            <b style={{ color: "white" }}></b>
          </span>
          <span className="logo-lg">
            <img src={adminLogo} alt="" height="50" />
            <b style={{ color: "white" }}></b>
          </span>
        </Link>
      </div>

      <button
        type="button"
        className="
            btn btn-sm
            px-2
            font-size-16
            header-item
            waves-effect
            vertical-menu-btn
          "
      >
        <i className="fa fa-fw fa-bars" />
      </button>

      <div data-simplebar className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard">
                <img src="/assets/images/icons/dashboard-icon.png" alt="" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/"
                className="has-arrow"
                aria-expanded={false}
              >
                <img src="/assets/images/icons/cms-icon.png" alt="" />
                <span>Commerce</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <a href="/comproducts">Products</a>
                </li>
                {/* <li>
                  <a href="/featuredProducts">Featured Products</a>
                </li> */}
                <li>
                  <a href="/comcoupon">Coupons</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/dashboard/" className="has-arrow">
                <img src="/assets/images/icons/cms-icon.png" alt="" />
                <span>Orders Management</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <a href="/new-orders">New</a>
                </li>
                <li>
                  <a href="/cancel-orders">Cancelled</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/clients">
                <img src="/assets/images/icons/viewer-icon.png" alt="" />
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link to="/cafe-owners">
                <img src="/assets/images/icons/viewer-icon.png" alt="" />
                <span>Cafe Owners</span>
              </Link>
            </li>

            <li>
              <Link to="/dashboard/" className="has-arrow">
                <img src="/assets/images/icons/cms-icon.png" alt="" />
                <span>Data Collection</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <a href="/email-signup">Email Signups</a>
                </li>
                <li>
                  <a href="/contact-request">Contact Requests</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/dashboard/" className="has-arrow">
                <img src="/assets/images/icons/cms-icon.png" alt="" />
                <span>Configuration</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <a href="/tax">Tax Rates</a>
                </li>
                <li>
                  <a href="/page">Pages</a>
                </li>
                <li>
                  <a href="/socialmedia">Social Media</a>
                </li>
                <li>
                  <Link to="/address">Address</Link>
                </li>
                <li>
                  <Link to="/logo">Logo</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/email-templates">
                <img
                  src="/assets/images/icons/email-template-icon.png"
                  alt=""
                />
                <span>Email Templates</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/earning">
                <img src="/assets/images/icons/earning-icon.png" />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="/payment">
                <img src="/assets/images/icons/payment-settings-icon.png" />
                <span>Payment Settings</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/notification">
                <img src="/assets/images/icons/notification-icon.png" />
                <span>Notification Settings</span>
              </Link>
            </li>

            <li>
              <Link to="/subscription/settings">
                <img src="/assets/images/icons/subscrption-plans-icon.png" />
                <span>Subscription Settings</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/profile">
                <img src="/assets/images/icons/site-preference.png" />
                <span>Profile</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Sidebar);
