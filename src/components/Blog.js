import React, {useState} from 'react'

const Blog = ({blog, incrementLikes, nameOfCreator, removeBlog}) => {
  const [showMore, setShowMore] = useState(false)

	const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
	
	const toggleVisibility = () => {
		setShowMore(!showMore)
	}

	const increaseLikes = () => {
		incrementLikes(blog)
	}

	const remove = () => {
		const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if (result) {
			removeBlog(blog)
		}
	}

	const RemoveButton = () => {
		return (
			<div>
				{ nameOfCreator === blog.user.name ?
					<div>
						<button onClick={remove}>remove</button>
					</div>
					:
					null
				}
			</div>
		)
	}

	return (
		<div style={blogStyle}>
		{ showMore === false ?
			<div>
    		{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
			</div>
			:
			<div>
				{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br/>
				{blog.url} <br/>
				likes {blog.likes} <button onClick={increaseLikes}>like</button> <br/>
				{blog.user.name} <br/>
				<RemoveButton />
			</div>
		}
		</div>
	)	  
}

export default Blog