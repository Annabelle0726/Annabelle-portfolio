import React from "react";
import PortfolioCarousel from "../components/PortfolioCarousel";

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section-bg">
      <div className="container">
        <div className="section-title">
          <h2>
            {"Website Portfolio"}
          </h2>
          <p>
            {"With a strong portfolio of diverse projects that showcase my proficiency in the fields of web development, Research and Development as well as Innovation . These projects highlight my expertise in various technologies and methodologies, underscoring my ability to tackle complex challenges effectively."}
          </p>
        </div>
        <PortfolioCarousel />
      </div>
    </section>
  );
}
