import { POSTS } from '../data/portfolio';

export default function Blog() {
  return <div className="posts">{POSTS.map((post, index) => <a className="post" href={post.href} key={post.title}><span className="post-num">0{index + 1}</span><div className="post-main"><span className="post-date">{post.date}</span><h3>{post.title}</h3><p>{post.blurb}</p></div><span className="post-arrow">↗</span></a>)}</div>;
}
