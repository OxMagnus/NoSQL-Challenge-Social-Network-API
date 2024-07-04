const { User, Thought } = require("../models");
function resError (res, err){
  return res.status(500).json(err.message);
}
module.exports = {

  async allThought(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
    resError(res, err);
    }
  },
  async singleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res
          .status(404)
          .json({ message: "thought with this id was not found!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async createThought(req, res) {
    try {
      //creates a thought and adds the thought to the user 
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username},
        {
          $addToSet: { thoughts: thought._id },
        },
        { new: true }
      );
      if (!user) {
        res
          .status(404)
          .json({ message: "Thought created but the user Id was not found" });
      } else {
        res.json({ message: "Thought was created successfully!" });
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async updateThought(req, res) {
    try {
      //updates a thought by id
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res
          .status(404)
          .json({ message: "thought with this id was not found!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async deleteThought(req, res) {
    try {
      //deletes a thought by _id
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res
          .status(404)
          .json({ message: "thought with this id was not found!" });
      } else {
        res.json({ message: "Thought was deleted successfully!" });
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $addToSet: { reactions: req.body },
        },
        { new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: "no thought with this id was found" });
      } else {
        res.json(reaction);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async deleteReaction(req, res) {
    try {
      //deletes a reaction
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        { new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: "no thought with this id was found" });
      } else {
        res.json(reaction);
      }
    } catch (err) {
      resError(res, err);
    }
  },
};
