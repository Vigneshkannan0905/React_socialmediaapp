import Post from './Post.js'

const Feed = ({posts}) => {
  return (
    <>
        {posts.map(post => {
            return <Post key={post.id} post={post} />
        })}
    </>
  )
}

export default Feed