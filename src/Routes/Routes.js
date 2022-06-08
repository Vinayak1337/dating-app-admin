import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import ChangePassword from "../Components/main/ChangePassword";
import EditProfile from "../Components/main/EditProfile";
import Profile from "../Components/main/Profile";
import PrivateRoute from "./Privateroute";
import Dashboard from "../Components/main/Dashboard";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { API } from "../data";
import Products from "../Components/main/Commerce/Products/Products";
import AddProducts from "../Components/main/Commerce/Products/AddProducts";
import Editproducts from "../Components/main/Commerce/Products/Editproducts";

import Base from "../Components/Base";
import Client from "../Components/main/Commerce/Clients/Client";
import ViewClient from "../Components/main/Commerce/Clients/ViewClient";
import Coupon from "../Components/main/Commerce/Coupon/Coupon";
import Addcoupon from "../Components/main/Commerce/Coupon/Addcoupon";
import New from "../Components/main/Commerce/Orders/New";
import Vieworder from "../Components/main/Commerce/Orders/Vieworder";
import Cancelled from "../Components/main/Commerce/Orders/Cancelled";
import Tax from "../Components/main/Commerce/Configration/Tax";
import Edittax from "../Components/main/Commerce/Configration/Edittax";
import Addtax from "../Components/main/Commerce/Configration/Addtax";
import Page from "../Components/main/Commerce/Configration/Page";
import Pageadd from "../Components/main/Commerce/Configration/Pageadd";
import Editpage from "../Components/main/Commerce/Configration/Editpage";
import Gst from "../Components/main/Commerce/Configration/Gst";
import Socialmedia from "../Components/main/Commerce/Configration/Socialmedia";
import Address from "../Components/main/Commerce/Configration/Address";
import Logo from "../Components/main/Commerce/Configration/Logo";
import Addshipping from "../Components/main/Commerce/Configration/Addshipping";
import Editshipping from "../Components/main/Commerce/Configration/Editshipping";
import Email from "../Components/main/Commerce/Data/EmailSignUps/Email";
import Contact from "../Components/main/Commerce/Data/ContactRequests/Contact";
import Contactrequest from "../Components/main/Commerce/Data/ContactRequests/Contactrequest";
import Viewcontact from "../Components/main/Commerce/Data/ContactRequests/Viewcontact";
import Editcoupon from "../Components/main/Commerce/Coupon/EditCoupon";
import CafeOwner from "../Components/main/Commerce/Data/OwnerSignUps/CafeOwner";
import ViewCafeOwner from "../Components/main/Commerce/Data/OwnerSignUps/ViewCafeOwner";
import ViewCoupon from "../Components/main/Commerce/Coupon/ViewCoupon";
import PageNotFound from "../Components/NotFound/NotFound";
import EmailTemplates from "../Components/main/Commerce/Email/EmailTemplates";
import EditEmailTemplate from "../Components/main/Commerce/Email/EditTemplate";

export default function Routes() {
  setInterval(async () => {
    let idToken = sessionStorage.getItem("id_token");
    let refresh_token = sessionStorage.getItem("refresh_token");
    let params = new URLSearchParams({ refresh_token });
    refresh_token &&
      (await axios
        .post(`${API}/api/client/refreshToken`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response) => {
          console.log("cognito data", response);
          let data = response.data.data;
          sessionStorage.setItem("access_token", data.AccessToken);
          sessionStorage.setItem("id_token", data.IdToken);
        })
        .catch((err) => {
          console.log(err);
        }));
  }, 3000000);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />

        <Base>
          {/* BASE STARTING HERE */}
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/notification" exact component={Notification} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/edit/profile" exact component={EditProfile} />
          <PrivateRoute
            path="/change/password"
            exact
            component={ChangePassword}
          />
          <PrivateRoute component={Products} exact path="/comproducts" />

          <PrivateRoute component={AddProducts} exact path="/comproducts/add" />
          <PrivateRoute
            component={Editproducts}
            exact
            path="/comproducts/edit/:id"
          />
          <PrivateRoute component={Coupon} exact path="/comcoupon" />
          <PrivateRoute component={Addcoupon} exact path="/coupon/add" />
          <PrivateRoute component={ViewCoupon} exact path="/coupon/view/:id" />
          <PrivateRoute component={Editcoupon} exact path="/coupon/edit/:id" />

          <PrivateRoute component={Client} exact path="/clients" />

          <PrivateRoute component={ViewClient} exact path="/client-view/:id" />
          <PrivateRoute component={Addshipping} exact path="/addShipping" />
          <PrivateRoute
            component={Editshipping}
            exact
            path="/editShipping/:id"
          />
          <PrivateRoute component={Tax} exact path="/tax" />
          <PrivateRoute component={Edittax} exact path="/tax/:id" />

          <PrivateRoute component={Addtax} exact path="/addtax" />
          <PrivateRoute component={Page} exact path="/page" />
          <PrivateRoute component={Pageadd} exact path="/page/add" />
          <PrivateRoute component={Editpage} exact path="/page/edit/:id" />
          <PrivateRoute component={Socialmedia} exact path="/socialmedia" />
          <PrivateRoute component={Address} exact path="/address" />
          <PrivateRoute component={Logo} exact path="/logo" />
          <PrivateRoute component={New} exact path="/new-orders" />
          <PrivateRoute component={Vieworder} exact path="/view-orders/:id" />
          <PrivateRoute component={Cancelled} exact path="/cancel-orders" />

          <PrivateRoute component={Gst} exact path="/gst" />
          <PrivateRoute component={Socialmedia} exact path="/socialmedia" />
          <PrivateRoute component={Address} exact path="/address" />
          <PrivateRoute component={Email} exact path="/email-signup" />
          <PrivateRoute component={Contact} exact path="/contact-request" />
          <PrivateRoute component={Contactrequest} exact path="/add-contact" />
          <PrivateRoute
            component={Viewcontact}
            exact
            path="/view-contact/:id"
          />
          <PrivateRoute component={CafeOwner} exact path="/cafe-owners" />
          <PrivateRoute
            component={ViewCafeOwner}
            exact
            path="/cafe-owners/:id"
          />
          <PrivateRoute
            component={EmailTemplates}
            exact
            path="/email-templates"
          />
          <PrivateRoute
            component={EditEmailTemplate}
            exact
            path="/email-templates/edit/:id"
          />
        </Base>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
