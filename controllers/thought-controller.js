const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbResult) => {
				if (!dbResult) {
					res.status(404).json({ message: "requested user not found" });
					return;
				}
				res.json(dbResult);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbResult) => res.json(dbResult))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	getAllThoughts(req, res) {
		Thought.find({})
			.then((dbResult) => {
				res.json(dbResult);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then((dbResult) => {
				if (!dbResult) {
					res.status(404).json({ message: "requested user not found" });
					return;
				}
				res.json(dbResult);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	createNewThought({ params, body }, res) {
		Thought.create(body)
			.then((dbResult) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: dbResult._id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No Thought found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No Thought found with this id!" });
					return;
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};
module.exports = thoughtController;
