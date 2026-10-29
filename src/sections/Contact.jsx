import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>
            {"Contact"}
          </h2>
          <p>
            {"Feel free to reach out to me to discuss collaboration, career opportunities, or any inquiries. You can contact me at my Email for written communication or connect with me my social medias . I'm always eager to engage in meaningful conversations and explore new opportunities in the tech industry."}
          </p>
        </div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>
                  {"Location:"}
                </h4>
                <p>
                  {"Shanghai, China"}
                </p>
              </div>
              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>
                  {"Email:"}
                </h4>
                <p>
                  {"0realannabelle0@gmail.com"}
                </p>
              </div>
              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>
                  {"Call:"}
                </h4>
                <p>
                  {"+86 176-2180-0415"}
                </p>
              </div>
              <div className="framer-1qhqcia-container" style={{"opacity": "1", "transform": "perspective(1200px) translateX(0px) translateY(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0px)"}}>
                <a target="_blank" href="Annabelle%20Zhu%20Resume.pdf" download="" title="Download File" style={{"gap": "5px", "fontSize": "20px", "lineHeight": "2em", "fontFamily": "Inter, sans-serif", "fontWeight": "500", "width": "max-content", "display": "flex", "placeItems": "center", "placeContent": "center", "textDecoration": "none", "fontStyle": "normal", "letterSpacing": "0", "textAlign": "center", "padding": "10px", "color": "rgb(255, 255, 255)", "backgroundColor": "rgb(29, 73, 162)", "borderRadius": "50px", "userSelect": "none", "whiteSpace": "nowrap", "cursor": "pointer"}} rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--token-88b52595-49cd-4c53-a9d4-ad51444e62a8, rgb(255, 255, 255))" viewBox="0 0 256 256" style={{"order": "0", "flexShrink": "0"}}>
                    <path d="M228 152v56a20 20 0 0 1-20 20H48a20 20 0 0 1-20-20v-56a12 12 0 0 1 24 0v52h152v-52a12 12 0 0 1 24 0Zm-108.49 8.49a12 12 0 0 0 17 0l40-40a12 12 0 0 0-17-17L140 123V40a12 12 0 0 0-24 0v83l-19.51-19.49a12 12 0 0 0-17 17Z"></path>
                  </svg>
                  {" Download Resume"}
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3419.348431206446!2d121.20244743607454!3d31.016540571974605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b2f397f0b3de2f%3A0x95e02b31972e3477!2zVmVyb25hIFBhbGFjZSDvvIhTb3V0aCBHYXRl77yJ!5e0!3m2!1sen!2sil!4v1723727652974!5m2!1sen!2sil" width="600" height="450" style={{"border": "0"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map of Shanghai"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
