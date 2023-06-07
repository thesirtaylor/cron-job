const router = require("express").Router();
const schemaRoute = require("../controller/schema/controller");

router.post("/create", schemaRoute.CreateSchema);
router.get("/get", schemaRoute.CreateCronJob)

module.exports = router;
