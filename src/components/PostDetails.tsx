import Dayjs from 'dayjs'
import {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  categories: Array<string>;
  content: string;
}

type PostData = {
  post: Post;
}

const PostDetails = () => {
  const { id } = useParams<string>()
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res: Response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`)
      const data = await res.json() as PostData
      setPost(data.post)
      setLoading(false)
    }
    fetcher()
  },[])

  if (loading) return <p>読み込み中です...</p>
  if (!post) return <div className="p-10 text-center text-3xl">404: 記事が見つかりませんでした</div>

  const { title, thumbnailUrl, createdAt, categories, content } = post

  return (
    <div className="w-full pt-14 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="pb-4">
          <img src={thumbnailUrl} />
        </div>
        <div className="flex pl-3 pr-6">
          <div className="text-sm opacity-50 flex flex-auto justify-start">
            {Dayjs(createdAt).format("YYYY/M/DD")}
          </div>
          <div className="flex flex-auto justify-end">
            <ul className="flex text-sm">
              {
                categories.map((elem: string) => 
                <li key={elem} className="text-sky-700 border-1 py1 px-1 5 ml-2 rounded-sm">
                  {elem}
                </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="text-2xl pl-3 py-2 mb-2">
          {title}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} className="pl-3 opacity-80" />
      </div>
    </div>
  )
}

export default PostDetails