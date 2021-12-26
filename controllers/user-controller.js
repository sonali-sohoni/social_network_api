const User = require("../models/User");
const userController = {
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: "thoughts",

				select: "-__v",
			})
			.populate({
				path: "friends",

				select: "-__v",
			})
			.select("-__v")
			.then((dbResult) => {
				res.json(dbResult);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
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
	createUser({ body }, res) {
		User.create(body)
			.then((dbResult) => res.json(dbResult))
			.catch((err) => res.json(err));
	},

	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
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

	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
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

	///:userId/friends/:friendId
	addNewFriend({ params }, res) {
		console.log("NewFriendRequest");
		console.log(params);
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: params.friendId } },
			{ new: true }
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

	///:userId/friends/:friendId
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
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
};
module.exports = userController;
