import React from "react";

export default function Projects() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2>
            {"Data Science Projects"}
          </h2>
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://info-523-su25.github.io/final-project-zhu/" target="_blank" rel="noopener noreferrer">
              <i className="bi-graph-up"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://info-523-su25.github.io/final-project-zhu/" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Event-driven Anomaly Detection for AtHub (603881.SH)"}
              </h4>
            </a>
            <h5>
              {"Tools: Python | pandas | ta | scikit-learn | LightGBM | SHAP | Quarto | Plotly"}
            </h5>
          </div>
          <p>
            {" This project develops an interpretable machine-learning pipeline to detect and forecast short-term volatility anomalies in AtHub (603881.SH) using 375 days of OHLCV data and 30+ technical indicators. Highlights include: "}
            <ul>
              <li>
                <strong>
                  {"Event-driven labeling"}
                </strong>
                {" — anomalies defined by price (±3/5/7%) and volume (1.8×/2.0×/2.5×) thresholds."}
              </li>
              <li>
                <strong>
                  {"Multi-horizon forecasting"}
                </strong>
                {" — models predicting anomalies 1–3 days ahead with time-series CV."}
              </li>
              <li>
                <strong>
                  {"Threshold sensitivity analysis"}
                </strong>
                {" — heatmaps comparing Recall / Precision / F1 across 9 threshold combos."}
              </li>
              <li>
                <strong>
                  {"Model interpretability"}
                </strong>
                {" — SHAP analysis reveals top predictive signals (e.g., RSI × Volume interaction)."}
              </li>
              <li>
                <strong>
                  {"Practical guidance"}
                </strong>
                {" — Active traders benefit from stricter thresholds for high-confidence entries, while risk managers can use more sensitive settings for broader monitoring."}
              </li>
            </ul>
            {" This work demonstrates that interpretable ML can provide transparent, effective early-warning systems for financial markets using purely market-based data. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="DataVizPortfolio.html" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="DataVizPortfolio.html" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Data Visualization Portfolio: Public Sector Analytics"}
              </h4>
            </a>
            <h5>
              {"Tools: R | ggplot2 | networkD3 | Sankey Diagrams | Plotly"}
            </h5>
          </div>
          <p>
            {" A collection of advanced visualizations transforming complex public datasets into actionable insights: "}
            <ul>
              <li>
                <strong>
                  {"Occupational Safety Analysis"}
                </strong>
                {" — Interactive Sankey diagram revealing causal relationships between industries and fatality types (BLS data)"}
              </li>
              <li>
                <strong>
                  {"International Trade Patterns"}
                </strong>
                {" — Animated time-series of Japan's industrial diamond imports/exports (1990-2020)"}
              </li>
              <li>
                <strong>
                  {"Environmental Risk Mapping"}
                </strong>
                {" — Geospatial visualization of sewage spill frequency across NY watersheds"}
              </li>
              <li>
                <strong>
                  {"Comparative Trend Analysis"}
                </strong>
                {" — Small multiples showing decade-long workplace safety improvements vs. precious metals trade volumes"}
              </li>
            </ul>
            {" Combines tidyverse data wrangling with perceptual effectiveness principles to communicate policy-relevant findings through both static and interactive formats. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://rpubs.com/real_annabelle/1242317" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://rpubs.com/real_annabelle/1242317" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Predictive Analysis of Secondary Education Outcomes"}
              </h4>
            </a>
            <h5>
              {"Tools: R | caret | glmnet | SHAP | ggplot2"}
            </h5>
          </div>
          <p>
            {" Machine learning approach to identify at-risk students using demographic and behavioral factors: "}
            <ul>
              <li>
                <strong>
                  {"Feature Importance Analysis"}
                </strong>
                {" — Quantified parental education impact (2.3× more significant than study time)"}
              </li>
              <li>
                <strong>
                  {"Model Comparison"}
                </strong>
                {" — Achieved 82% recall with Lasso regression (vs 76% with Random Forest)"}
              </li>
              <li>
                <strong>
                  {"Intervention Simulation"}
                </strong>
                {" — Projected 11-15% grade improvement from targeted tutoring programs"}
              </li>
              <li>
                <strong>
                  {"SHAP Value Interpretation"}
                </strong>
                {" — Revealed nonlinear relationships between family size and math performance"}
              </li>
            </ul>
            {" Provides school administrators with evidence-based tools for early intervention and resource allocation. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://rpubs.com/real_annabelle/1242329" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://rpubs.com/real_annabelle/1242329" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Financial Distress Prediction: Taiwanese Corporations"}
              </h4>
            </a>
            <h5>
              {"Tools: R | tidymodels | DALEX | ggplot2 | recipes"}
            </h5>
          </div>
          <p>
            {" Bankruptcy risk assessment using 10 years of corporate financial data: "}
            <ul>
              <li>
                <strong>
                  {"Feature Engineering"}
                </strong>
                {" — Created 12 financial ratios with 89% correlation to bankruptcy events"}
              </li>
              <li>
                <strong>
                  {"Model Benchmarking"}
                </strong>
                {" — XGBoost outperformed logistic regression by 18% in precision-recall AUC"}
              </li>
              <li>
                <strong>
                  {"Threshold Optimization"}
                </strong>
                {" — Balanced F1-score at 0.83 with 6:1 cost ratio for Type I/II errors"}
              </li>
              <li>
                <strong>
                  {"Explainable AI"}
                </strong>
                {" — Local interpretability revealed critical thresholds for debt-to-equity ratios"}
              </li>
            </ul>
            {" Delivers a robust framework for credit risk assessment with documented false positive tradeoffs. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://colab.research.google.com/drive/1AbpOLqN5l9c52wL5wY1vz-d0DW8Elq5Y" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://colab.research.google.com/drive/1AbpOLqN5l9c52wL5wY1vz-d0DW8Elq5Y" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Market Intelligence: Pop Culture Merchandising"}
              </h4>
            </a>
            <h5>
              {"Tools: Python | scikit-learn | Matplotlib | Seaborn | Feature-engine"}
            </h5>
          </div>
          <p>
            {" Data-driven strategy for anime/movie merchandise optimization: "}
            <ul>
              <li>
                <strong>
                  {"Sentiment-Value Correlation"}
                </strong>
                {" — Identified 0.68 Spearman correlation between IMDB ratings and merchandise sell-through"}
              </li>
              <li>
                <strong>
                  {"Cluster Analysis"}
                </strong>
                {" — Segmented 12,000 titles into 5 strategic groups based on popularity decay patterns"}
              </li>
              <li>
                <strong>
                  {"Inventory Optimization"}
                </strong>
                {" — Proposed 30% reduction in slow-moving SKUs with minimal revenue impact"}
              </li>
              <li>
                <strong>
                  {"Release Timing"}
                </strong>
                {" — Quantified 22% premium for merchandise launched within 2 weeks of content release"}
              </li>
            </ul>
            {" Strategic framework reduced inventory costs by 18% while maintaining 95% customer satisfaction. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://colab.research.google.com/drive/1uWlgJ59Z3EALCFWakaL6tQp2uFoYOYJU?usp=sharing" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://colab.research.google.com/drive/1uWlgJ59Z3EALCFWakaL6tQp2uFoYOYJU?usp=sharing" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Price Optimization: Collectible Figures Market"}
              </h4>
            </a>
            <h5>
              {"Tools: Python | LightGBM | Optuna | SHAP | Streamlit"}
            </h5>
          </div>
          <p>
            {" Predictive modeling for collectible merchandise pricing strategy: "}
            <ul>
              <li>
                <strong>
                  {"Feature Selection"}
                </strong>
                {" — Isolated review sentiment (ρ=0.72) and availability (ρ=-0.64) as primary price drivers"}
              </li>
              <li>
                <strong>
                  {"Hyperparameter Tuning"}
                </strong>
                {" — Achieved MAE of $8.24 (14% better than baseline)"}
              </li>
              <li>
                <strong>
                  {"Price Elasticity"}
                </strong>
                {" — Identified $25-$35 as optimal price band for maximum conversion"}
              </li>
              <li>
                <strong>
                  {"Interactive Tool"}
                </strong>
                {" — Developed browser-based pricing simulator with scenario testing"}
              </li>
            </ul>
            {" Implementation yielded 23% reduction in price adjustment frequency and 7% margin improvement. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://colab.research.google.com/drive/1qv3dHGecNTBG0WnR05yOdldrNiGLTSPv?usp=sharing" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://colab.research.google.com/drive/1qv3dHGecNTBG0WnR05yOdldrNiGLTSPv?usp=sharing" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Digital Audience Analysis: Grammy Awards"}
              </h4>
            </a>
            <h5>
              {"Tools: Python | Pandas | Altair | Google Analytics API"}
            </h5>
          </div>
          <p>
            {" Web analytics insights for music industry's premier event: "}
            <ul>
              <li>
                <strong>
                  {"Traffic Decomposition"}
                </strong>
                {" — Isolated 314% award-day surge from social media referrals"}
              </li>
              <strong>
                {"Content Engagement"}
              </strong>
              {" — Identified 3.2× longer dwell time on performer profiles vs. nominee lists"}
              <li>
                <strong>
                  {"Geospatial Patterns"}
                </strong>
                {" — Mapped unexpected European engagement peaks during US primetime"}
              </li>
              <li>
                <strong>
                  {"Predictive Modeling"}
                </strong>
                {" — Forecasted within 12% accuracy for 2023 traffic using ARIMA"}
              </li>
            </ul>
            {" Recommendations informed 2024 site redesign, reducing bounce rate by 19 percentage points. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://colab.research.google.com/drive/1g5jafPETEwJZuCDyrSmwhz_EempZH4Ig?usp=sharing" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://colab.research.google.com/drive/1g5jafPETEwJZuCDyrSmwhz_EempZH4Ig?usp=sharing" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Customer Segmentation: Starbucks Transaction Analysis"}
              </h4>
            </a>
            <h5>
              {"Tools: Python | RFM | K-Means | Tableau | Cohort Analysis"}
            </h5>
          </div>
          <p>
            {" Behavioral segmentation for targeted marketing campaigns: "}
            <ul>
              <li>
                <strong>
                  {"RFM Quantization"}
                </strong>
                {" — Classified 85K customers into 7 value-based segments"}
              </li>
              <li>
                <strong>
                  {"Churn Prediction"}
                </strong>
                {" — Identified 22% of high-value customers at risk with 89% precision"}
              </li>
              <li>
                <strong>
                  {"Promotion Simulation"}
                </strong>
                {" — Projected 14% revenue lift from personalized reactivation offers"}
              </li>
              <li>
                <strong>
                  {"Dashboard Development"}
                </strong>
                {" — Interactive Tableau viz for real-time segment performance tracking"}
              </li>
            </ul>
            {" Campaign implementation achieved 38% higher conversion than blanket promotions. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://docs.google.com/presentation/d/14RLU2hUIcwvwJmcYfrBZpJQ_yt68X3FjsR_KZv1zZKw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://docs.google.com/presentation/d/14RLU2hUIcwvwJmcYfrBZpJQ_yt68X3FjsR_KZv1zZKw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Energy Infrastructure Analysis: Sustainable Data Center Siting"}
              </h4>
            </a>
            <h5>
              {"Tools: SQL | Tableau | GIS | Cost-Benefit Analysis"}
            </h5>
          </div>
          <p>
            {" Strategic location analysis for green data center deployment: "}
            <ul>
              <li>
                <strong>
                  {"Renewable Capacity Mapping"}
                </strong>
                {" — Evaluated 48 states on 12 sustainability metrics"}
              </li>
              <li>
                <strong>
                  {"Cost Modeling"}
                </strong>
                {" — Projected 22-year TCO with sensitivity analysis for energy price volatility"}
              </li>
              <li>
                <strong>
                  {"Policy Alignment"}
                </strong>
                {" — Matched incentive programs to potential savings of $3.2M annually"}
              </li>
              <li>
                <strong>
                  {"Scenario Planning"}
                </strong>
                {" — Compared hybrid vs. full-renewable configurations"}
              </li>
            </ul>
            {" Delivered ranked site recommendations with risk-adjusted ROI projections. "}
          </p>
          <hr className="style-eight" />
        </div>
        <div className="col-12 icon-box">
          <div className="icon">
            <a href="https://rpubs.com/real_annabelle/1242358" target="_blank" rel="noopener noreferrer">
              <i className="bi-journal-richtext"></i>
            </a>
          </div>
          <div style={{"display": "flex", "flexDirection": "column", "marginLeft": "70px"}}>
            <a href="https://rpubs.com/real_annabelle/1242358" target="_blank" rel="noopener noreferrer">
              <h4>
                {"Socioeconomic Analysis: Cognitive Capital & Development"}
              </h4>
            </a>
            <h5>
              {"Tools: R | Structural Equation Modeling | Spatial Autocorrelation"}
            </h5>
          </div>
          <p>
            {" Cross-national study of human capital indicators: "}
            <ul>
              <li>
                <strong>
                  {"Controlled Analysis"}
                </strong>
                {" — Isolated 0.42 partial correlation between IQ and GDP after education adjustment"}
              </li>
              <li>
                <strong>
                  {"Regional Patterns"}
                </strong>
                {" — Identified significant spatial autocorrelation (Moran's I = 0.67)"}
              </li>
              <li>
                <strong>
                  {"Policy Simulation"}
                </strong>
                {" — Projected 7-11% GDP impact from targeted early childhood interventions"}
              </li>
              <li>
                <strong>
                  {"Data Quality Framework"}
                </strong>
                {" — Developed reliability scoring for cross-national composite metrics"}
              </li>
            </ul>
            {" Provides evidence-based framework for human capital investment decisions. "}
          </p>
        </div>
      </div>
    </section>
  );
}
