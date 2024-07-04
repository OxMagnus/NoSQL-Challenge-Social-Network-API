const { User, Thought } = require("../models");
const resError = (res, err) => {
  return res.status(500).json(err.message);
};

module.exports = {
  //gets all of the users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      resError(res, err);
    }
  },
  async getSingleUser(req, res) {
    try {
      //gets a single user by id

      const singleUser = await User.findOne({
        _id: req.params.userId,
      }).populate("thoughts");
      if (!singleUser) {
        res.status(404).json({ message: "User with this id was not found" });
      } else {
        res.json(singleUser);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async postUser(req, res) {
    //creates a user
    try {
      const createdUser = await User.create(req.body);
      res.json(createdUser);
    } catch (err) {
      resError(res, err);
    }
  },
  async deleteUser(req, res) {
    try {
      //deletes a user by _id and also the bonus was completed 
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deleteUser) {
        return res
          .status(404)
          .json({ message: "User with this id was not found" });
      }
      //erases the associated thoughts
      const deletedThoughts = await Thought.deleteMany({
        username: deleteUser.username,
      });
      if (!deletedThoughts) {
        res
          .status(404)
          .json({ message: "User deleted but no thoughts were found!" });
      } else {
        res.json({ message: "User and thoughts are deleted successfully" });
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!updateUser) {
        res.status(404).json({ message: "user with this id was not found" });
      } else {
        res.json(updateUser);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async addUserFriend(req, res) {
    try {
      //adds a friend by _id
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { _id: req.params.friendId } } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "no user with this id was found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      resError(res, err);
    }
  },
  async deleteFriend(req, res) {
    try {
      //deletes a friend by id
      
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: { friends: req.params.friendId },
        },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "no user with this id was found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      resError(res, err);
    }
  },
};
