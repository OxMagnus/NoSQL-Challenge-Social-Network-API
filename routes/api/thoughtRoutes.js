const router = require("express").Router();
const {
  allThought,
  singleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//api/thoughts
router.route('/').get(allThought).post(createThought)
//api/thoughts/:thoughtId
router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought)
//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

//api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports= router;
