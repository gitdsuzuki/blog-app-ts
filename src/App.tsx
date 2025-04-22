import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PostList from './components/PostList'
import PostDetails from './components/PostDetails'
import Contact from './components/Contact'

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
