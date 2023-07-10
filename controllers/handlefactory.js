const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { NO_DOCUMENT, DOCUMENT_DELETED } = require('../constants/index');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(NO_DOCUMENT, 404));
    }
    res.status(204).json({
      status: 'success',
      message: DOCUMENT_DELETED,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError(NO_DOCUMENT, 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// getOne with Populate
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError(NO_DOCUMENT, 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// getAll with Populate
exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let query = Model.find({});
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
