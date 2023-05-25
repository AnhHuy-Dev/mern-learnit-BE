const Post = require("../models/Post");
require("dotenv").config();

class PostController {
	//POST /api/posts
	async create(req, res, next) {
		const { title, description, url, status } = req.body;
		if (!title) return res.status(400).json({ success: false, message: "Missing title!" });

		try {
			const newPost = new Post({
				title,
				description,
				url: url.startsWith("https://") ? url : `https://${url}`,
				status: status || "TO LEARN",
				user: req.userId,
			});

			await newPost.save();
			res.json({ success: true, message: "Create new post success", newPost });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/posts
	async store(req, res, next) {
		try {
			const posts = await Post.find({ user: req.userId });
			res.json({ success: true, posts });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
	//PUT /api/posts/:id
	async update(req, res, next) {
		const { title, description, url, status } = req.body;
		if (!title) return res.status(400).json({ success: false, message: "Missing title!" });

		try {
			let updatedPost = {
				title,
				description: description || "",
				url: (url.startsWith("https://") ? url : `https://${url}`) || "",
				status: status || "TO LEARN",
			};
			updatedPost = await Post.findOneAndUpdate({ _id: req.params.id, user: req.userId }, updatedPost, { new: true });

			//user not authorised or post not found
			if (!updatedPost) return res.status(401).json({ success: false, message: "Post not found or user not authorised" });
			res.json({ success: true, message: "Excellent progress!", updatedPost });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
	//DELETE /api/posts/:id
	async delete(req, res, next) {
		try {
			const deletedPost = await Post.deleteOne({ _id: req.params.id, user: req.userId });
			if (!deletedPost) return res.status(401).json({ success: false, message: "Post not found or user not authorised" });

			res.json({ success: true, message: "Deleted successfully!" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new PostController();
