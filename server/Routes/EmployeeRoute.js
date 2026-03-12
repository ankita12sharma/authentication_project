const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeesByPost,
  getEmployeeByName,
  getEmpByRange,
  getEmployeesByPrice,
  getEmpBySalAndPost,
  getEmpByMulPosts,
  sortBySalary,
  searchByName,
  incSalary,
} = require("../Controllers/EmployeeController");

const router = new express.Router();

router.get("/getemp", getEmployees);

router.get("/bypost", getEmployeesByPost);
router.get("/byname", getEmployeeByName);
router.get("/byrange", getEmpByRange);
router.get("/byprice", getEmployeesByPrice);
router.get("/mulpost", getEmpByMulPosts);
router.get("/sortbysal", sortBySalary);
router.get("/empbyname", searchByName);

router.post("/createemp", createEmployee);
router.put(`/editemp/:id`, updateEmployee);
router.patch(`/incbysal/:id`, incSalary);
router.delete(`/deleteemp/:id`, deleteEmployee);
router.get("/postsal", getEmpBySalAndPost);

module.exports = router;
