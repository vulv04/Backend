
import Category from "./category.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import findByIdCategory from "./category.service.js";
import MESSAGES from "../../common/contstans/messages.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const existing = await Category.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS));
  const data = await Category.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data)
  );
});

export const getListCategorys = handleAsync(async (req, res, next) => {
  const data = await Category.find();
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.LIST_SUCCESS, data)
  );
});

export const getDetailCategory = handleAsync(async (req, res, next) => {
  const data = await findByIdCategory(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.CATEGORY.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.DETAIL_SUCCESS, data)
  );
});

export const updateCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndUpdate(id, req.body);
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
});

export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
});
