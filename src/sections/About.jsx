import React from "react";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>
            {"About"}
          </h2>
          <p>
            {"Hello, I'm Annabelle Zhu — a data-driven creator passionate about transforming complex ideas into impactful digital experiences. With a Master’s degree in Data Science and professional experience in data analytics, machine learning, and web development, I bridge the gap between technical precision and creative problem-solving. I specialize in turning raw data into actionable insights through Python, SQL, Tableau, and Power BI, and presenting them via interactive, user-friendly web applications using JavaScript, React, and Vue. My UX/UI design background ensures that every solution I deliver is not only technically robust but also intuitive and visually engaging. Known for my effective leadership, critical thinking, and collaborative approach, I thrive in cross-functional teams and fast-paced environments. I’m passionate about building solutions that drive measurable business impact — from predictive models to data dashboards to full-stack analytical tools. "}
          </p>
        </div>
        <div className="section-title">
          <h4 className="personal1">
            {"Personal Info"}
          </h4>
          <div className="row">
            <div className="col-lg-6">
              <ul className="custom-list">
                <li>
                  <strong>
                    {"Birthday:"}
                  </strong>
                  {" "}
                  <span>
                    {"26 July 2001"}
                  </span>
                </li>
                <li>
                  <strong>
                    {"City:"}
                  </strong>
                  {" "}
                  <span>
                    {"Shanghai, China"}
                  </span>
                </li>
                <li>
                  <strong>
                    {"Phone:"}
                  </strong>
                  {" "}
                  <span>
                    {"+86 176-2180-0415"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="custom-list">
                <li>
                  <strong>
                    {"Age:"}
                  </strong>
                  {" "}
                  <span>
                    {"24"}
                  </span>
                </li>
                <li>
                  <strong>
                    {"Degree:"}
                  </strong>
                  {" "}
                  <span>
                    {"BA"}
                  </span>
                </li>
                <li>
                  <strong>
                    {"Email:"}
                  </strong>
                  {" "}
                  <span>
                    {"0realannabelle0@gmail.com"}
                  </span>
                </li>
                <li>
                  <strong>
                    {"Work Type:"}
                  </strong>
                  {" "}
                  <span>
                    {"Remote"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="section-title">
          <h4 className="personal1">
            {"Data Analyst & Web Developer | Turning Data into Insightful, Interactive Experiences"}
          </h4>
          <div className="row">
            <div className="col-12 col-md-4">
              <img src="assets/img/about.jpg" className="img-fluid" alt="Annabelle Zhu headshot" width="1280" height="1227" loading="lazy" decoding="async" />
            </div>
            <div className="col-12 col-md-8 pt-4 pt-md-0 content">
              <p>
                {" I’m a data-driven problem solver who transforms complex datasets into clear insights and interactive digital experiences. With expertise in "}
                <b>
                  {"Python"}
                </b>
                {", "}
                <b>
                  {"R"}
                </b>
                {", "}
                <b>
                  {"SQL"}
                </b>
                {", "}
                <b>
                  {"Tableau"}
                </b>
                {", and "}
                <b>
                  {"Power BI"}
                </b>
                {", I excel at extracting value from data, building predictive models, and presenting results in ways that drive business impact. "}
              </p>
              <p>
                {" My background in "}
                <b>
                  {"web development"}
                </b>
                {" and "}
                <b>
                  {"UX/UI design"}
                </b>
                {" allows me to deliver end-to-end solutions — from data pipelines to intuitive, visually engaging dashboards and web applications using "}
                <b>
                  {"JavaScript"}
                </b>
                {", "}
                <b>
                  {"React"}
                </b>
                {", and "}
                <b>
                  {"Vue"}
                </b>
                {". Currently completing my Master’s in Data Science, I bring technical precision, creative design thinking, and collaborative energy to every project I take on. "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
