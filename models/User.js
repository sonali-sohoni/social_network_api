const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			trim: true,
			required: "Please enter valid username",
		},
		email: {
			type: String,
			unique: true,

			validate: [validateEmail, "Please enter valid email address"],
			required: true,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],

		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual("thoughtCount").get(function () {
	return this.thoughts.length;
});

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);
module.exports = User;
