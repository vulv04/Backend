import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstans/messages.js";
import Banner from "./banner.model.js";

export const getListBanner = handleAsync(async (req, res) => {
  const data = await Banner.find({ deletedAt: null });
  return res.json(
    createResponse(true, 200, MESSAGES.BANNER.LIST_SUCCESS, data)
  );
});

export const getDetailBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findById(req.params.id);
  if (!data) return next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  return res.json(createResponse(true, 200, MESSAGES.BANNER.GET_SUCCESS, data));
});

export const createBanner = handleAsync(async (req, res, next) => {
  const existing = await Banner.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.BANNER.CREATE_ERROR_EXISTS));
  const data = await Banner.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.BANNER.CREATE_SUCCESS, data)
  );
});

export const updateBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.BANNER.UPDATE_SUCCESS, data)
  );
});

export const deleteBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findByIdAndDelete(req.params.id);
  if (!data) return next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.BANNER.DELETE_SUCCESS, data)
  );
});

export const softDeleteBanner = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const banner = await Banner.findByIdAndUpdate(id, { deletedAt: new Date() });
  if (!banner) return next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.BANNER.SOFT_DELETE_SUCCESS)
  );
});
