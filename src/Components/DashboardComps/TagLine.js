import React from "react";
import { Link } from "react-router-dom";

export default function TagLine() {
  return (
    <div>
      <div class="sub-content-box">
        <div class="d-flex center">
          <div class="left">
            <h1>
              Spread the word,
              <br />
              We'll get the pigeons
            </h1>
            <div class="dash-btn-container bg-2">
              <Link to="/email/manage" class="dash-btn">
                Get Started today
              </Link>
            </div>
          </div>
          <div class="right">
            <img
              src="https://eep.io/images/yzco4xsimv0y/2ewurCGaai01QOo0c24QAq/dc5c8ae42584033c0851f19894ee1251/ILLO_Hero_Transactional-Sending_Receiving-1520.png?fm=webp&q=80"
              className="tagline-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
