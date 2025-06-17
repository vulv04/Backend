import Brand from "./brand.model.js";

export const getListBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.find();
  return res.json(createResponse(true, 200, MESSAGES.BRAND.LIST_SUCCESS, data));
});

export const getDetailBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.BRAND.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_SUCCESS, data));
});

export const createBrand = handleAsync(async (req, res, next) => {
  const existing = await Brand.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.BRAND.CREATE_ERROR_EXISTS));
  const data = await Brand.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.BRAND.CREATE_SUCCESS, data)
  );
});

export const updateBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findByIdAndUpdate(req.params.id, req.body);
  if (!data) return next(createError(false, 404, MESSAGES.BRAND.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.BRAND.UPDATE_SUCCESS, data)
  );
});

export const deleteBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findByIdAndDelete(id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.BRAND.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.BRAND.NOT_FOUND));
});

export const softDeleteBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.BRAND.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.BRAND.NOT_FOUND));
});
