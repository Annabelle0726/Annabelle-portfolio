import React from 'react';
import SectionHeader from '../components/SectionHeader';
import './agency-bloom.css';
import image0 from '../assets/agency-bloom-second/0.webp';
import image1 from '../assets/agency-bloom-second/1.webp';
import image2 from '../assets/agency-bloom-second/2.webp';
import image3 from '../assets/agency-bloom-second/3.webp';

const Figure = ({ src, alt, portrait = false }) => <figure className={`article-figure${portrait ? ' article-figure-portrait' : ''}`}><img src={src} alt={alt} loading="lazy" /></figure>;
const Heading = ({ number, topic, children }) => <><h3><span>{number}</span>{children}</h3><p className="article-topic">{topic}</p></>;

export default function AgencyBloomSecond() {
  return <article className="agency-article" lang="zh-CN"><div className="article-page">
    <SectionHeader eyebrow="AGENCY BLOOM" title="Agency Bloom" as="h1" />
    <header className="article-header"><h2>当技术让一切变得越来越容易，真正值得思考的是我们还能创造什么独特的价值</h2></header>
    <div className="article-body">
      <div className="article-intro-label">前言</div>
      <p>关于选择、生长，与自己的方向</p>
      <p>变化很快，我们怎样慢慢找到自己的位置</p>
      <p>当越来越多的事情都能更快完成，我们是不是也能活得从容一点？</p>
      <p>写一份方案、完成一件作品、尝试经营一门小生意，似乎都有了更多办法。可选择变多了，人有时反而更拿不准：现在学的东西，以后还用得上吗？自己喜欢的事情，值得继续投入吗？如果迟迟没有找到方向，是不是已经落后了？</p>
      <p>我也常常有这样的疑问。</p>
      <Heading number="01" topic="关于价值">在具体的事情里，积累自己的价值</Heading>
      <p>不过，有一件事让我稍微踏实了一些：无论使用什么工具，作品最终还是要被人看见，<strong>产品要让人用得顺手，合作也离不开信任。</strong>这些真实的体验和人与人之间建立的关系，并不是按下一个按钮就能替代的。所以，在寻找自己的位置时，也许可以试着把问题问得更具体一些：我做过哪些事，真正让别人省了心？遇到什么问题，我愿意多花一点时间去理解？哪些能力已经能够派上用场，哪些还需要通过实践慢慢积累？</p>
      <p>求职时可以这样问，做自己的项目时也可以这样问。如果希望长期经营一件事，还可以进一步思考：别人为什么愿意选择我，又为什么愿意继续信任我？</p>
      <p>我们常说的“护城河”，也许就藏在这些具体的答案里。它可能是对某类需求越来越深入的理解，是遇到问题时可靠的回应，也是一次次认真完成事情之后，逐渐积累起来的<strong>经验与信任</strong>。</p>
      <Figure portrait src={image0} alt="关于价值的文章配图" />
      <Heading number="02" topic="关于生活">给自己留一点余地</Heading>
      <p>我也想给自己留一点余地，毕竟，生活并不只有工作、成长和证明自己的价值。和喜欢的人吃一顿饭，做一些不需要交出成果的小事，或者偶然发现自己对某个陌生的领域产生了兴趣，这些看似普通的经历，同样值得认真对待。</p>
      <p><strong>每个人都有值得被看见的部分。</strong>有些能力，需要遇到合适的事情才会显露；有些愿望，也需要在生活稍微安静下来时，才能慢慢听清。暂时还没有找到自己的位置，并不意味着一定要急着给自己一个答案。也许可以先多经历一些事情，多认识自己一点。</p>
      <Figure src={image1} alt="关于生活的文章配图" />
      <Heading number="03" topic="关于 Bloom">从一点好奇开始</Heading>
      <p>你可以带着一个还没有想清楚的问题来，也可以只是随便看看，聊一聊最近的犹豫，发现一个过去没有考虑过的角度，或者从某件让自己有点好奇的小事开始，亲自尝试一下。</p>
      <Figure portrait src={image2} alt="关于好奇与探索的文章配图" />
      <p>给今天，留一点好奇</p>
      <p>我不希望它急着替用户规划好一条道路，更不想让探索自己变成另一项必须完成的任务。比起不断告诉人们应该怎样变得更好，更希望它能帮助我们发现，究竟什么事情值得自己投入时间，又有什么样的生活，是自己真正愿意去经历的。如果有一天，用户打开 Agency Bloom，能够稍微松一口气，并在某个瞬间发自内心地觉得：“<strong>这个，我倒是有点想试试。</strong>”那么对我来说，这就是一个很有意义的开始。</p>
      <p>方向未必会一下子变得清晰，但也许正是在这样一次次真实而微小的尝试中，我们会逐渐知道，自己想往哪里走。</p>
      <Figure portrait src={image3} alt="关于成长和方向的文章配图" />
      <p>一份方案可以做得很漂亮，但收到它的人，可能还需要有人听懂他的犹豫，把不明白的地方讲清楚，在事情出了岔子的时候，也愿意一起想办法。</p>
      <p>如果说有什么值得长久积累的“护城河”，我想，这也是其中一部分：你理解他所处的境况，也愿意把交到手里的事情认真做完。相处久了，他知道，有些问题可以放心和你商量。</p>
      <blockquote>方向也许就从这里，慢慢清楚起来<br /><small>Agency Bloom · 按照自己的节奏，慢慢生长</small></blockquote>
      <footer className="article-footer"><span>Agency <em>Bloom</em></span><a href="https://mp.weixin.qq.com/s/byApMNE4pbO2M4OX62F4Cg" target="_blank" rel="noopener noreferrer">阅读公众号原文 ↗</a></footer>
    </div>
  </div></article>;
}
