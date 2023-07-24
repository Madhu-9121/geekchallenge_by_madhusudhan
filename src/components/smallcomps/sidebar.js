import React from "react";
import "./styles.css";
import { colors, genders, prices, types } from "./dataforsidebar";

const SideNav = ({
  showSidenav,
  setShowSidenav,
  sidenavColor,
  sidenavGender,
  sidenavType,
  sidenavPrice
}) => {
  return (
    <div
      className="side-nav-container"
      style={{ display: showSidenav ? "block" : "none" }}
    >
      <div className="sidebar-inner">
        <h3>Color</h3>
        <ul className="filter-checkbox">
          {colors.map((color) => {
            return (
              <li key={color.id}>
                <label className="checkBox">
                  {color.label}
                  <input
                    type="checkbox"
                    value={color.label}
                    onChange={sidenavColor}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
        <h3>Gender</h3>
        <ul className="filter-checkbox">
          {genders.map((gender) => {
            return (
              <li key={gender.id}>
                <label className="checkBox">
                  {gender.label}
                  <input
                    type="checkbox"
                    value={gender.label}
                    onChange={sidenavGender}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
        <h3>Price</h3>
        <ul className="filter-checkbox">
          {prices.map((price) => {
            return (
              <li key={price.id}>
                <label className="checkBox">
                  {price.label}
                  <input
                    type="checkbox"
                    value={JSON.stringify(price)}
                    onChange={sidenavPrice}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
        <h3>Type</h3>
        <ul className="filter-checkbox">
          {types.map((type) => {
            return (
              <li key={type.id}>
                <label className="checkBox">
                  {type.label}
                  <input
                    type="checkbox"
                    value={type.label}
                    onChange={sidenavType}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
