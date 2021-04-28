import data from "../../../utils/db.json";

async function getProducts(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
}

export default getProducts;
