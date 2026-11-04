export const dataProjectContent = [
{
 id:'data-athub', number:'01', title:['AtHub 异常检测','AtHub anomaly detection'],
 category:['机器学习 · 金融时间序列','Machine learning · Financial time series'],
 summary:['从行情数据出发，探索异常波动的识别、解释与预测边界','Exploring how market data can identify unusual volatility—and where prediction falls short'],
 tools:'Python / scikit-learn / SHAP / Quarto',
 cover:'athubOverview', coverAlt:['原报告中的基线模型性能比较','Baseline model comparison from the original report'],
 intro:['以 AtHub（603881.SH）的股票行情为研究对象，将价格变化与成交量条件转化为异常标签，再比较模型的识别表现。项目将特征工程、模型评估与解释分析连接起来，重点关注：一次预警究竟捕捉了什么，又可能遗漏或误报什么。','This project studies AtHub (603881.SH) market data, translating price changes and volume conditions into anomaly labels before comparing classifiers. It connects feature engineering, evaluation, and interpretation around a practical question: what does an alert capture, miss, or falsely flag?'],
 chapters:[
 [['研究问题','Research question'],['技术指标能否帮助识别异常行情？改变异常定义后，模型的召回率与精确率如何变化？哪些特征在影响判断？','Can technical indicators help identify unusual market behavior? How do recall and precision change with the definition of an anomaly, and which features influence predictions?']],
 [['分析过程','Analytical approach'],['整理行情与技术指标，构建价格和成交量阈值标签；比较逻辑回归与树模型，通过不同预测窗口和阈值组合观察表现，再使用 SHAP 分析特征贡献。','Prepare market data and technical indicators, define price/volume threshold labels, compare logistic regression with tree models, and examine prediction horizons and threshold combinations. SHAP provides a view of feature contributions.']],
 [['发现与局限','Findings & limitations'],['原报告的多日预测实验呈现了高召回、低精确率的组合，意味着大量正常日期也被标记为异常。高召回本身不能证明有效预测。不同章节的指标与结论还需统一核对；这里保留原图，展示研究过程，不将其作为真实交易效果的证明。','The multi-day experiment reports high recall with low precision, meaning many normal days are also flagged. High recall alone does not demonstrate useful prediction. Metrics and conclusions across report sections need reconciliation; the original figures document the analysis, not validated trading performance.']]
 ],
 figures:[{src:'athubOverview',label:['基线模型比较','Baseline comparison']},{src:'athubThreshold',label:['阈值组合与 F1 分数','Threshold combinations and F1']},{src:'athubForecast',label:['预测窗口与误报取舍','Forecast horizons and false alarms']}],
 source:'https://info-523-su25.github.io/final-project-zhu/',sourceLabel:['阅读原始报告','Read original report']
},
{
 id:'data-visualization',number:'02',title:['公共数据可视化','Public data visualization'],
 category:['数据叙事 · 视觉表达','Data storytelling · Visual communication'],
 summary:['用趋势、流向与对比，让复杂的公共数据变得可读','Making public datasets readable through trends, flows, and comparisons'],
 tools:'R / dplyr / ggplot2 / ggsankey',
 cover:'sankey',coverAlt:['行业与职业死亡原因的桑基图','Sankey diagram of industries and occupational fatality causes'],
 intro:['这组作品围绕国际贸易、环境记录与职业安全展开。面对不同的数据结构，我选择不同的图形：用折线观察时间变化，用条形图比较规模，用桑基图展示行业与事故类别之间的分布关系。','This collection explores international trade, environmental records, and occupational safety. Each dataset calls for a different visual form: lines for changes over time, bars for magnitude, and Sankey flows for the distribution of industries across incident categories.'],
 chapters:[
 [['问题与数据','Questions & data'],['材料来自 AEC 贵金属与宝石贸易数据、纽约州泄漏事件记录，以及职业安全数据。分析分别关注进出口变化、水体累计污水泄漏量和行业中的死亡原因分布。','Sources include AEC precious-metals and gems trade data, New York State spill records, and occupational safety data. The views explore imports and exports, cumulative sewage quantities by water body, and fatality causes across industries.']],
 [['图形如何服务问题','Choosing the visual form'],['先处理缺失值、统一类别名称，再按年份、地点或类别汇总。贸易图使用一致时间轴；泄漏量跨越较大数量级，使用对数轴；桑基图用连线宽度表达数量关系。','Handle missing values, normalize categories, and aggregate by year, location, or category. Trade uses a common time axis; spill quantities use a logarithmic scale to accommodate large differences; Sankey link widths encode counts.']],
 [['阅读边界','Reading the evidence'],['行业与死亡原因的连接表示记录中的分布，不能直接解释为因果关系。累计量不等于单位人口风险；不同年代的记录覆盖也不完全一致。视觉表达需要同时交代单位、时间范围与数据口径。','Industry-to-cause links describe recorded distributions, not causal effects. Cumulative quantities are not per-capita risk, and reporting coverage varies by period. Units, time ranges, and definitions are essential to interpreting each graphic.']]
 ],
 figures:[{src:'sankey',label:['职业安全：行业与原因','Occupational safety: industries and causes']},{src:'trade',label:['日本钻石贸易：进口与出口','Japan diamond trade: imports and exports']},{src:'water',label:['纽约州水体累计污水泄漏量','Cumulative sewage quantities by NY water body']}],
 source:'DataVizPortfolio.html',sourceLabel:['打开完整可视化作品','Open full visualization collection']
},
{
 id:'data-energy',presentation:'text',number:'03',title:['可持续数据中心选址','Sustainable data-center siting'],
 category:['基础设施 · 决策分析','Infrastructure · Decision analysis'],
 summary:['把能源、成本与地域条件放在一起，梳理选址中的取舍','Bringing energy, cost, and location constraints into the same decision'],
 tools:'SQL / Tableau / GIS',
 cover:null,
 intro:['这个项目关注可持续数据中心的选址问题：面对能源供给、成本与地域条件，如何组织信息，让不同候选地点可以被清楚比较。它将数据分析的视角延伸到基础设施决策，关注条件之间的联系，而不只看单一指标。','This project considers how to organize energy, cost, and geographic information so potential data-center locations can be compared clearly. It brings a data-analysis perspective to infrastructure decisions, focusing on relationships between constraints rather than a single indicator.'],
 chapters:[
 [['分析问题','Decision context'],['可持续性、可用性与成本需要一起考虑。一个地点在某一方面有优势，并不意味着它在所有条件下都是最优选择。','Sustainability, availability, and cost need to be considered together. A location that leads on one dimension is not necessarily the best choice under every set of constraints.']],
 [['比较维度','What to compare'],['能源条件决定持续运行的基础，地域条件影响不同地点的适配性，成本则需要结合前两者一起考虑。把这些条件放在同一个比较框架里，才能看清某一项优势背后的取舍。','Energy conditions underpin continuous operation, location shapes how well a site fits, and costs need to be considered alongside both. Comparing these dimensions together makes the tradeoffs behind a single advantage easier to see.']],
 [['决策思路','Reasoning through the decision'],['先明确需要满足的条件，再比较候选地点各自的优势与限制。当能源、地域和成本的优先级发生变化时，也需要重新审视选择。这里关注的是如何组织选址问题，让每一次比较都有清楚的依据。','Start by defining the conditions a site needs to meet, then compare the strengths and constraints of the candidates. Changes in priorities across energy, geography and cost call for another look at the choice. The focus is on structuring the decision so each comparison has a clear basis.']]
 ],figures:[]
}
];
