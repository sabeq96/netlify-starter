import React from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'

export default function Post(data) {
  const { post } = useRouteData()
  console.log(data)
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{post.data.title}</h3>
      <p>{post.content}</p>
    </div>
  )
}
