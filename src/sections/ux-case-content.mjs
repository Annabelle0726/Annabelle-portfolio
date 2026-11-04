export const uxCases = [
  {
    id: 'XD-cupcakes', name: 'Cupcakes', category: ['品牌网站 · 交互体验', 'Brand website · Interaction'],
    subtitle: ['让一次点击，多一点期待', 'A little anticipation in a single click'],
    description: ['Cupcakes 是一个以甜点选购为场景的品牌网站项目，将产品展示、品牌氛围与趣味互动结合。明快的色彩和大幅产品摄影传递轻盈、愉悦的第一印象；「今日口味」通过礼盒揭晓，把浏览过程变成一次有期待、有回应的小探索。', 'Cupcakes is a brand website project that brings product discovery and playful interaction into the dessert-shopping experience. Bright colors and generous product photography create an inviting first impression, while a gift-box reveal turns the daily flavor into a small moment of anticipation and reward.'],
    role: ['参与网页交互实现，重点呈现「今日口味」的点击揭晓与状态反馈。页面使用 Sprinkles 的品牌及产品素材。', 'Implemented web interactions with a focus on the daily-flavor reveal and its visual feedback. The page uses Sprinkles brand and product materials.'],
    focus: ['从提示到点击，再到即时反馈，让操作结果清楚可见', 'A clear cue, a deliberate click, and immediate visual feedback'],
    screens: [
      { src: 'cupcakesOverview', label: ['首页', 'Overview'], alt: ['Cupcakes 首页，彩色纸杯蛋糕产品展示', 'Cupcakes landing page with colorful cupcake photography'] },
    ],
  },
  {
    id: 'XD-reverie', name: 'Reverie Reads', category: ['阅读产品 · 协作项目', 'Reading product · Collaboration'],
    subtitle: ['给阅读，留一个安静的位置', 'A quiet place for a reading life'],
    description: ['Reverie Reads（现名 Midniht）是一款围绕个人阅读生活展开的产品，把书籍整理、阅读发现与未来计划连接起来。读者可以用自己的方式组织书架，从喜欢的故事或当下心情出发寻找下一本书，再把想读的内容放进开放的阅读计划。深色背景、月光意象与衬线字体共同营造出私人书房般的氛围，让书籍与个人感受成为界面的中心。', 'Reverie Reads, now Midniht, brings a personal reading life together through library organization, book discovery, and flexible planning. Readers can arrange their shelves, find a next read through a favorite story or a current mood, and make space for it in an open-ended plan. Dark surfaces, moonlit imagery, and serif typography give the experience the character of a private reading room, keeping books and personal preferences at its center.'],
    role: ['以协作形式参与项目的开发支持与局部改进。所展示的界面呈现产品整体体验，帮助理解这些工作所在的阅读场景。', 'Contributed development support and focused improvements as a collaborator. The screens present the wider product experience and the reading context around that work.'],
    focus: ['让「收藏—发现—计划」形成连贯的阅读路径。用清楚的选中状态、分层导航和温和的提示，帮助读者保持自己的节奏与选择权。', 'Connect collecting, discovering, and planning into a coherent reading journey. Clear selection states, layered navigation, and considerate prompts help readers retain their own pace and choices.'],
    highlights: [
      { title: ['属于自己的书架', 'A library of your own'], text: ['按阅读状态、书籍形式与自定义清单整理藏书，同一本书可以出现在多个书架中。封面与书脊的展示保留了翻看实体书架的熟悉感，让整理也成为阅读体验的一部分。', 'Organize books by reading state, format, or personal lists, with a book able to belong to more than one shelf. Cover and spine views bring the familiarity of browsing a physical bookshelf into a personal digital library.'] },
      { title: ['从兴趣出发，发现下一本', 'Find a next read through intent'], text: ['Discover 提供喜欢的书、当下心情和尝试不同三种探索起点，也保留书名、作者或 ISBN 的直接搜索入口。清楚知道目标和暂时只有一种感觉，都能找到合适的开始方式。', 'Discover offers three starting points: a loved book, a mood, or something different, alongside direct search by title, author, or ISBN. It accommodates both a specific book in mind and a less defined feeling.'] },
      { title: ['给想读的书留出位置', 'Make room for what comes next'], text: ['Planner 将计划、日历与新书动态分开呈现，允许为下一本书安排时间、调整顺序或改变主意。计划保留弹性，移动或删除计划也不会改写已经留下的阅读记录。', 'Planner separates plans, the calendar, and upcoming releases, making room to schedule a book, reorder priorities, or change direction. Plans remain flexible: moving or removing one leaves existing reading history intact.'] },
    ],
    screens: [
      { src: 'reverieHome', label: ['阅读首页', 'Landing page'], alt: ['Midniht 首页，月亮与阅读者插画、个人书库介绍', 'Midniht landing page with a moonlit reader and personal-library introduction'] },
      { src: 'reverieDiscover', label: ['发现好书', 'Discover'], alt: ['Midniht Discover 页面，搜索框、三条发现路径与已选书籍', 'Midniht Discover screen with search, three discovery paths, and a selected book'] },
      { src: 'reverieShelves', label: ['个人书架', 'Shelves'], alt: ['Midniht 个人书架，心愿书单、书封与书脊浏览视图', 'Midniht personal shelves with a wishlist and cover-and-spine browsing view'] },
      { src: 'reveriePlanner', label: ['阅读计划', 'Planner'], alt: ['Midniht 阅读计划，计划、日历与新书动态入口及书籍排序', 'Midniht reading planner with Plan, Calendar, and Releases tabs and book ordering'] },
    ],
  },
  {
    id: 'XD-travel', name: 'Travel Discovery', category: ['旅行产品 · 目的地探索', 'Travel product · Discovery'],
    subtitle: ['从「想去哪」到一个更具体的选择', 'From a travel mood to a destination'],
    description: ['Travel Discovery 是一个面向旅行灵感与目的地选择的网站项目。以海滩、城市和山野三种旅行偏好作为入口，结合目的地卡片与视觉浏览，把「想出去走走」这样宽泛的愿望，转化为可以比较、继续探索的具体选项。页面采用 Marriott Homes & Villas 的品牌与旅行素材。', 'Travel Discovery is a website project for travel inspiration and destination exploration. Beach, city, and mountain preferences provide an approachable starting point; destination cards turn an open-ended wish to get away into concrete places to compare and explore. The page uses Marriott Homes & Villas brand and travel materials.'],
    role: ['参与目的地卡片与偏好选择的交互实现，关注选择、浏览与结果呈现之间的衔接', 'Worked on destination-card and preference-selection interactions, focusing on the connection between choosing, browsing, and presenting results.'],
    focus: ['让偏好选择、筛选结果与重新选择保持在同一段浏览流程里', 'Keep preference selection, filtered results, and changing one’s mind within the same flow.'],
    screens: [
      { src: 'travelOverview', label: ['首页', 'Overview'], alt: ['旅行项目首页与目的地探索入口', 'Travel project landing page and destination-discovery entry'] },
      { src: 'travelPreferences', label: ['偏好选择', 'Preferences'], alt: ['旅行项目的海滩、城市与山野偏好选项', 'Beach, city, and mountain preference choices in the travel project'] },
      { src: 'travelDestinations', label: ['目的地列表', 'Destinations'], alt: ['旅行项目默认目的地卡片列表', 'Default destination-card collection in the travel project'] },
    ],
  },
];
