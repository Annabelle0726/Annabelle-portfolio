import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ArticleFooter from '../components/ArticleFooter';
import './agency-bloom.css';
import image0 from '../assets/article-design-care/0.webp';
import image1 from '../assets/article-design-care/1.webp';
import image2 from '../assets/article-design-care/2.webp';
import image3 from '../assets/article-design-care/3.webp';

const Figure = ({ src, alt, width, height, portrait = false }) => <figure className={`article-figure${portrait ? ' article-figure-portrait' : ''}`}><img src={src} alt={alt} width={width} height={height} loading="lazy" /></figure>;
const Heading = ({ number, children }) => <h3><span>{number}</span>{children}</h3>;

export default function DesignCareArticle() {
  return <article className="agency-article" lang="zh-CN"><div className="article-page">
    <SectionHeader eyebrow="DESIGN & EXPERIENCE" title="好看，想让你多看一眼；用心，想让你心动" as="h1" />
    <div className="article-body">
      <div className="article-intro-label">好看，是想让你多看一眼</div>
      <p>好看的 UI，像一个漂亮的女孩子，让人忍不住多看一眼；至于愿不愿意留下来，还要看相处起来舒不舒服。</p>
      <p>做界面时，我常常会想起这种感觉。初次相遇，可以因为一抹颜色、一张画面、一个恰好的细节而心动。后来，吸引我们再次靠近的，往往是那些相处中的小事：表达能不能被理解，期待有没有得到回应，偶尔犹豫一下，是否也能从容地继续。我希望自己做出的东西，也有这样的美感与体贴。</p>
      <Heading number="01">先为你，留一束舒服的光</Heading>
      <p>如果网站是一间房子，我想先为它选一束舒服的光。我喜欢蓝色的清透，也喜欢金色落在纸面上的温暖。于是，让丝带轻轻流过画面，让文字停在安静的地方，再留出一些空白，让眼睛可以休息。</p>
      <p>有些地方适合明亮一点，有些地方需要安静一些。标题、图片、颜色和留白，都在悄悄影响我们看一个页面的心情。我会反复调整它们之间的距离，直到画面里的每一样东西，都找到了舒服的位置。希望你打开它的时候，会愿意停一下。</p>
      <p>然后，自然地往里面走。</p>
      <Figure src={image0} width={1080} height={608} alt="蓝金配色与页面布局的文章配图" />
      <Heading number="02">让你的好奇，得到一点回应</Heading>
      <p>甜点页面可以有一点俏皮。看到礼盒时，也许会想知道里面藏着什么。点一下，今日口味被揭晓，好奇有了答案，等待也多了一点甜。阅读的地方，我想让它安静一些。</p>
      <p>深色的背景、一点月光、一本本有自己位置的书。让人想起夜晚独处的书房，可以慢慢翻看，也可以暂时没有目标，只凭此刻的心情，寻找下一本想读的故事。</p>
      <p>到了旅行的页面，画面又可以舒展开来。</p>
      <p>海边、城市、山野。有时候，我们还说不出想去哪，只知道想换一种风景。那么，就从喜欢的那张图片开始吧。我喜欢为不同的场景，找到适合它的语气。</p>
      <p>也喜欢让画面回应你的动作：点下去之后，发生一点清楚的变化；作出选择之后，知道它已经被记住。这些小小的回应，会让一个界面慢慢有了相处的感觉。</p>
      <Figure src={image1} width={1080} height={608} alt="甜点、阅读与旅行页面的文章配图" />
      <Heading number="03">漂亮的地方，也应该住得舒服</Heading>
      <p>一间房子好不好住，有时要走进去才知道。常用的东西是否顺手，转身时会不会碰到桌角，想独处的时候，有没有一个安静的位置。</p>
      <p>界面也是这样。我会留意那些很容易被忽略的瞬间：你正在寻找下一步，入口有没有出现在合适的地方；你想改主意，能不能轻松回去；换到手机上，文字是否依然好读，手指是否能舒服地点到想去的地方。</p>
      <p>还有，等待是不是太久，提醒会不会打扰，装饰有没有挡住真正想看的内容。这些细节，常常需要自己一遍遍走过，才会发现。</p>
      <p>我愿意花时间在这里。因为我希望你使用它的时候，可以把注意力留给自己的事情。</p>
      <Figure portrait src={image2} width={1024} height={1536} alt="界面细节与移动端体验的文章配图" />
      <Heading number="04">每一次操作，都是一次相处</Heading>
      <p>美感让初次相遇令人心动，而长久的吸引，来自一次次相处时的理解与回应。我想，这也是我喜欢设计的原因。一处留白，可以让阅读轻松一些；一个清楚的提示，可以替人省去一点猜测；一次恰好的反馈，可以让伸出去的手，不至于落空。那些关于颜色、布局和操作的选择，最后都会变成某个人真实感受到的片刻。也许只是觉得：“这里看着很舒服。”或者：“嗯，我知道接下来怎么做了。”能带来这样的感受，我就会很开心。</p>
      <p>最近，我把自己开发和参与的作品，慢慢整理到了一起。有明亮的画面，也有安静的角落；有已经成形的想法，也有还在继续打磨的细节。今天，想把这间小小的房子的门打开。请你进来坐坐，看看有没有一处风景，刚好让你喜欢。</p>
      <Figure src={image3} width={1080} height={1080} alt="邀请读者走进个人网站的文章配图" />
      <ArticleFooter />
    </div>
  </div></article>;
}
