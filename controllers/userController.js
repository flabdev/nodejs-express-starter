const UserModel = require('../models/userModel');
const factory = require('./handlefactory');

exports.getAllUsers = factory.getAll(UserModel);
exports.getUser = factory.getOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.updateUser = factory.updateOne(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);
