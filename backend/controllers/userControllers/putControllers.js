/** @format */

const UserModel = require("../../model/userModel");

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.send({ success: true, updatedUser: updatedUser });
    } else {
      res
        .status(400)
        .send({ success: false, message: "no matching user found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      let isUser = await user.checkPassword(currentPassword);
      if (isUser) {
        user.password = newPassword;
        await user.save();
        res.send({ success: true, updatedUser: user });
      } else {
        //if password is not correct
        res
          .status(400)
          .send({ success: false, message: "current password is not correct" });
      }
    } else {
      //user is unbekannt
      res.status(404).send({ success: false, message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteUsersGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id });

    if (user) {
      user.set("group", undefined, { strict: false });
      user.save();
      res.send({ success: true, message: "users group updated" });
    } else {
      res
        .status(400)
        .send({ success: false, message: "no matching user found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
