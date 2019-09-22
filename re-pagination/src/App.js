import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './components/posts';
import Pagination from './components/pagination';

function App() {
	const [posts, setPosts] = useState([]);
	// setLoading like hook function to edit loading variable
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	const fetchPosts = async () => {
		setLoading(true);
		const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
		setPosts(res.data);
		setLoading(false);
	}

	// onmount and onupdate =)
	useEffect(() => {
		fetchPosts();
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	// [] only run when it mounts
	console.log(posts);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	}

	return (
		<div className="container mt-5">
			<h1 className="text-primary mb-3">My App</h1>
			<Posts posts={currentPosts} loading={loading} />
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={posts.length}
				paginate={paginate}
			/>
		</div>
	);
}

export default App;
