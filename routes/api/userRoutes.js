const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  postUser,
  deleteUser,
  updateUser,
  addUserFriend,
  deleteFriend,
} = require("../../controllers/userController");
// api/users
router.route("/").get(getAllUsers).post(postUser);
//api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
///api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addUserFriend)
  .delete(deleteFriend);
module.exports = router;