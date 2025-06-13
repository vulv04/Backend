import Category from "./Category.js";


export const createCategory = async (req, res) => {
  try {
    console.log("body:", req.body);
    const data = await Category.create(req.body);
    console.log(data);
    if (data) {
      return res.status(201).json({
        success: true,
        message: "Create Category",
        data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "False",
    });
  } catch (error) {
    console.log(error);
  }
};
