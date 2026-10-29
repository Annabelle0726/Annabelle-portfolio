import React from "react";

export default function DesignPortfolio() {
  return (
    <section id="XD" className="portfolio section-bg">
      <div className="container">
        <div className="section-title">
          <h2>
            {"UX/UI Portfolio"}
          </h2>
          <p>
            {" This UX/UI project showcases my ability to design intuitive and efficient enterprise-level systems using Adobe XD. I designed a comprehensive management platform that includes modules for sales, production, technical support, inventory, quality control, and cost accounting. The interface emphasizes usability and clarity, featuring logical navigation, visually distinct icons, and scalable interaction patterns. This project demonstrates my strength in user-centered design, system architecture planning, and visual communication—bridging data, function, and form for real-world business needs. "}
          </p>
          <a href="https://xd.adobe.com/view/694eb640-bc5e-46d4-8f1a-039db0478f54-3c1d/?hints=off&locale=en-US&mv=other&mv2=ahome&promoid=XKMMH7MW&xProduct=&xProductLocation=">
            <img src="assets/img/optimized/xd-preview.webp" alt="UX/UI design portfolio preview" width="1400" height="1546" style={{"width": "100%", "height": "auto"}} loading="lazy" decoding="async" />
          </a>
        </div>
      </div>
    </section>
  );
}
