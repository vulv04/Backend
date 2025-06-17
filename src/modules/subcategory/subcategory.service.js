import Category from "./subcategory.model.js";

const findByIdCategory = async (id) => {
  const data = await Category.findById(id);
  if (data) return data;
};

export default findByIdCategory;
