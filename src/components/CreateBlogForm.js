import React, {useState, useImperativeHandle} from "react";

const CreateBlogForm = React.forwardRef(({createNewBlog}, ref) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	const handleCreateNewBlog = (event) => {
		event.preventDefault()
		
		const blogObject = {
			title: title,
			author: author,
			url: url
		}

		createNewBlog(blogObject)
		setTitle('')
		setAuthor('')
		setUrl('')	
	}

	useImperativeHandle(ref, () =>{
		return {
			setTitle, setAuthor, setUrl
		}
	})


	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreateNewBlog}>
			<div>
				title:
					<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
					<input
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
					<input
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
		</div>
)})

export default CreateBlogForm