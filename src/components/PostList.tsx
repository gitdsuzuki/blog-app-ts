import { useState, useEffect } from 'react'
import PostBox from './PostBox'
import { Post, PostsResponse } from '../types/index.ts'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const response: Response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await response.json() as PostsResponse
      setPosts(data.posts)
      setLoading(false)
    }
    fetcher()
  },[])

  if (loading) return <p>読み込み中です...</p>

  return (
    <>
      {posts.map((post: Post) => <PostBox key={post.id} post={post} />)}
    </>
  )
}

export default PostList