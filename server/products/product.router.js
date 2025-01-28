const express = require("express");
const Joi = require("joi");
const router = express.Router();
const repository = require("./product.repository");
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const defaultLimit = limit ? parseInt(limit) : 10;
      const defaultPage = parseInt(page) ? parseInt(page) : 1;

      const allProducts = await repository.getProducts();

      const products = await repository.getPagedProducts(
        defaultLimit,
        defaultPage
      );

      const responseResults = {
        products,
        currentPage: defaultPage,
        itemsPerPage: defaultLimit,
        totalItems: allProducts.length,
        totalPages: Math.ceil(allProducts.length / defaultLimit),
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
