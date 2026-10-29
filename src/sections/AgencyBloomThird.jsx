import React from 'react';
import SectionHeader from '../components/SectionHeader';
import './agency-bloom.css';
import image0 from '../assets/agency-bloom-third/0.webp';
import image1 from '../assets/agency-bloom-third/1.webp';
import image2 from '../assets/agency-bloom-third/2.webp';
import image3 from '../assets/agency-bloom-third/3.webp';
import image4 from '../assets/agency-bloom-third/4.webp';

const Figure = ({ src, alt, caption, portrait = false }) => <figure className={`article-figure${portrait ? ' article-figure-portrait' : ''}`}><img src={src} alt={alt} loading="lazy" />{caption && <figcaption className="article-cover-caption">{caption}</figcaption>}</figure>;
const Heading = ({ number, children }) => <h3><span>{number}</span>{children}</h3>;

export default function AgencyBloomThird() {
  return <article className="agency-article" lang="zh-CN"><div className="article-page">
    <SectionHeader eyebrow="AGENCY BLOOM" title="Agency Bloom" as="h1" />
    <header className="article-header"><h2>暂时没有掌声也想继续做下去</h2></header>
    <div className="article-body">
      <Heading number="01">在努力没有被看见的时候</Heading>
      <p>最近看了一段关于大学生求职的视频，里面谈到美国一些大学毕业生寻找工作的经历，也讨论了一个让我很在意的问题：</p>
      <blockquote>「当越来越多的任务可以交给 AI，年轻人该怎样获得最初的工作机会，又怎样在真正做事的过程中，慢慢积累自己的经验和判断力？」</blockquote>
      <Figure src={image0} alt="文章配图" />
      <p>过去，我们常常期待一条相对清楚的道路：认真学习，找到一份工作，在工作中积累经验，再慢慢知道自己适合什么。但当这条路走得不那么顺利时，人很容易把迟迟没有得到的机会，理解成对自己的否定。投出去的简历没有回音，学过的知识暂时找不到用处，看到别人已经取得了成绩，心里也难免着急。即使知道每个人的处境不同，轮到自己等待的时候，还是会忍不住问：是不是我做得还不够？是不是应该换一个方向？如果继续坚持，究竟还有没有意义？</p>
      <p>这些疑问，在我尝试开发 Agency Bloom 的时候，也常常出现：</p>
      <blockquote>「有些细节花了很多时间反复调整，别人可能根本不会注意到；有些自认为不错的想法，真正拿出来时，也可能得不到多少回应」</blockquote>
      <p>想到这些，确实会有些害怕。因为当一件事情还没有得到认可时，我们很难分清，自己是在坚持一个值得继续探索的方向，还是只是不愿意承认之前的投入可能没有得到预期的结果。</p>
      <Figure src={image1} alt="真实尝试的文章配图" caption="在真实的尝试里，积累自己的判断力" />
      <Heading number="02">喜欢，也需要听见真实的声音</Heading>
      <p>做自己真心喜欢的作品时，<strong>或许我们不必要求每一份努力都立刻得到回应。</strong>如果一件事仍然有让我牵挂的问题，还有我想弄明白的地方，那么即使眼下没有多少掌声，我也愿意再给它一点时间。对我来说，做一件喜欢的事情，不只是期待它最终能获得多少认可，也包括享受其中的好奇、思考和尝试。哪怕暂时没有结果，至少在这个过程中，我能够接触新的问题，学到原本不会的东西，也一点点认识自己。</p>
      <p>当然，喜欢一件事，并不意味着只需要相信自己的想法。我也逐渐意识到，<strong>没有掌声和没有价值，并不是一回事；但没有掌声，也不能自动证明自己的坚持就是正确的。</strong>我们仍然需要认真面对现实，听取别人的意见，判断自己的努力是否真的产生了价值。有些想法可能需要修改，有些方向可能不再适合继续投入。</p>
      <p>承认这些，并不意味着之前的时间都白费了，或许<strong>真正的成长</strong>，就是在一次次尝试中发现自己原本没有考虑到的问题，再慢慢修正判断，而不是永远坚持最初的答案。</p>
      <Figure src={image2} alt="听取反馈的文章配图" caption="认真听见反馈，也慢慢修正自己的判断" />
      <Heading number="03">给自己留一点主动选择的空间</Heading>
      <p>我也不想把这些话说得太轻巧：找工作需要机会，生活需要收入，时间和精力也都有现实的限制。喜欢一件事，并不能让这些问题自动消失。<strong>我不认为每个人都应该不计代价地追求热爱。</strong>对很多人来说，一份稳定的工作、一种能够负担的生活，本身就是很重要的愿望。只是，在认真考虑这些现实问题的同时，我仍然希望给自己保留一点主动选择的空间，而不是因为暂时没有得到认可，就认定自己所做的一切都没有意义。</p>
      <p>当外部的机会还没有到来，当技术的发展快得让人有些不知所措，我们或许仍然可以问自己：还有什么事情，是我愿意亲自去了解、去尝试，并且一点点做好的？这些尝试未必立刻带来收入，也未必都能成为一份漂亮的作品。但我们可能会因此发现自己真正感兴趣的方向，理解某种以前不熟悉的需求，或者在解决具体问题的过程中，逐渐建立起自己的判断力。我想，<strong>经验不一定只来自一份正式工作，也可能来自一次认真完成的尝试、一段真实的合作，或者一个没有按照预期发展的项目。</strong></p>
      <Figure portrait src={image3} alt="小尝试的文章配图" caption="从一点好奇，走向一次小尝试" />
      <Heading number="04">为自己创造一点新的可能</Heading>
      <p>我想起之前和朋友讨论过的一个问题：<strong>为什么我们一定要在已经存在的世界里，找到一个属于自己的位置？</strong>我们习惯了按照已有的岗位、职业和评价标准寻找方向，仿佛必须先找到一个能够容纳自己的位置，才算没有落后。但也许，人生并不只有这一种可能。我们当然可以寻找适合自己的工作，学习已经被证明有价值的能力，也可以在条件允许的时候，试着创造一些原本不存在的东西。它可能是一个小产品、一种新的服务方式，也可能只是用自己的理解，为别人解决一个过去没有被认真对待的问题。创造不一定意味着做出多么伟大的事业，也不保证会得到市场认可。它只是提醒我，我们并非只能等待世界为自己留出一个位置，有时也可以通过具体的尝试，为自己和别人增加一点新的选择。这种可能性让我觉得珍贵，因为它不要求我们一开始就知道自己最终会走向哪里，也不要求所有尝试都必须成功。</p>
      <Figure src={image4} alt="创造新选择的文章配图" caption="为自己和别人，增加一点新的选择" />
      <p>我不知道自己未来会走向怎样的职业道路，但至少现在，我还有想弄明白的问题，还有愿意认真完成的事情，也愿意继续听取真实的声音，慢慢修改、慢慢理解。掌声当然会让人高兴，我们都希望自己的努力能够被看见，也希望认真做出的东西能够得到认可。只是，暂时没有掌声的时候，我也想提醒自己：<strong>不必把沉默理解成否定。</strong></p>
      <p>比起急着证明自己已经找到了位置，我更希望在认真做事的过程中，积累判断力，也试着创造一些原本不存在的可能。如果一件事情仍然让我好奇，仍然有值得理解的问题，也还有现实条件允许我继续尝试，那么我愿意再往前走一点。<strong>不是因为坚持本身一定会带来成功，而是因为在这些真实的尝试里，我正在认识自己，理解别人，也学习怎样把一件在意的事情做好。</strong></p>
      <blockquote>Agency Bloom<br /><small>从一点好奇，走向一次小尝试</small></blockquote>
      <footer className="article-footer"><span>Agency <em>Bloom</em></span><a href="https://mp.weixin.qq.com/s/pThuorA_l3hqmpPardULOg" target="_blank" rel="noopener noreferrer">阅读公众号原文 ↗</a></footer>
    </div>
  </div></article>;
}
