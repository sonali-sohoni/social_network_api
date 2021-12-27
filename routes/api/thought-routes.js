const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createNewThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createNewThought);
router.route("/:id").get(getThoughtById).put(updateThought);
router.route("/:userId/:thoughtId").delete(deleteThought);

router.route("/:userId/:thoughtId").post(addReaction);

router.route("/:userId/:thoughtId/:reactionId").delete(deleteReaction);
module.exports = router;
