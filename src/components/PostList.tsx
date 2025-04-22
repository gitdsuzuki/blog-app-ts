import { useState, useEffect } from 'react'
import PostBox from './PostBox'

type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  categories: Array<string>;
  content: string;  
}

type Posts = {
  posts: Array<Post>
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const response: Response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await response.json() as Posts
      setPosts(data.posts)
      setLoading(false)
    }
    fetcher()
  },[])

  if (loading) return <p>読み込み中です...</p>

  return (
    <>
      {posts.map((post: Post) => <PostBox key={post.id} {...post} />)}
    </>
  )
}

export default PostList