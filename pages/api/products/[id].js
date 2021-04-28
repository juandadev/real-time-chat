import data from "../../../utils/db.json";

async function getProduct(req, res) {
  const { id } = req.query;
  const result = data.filter((item) => item.id === parseInt(id));

  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(result));
}

export default getProduct;
