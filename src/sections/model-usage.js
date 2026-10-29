export const modelUsage = {
  zh: {
    back: '返回模型与工具',
    pageTitle: name => name + ' 使用方式',
    projectLabel: '项目片段',
    tools: [
      {
        title: '把想法聊清楚，把选择想明白',
        intro: '我常把还没有整理好的想法带进对话：一个产品方向、一处不满意的设计，或者一段还没表达准确的文字。随着讨论推进，我会补充背景、比较方案，也重新检查自己的判断。',
        steps: [
          ['先把问题说具体', '我会说明想为谁解决什么问题、已经尝试过什么，以及眼下有哪些限制。做产品时，我尤其在意：这个需求为什么存在？什么值得先做？哪些内容可以暂时放下？'],
          ['多问一句，为什么', '面对一个建议，我会继续追问它的理由、前提和取舍。涉及研究时，我会要求提供来源，再核对关键内容；讨论设计和文案时，我会比较不同版本，判断哪个更贴近自己的目标。'],
          ['带着结果回来', '讨论之后，我会带着草图、页面截图、文字或实际体验继续修改。哪里不顺、哪里重复、哪里不像我想表达的意思，都可以成为下一轮讨论的起点。'],
        ],
        project: 'Agency Bloom',
        excerpt: '做 Agency Bloom 时，我反复讨论过：用户是否可以先体验再登录？什么时候适合提出行动建议？决策卡应该留下哪些信息？这些具体问题，让产品的方向和边界逐渐清晰起来。',
      },
      {
        title: '让设计真正呈现在屏幕上',
        intro: '我很在意一个页面给人的第一印象，也在意使用过程中的细节。我经常让 Claude Code 查看实际运行的界面，结合设计参考和我的反馈，持续调整视觉与交互体验。',
        steps: [
          ['先看见，再判断', '我会让它打开实际页面，观察布局、字体、间距、配色和视觉层次。有些问题在代码里并不明显，只有看到真实的页面，才能发现哪里拥挤、哪里空旷，或者哪里缺少协调感。'],
          ['把感受变成修改要求', '我会提供参考图、标注截图，也会直接表达自己的感受，例如“这个按钮太厚了”“这里的对齐不自然”“手机端的留白太多”。再结合现有代码，找到具体的调整方式。'],
          ['让交互接受实际检验', '修改完成后，我会继续查看桌面和移动端的效果，检查按钮反馈、动画、页面适配和操作流程。如果呈现效果仍然不理想，就继续调整，直到符合这次设计的要求。'],
        ],
        project: 'Annabelle Portfolio｜UI Refinement',
        excerpt: '从二级页面标题与签名的对齐，到丝带的漂浮动画、按钮反馈与移动端适配，我会通过实际页面反复检查设计细节，让视觉效果与交互体验更加协调。',
      },
    ],
  },
  en: {
    back: 'Back to models & tools',
    pageTitle: name => 'Using ' + name,
    projectLabel: 'A project example',
    tools: [
      {
        title: 'Talk ideas through. Think choices through.',
        intro: 'I often bring ideas into a conversation before they are fully formed: a product direction, a design I am not happy with, or a piece of writing that does not quite say what I mean. As the discussion develops, I add context, compare options, and revisit my own judgment.',
        steps: [
          ['Make the question specific', 'I explain whose problem I want to solve, what I have already tried, and the constraints I am working with. When developing a product, I pay particular attention to why a need exists, what deserves to be built first, and what can wait.'],
          ['Ask one more question: why?', 'When I receive a suggestion, I ask about its reasoning, assumptions, and tradeoffs. For research, I ask for sources and check the key information. For design and writing, I compare versions and decide which fits my goals best.'],
          ['Come back with results', 'I return to the conversation with sketches, screenshots, writing, or observations from using the product. Anything that feels awkward, repetitive, or different from what I intended can become the starting point for the next revision.'],
        ],
        project: 'Agency Bloom',
        excerpt: 'While developing Agency Bloom, I kept returning to specific questions: could people try it before signing in? When should it suggest an action? What information should a decision card retain? Working through these questions helped clarify the product’s direction and boundaries.',
      },
      {
        title: 'Bring the design to life on screen',
        intro: 'I care about a page’s first impression and the details people encounter while using it. I often ask Claude Code to inspect the running interface, then use design references and my feedback to refine its visual and interactive experience.',
        steps: [
          ['Look first, then judge', 'I ask it to open the actual page and examine the layout, typography, spacing, colors, and visual hierarchy. Some problems are hard to spot in code: seeing the page reveals where it feels crowded, too empty, or visually inconsistent.'],
          ['Turn impressions into concrete changes', 'I provide reference images and annotated screenshots, and describe what I notice: “this button feels too thick,” “the alignment looks awkward,” or “there is too much empty space on mobile.” We then use the existing code to work out specific adjustments.'],
          ['Put interactions to the test', 'After a change, I review the desktop and mobile versions, checking button feedback, animation, responsive layouts, and navigation flows. If the result still does not feel right, I keep refining it until it meets the design requirements.'],
        ],
        project: 'Annabelle Portfolio | UI Refinement',
        excerpt: 'From aligning secondary-page titles and signatures to refining the floating ribbon, button feedback, and mobile layouts, I repeatedly inspect the actual pages so the visual design and interactions work well together.',
      },
    ],
  },
};
