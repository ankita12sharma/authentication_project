//const express = require("express");
const EmployeeModel = require("../Models/EmployeeModel");

//create
const createEmployee = async (req, res) => {
  try {
    const { emp_id, name, post, salary } = req.body;
    const employee = await EmployeeModel.findOne({ emp_id });
    if (employee) {
      return res.status(403).json({
        message: "Employee already exist",
        success: false,
      });
    }

    const employeemodel = new EmployeeModel({ emp_id, name, post, salary });
    await employeemodel.save();

    res.status(201).json({
      message: "Employee created successfully...",
      success: true,
      employeemodel,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get
const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// const getEmployeeById = async (req, res) => {
//   try {
//     const { id } = req.params; // get id from URL params

//     const employee = await EmployeeModel.findById(id)
//           .slice("projects", 3); // to fetch first three records

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: employee,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

//getEmployeesByPost

const getEmployeesByPost = async (req, res) => {
  try {
    const { post } = req.query;
    if (!post) {
      return res.status(400).json({
        code: "400",
        message: "Post is required!!",
      });
    }
    const emp_data = await EmployeeModel.find({ post: post });
    res.status(200).json({
      code: "200",
      message: "Record fetched successfully!!",
      data: emp_data,
    });
  } catch (err) {
    res.status(500).json({
      code: "500",
      message: "Unable to fetch record!!",
    });
  }
};

//update
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { emp_id, name, post, salary } = req.body;

    const updateData = {};
    if (emp_id) updateData.id = id;
    if (name) updateData.name = name;
    if (post) updateData.post = post;
    if (salary) updateData.salary;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//delete
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const existingEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Employee deleted successfully...",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get by name
const getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).json({
        responseCode: "400",
        responseMessage: "Name is required!!",
      });
    }
    const name_data = await EmployeeModel.find({ name: name });
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Record fetched successfully!!",
      data: name_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch record!!",
    });
  }
};

const getEmpByRange = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const [employees, totalRecords] = await Promise.all([
      EmployeeModel.find().skip(skip).limit(limit),
      EmployeeModel.countDocuments(),
    ]);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Employees fetched successfully!!",
      meta: {
        page,
        limit,
        totalRecords,
        returnRecords: employees.length,
      },
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

const getEmployeesByPrice = async (req, res) => {
  try {
    const { maxPrice } = req.query;
    const filter = {};
    if (maxPrice) {
      //filter.salary = { $lte: Number(maxPrice) };
      filter.salary = {};
      filter.salary.$lte = Number(maxPrice);
    }
    const emp_data = await EmployeeModel.find(filter);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: emp_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//AND
const getEmpBySalAndPost = async (req, res) => {
  try {
    const { post, maxSal } = req.query;
    const filter = {};
    if (post) {
      filter.post = String(post);
    }
    if (maxSal) {
      filter.salary = {};
      filter.salary.$lt = Number(maxSal);
    }
    const empdata = await EmployeeModel.find(filter);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: empdata,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//using $in (used to find multiple records like post=developer,designer)
const getEmpByMulPosts = async (req, res) => {
  try {
    const { post } = req.query;
    const filter = {};
    if (post) {
      filter.post = {};
      const postArr = post.split(",");
      filter.post = { $in: postArr };
    }
    const post_data = await EmployeeModel.find(filter);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: post_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//sort emp by salary
const sortBySalary = async (req, res) => {
  try {
    const { minSal, maxSal, sort } = req.query;
    const filter = {};
    if (minSal || maxSal) {
      filter.salary = {};
      if (minSal) {
        filter.salary.$gte = Number(minSal);
      }
      if (maxSal) {
        filter.salary.$lte = Number(maxSal);
      }
    }
    const sortOption = {};
    if (sort === "asc") {
      sortOption.salary = 1;
    } else if (sort === "desc") {
      sortOption.salary = -1;
    }
    const sort_data = await EmployeeModel.find(filter).sort(sortOption);

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: sort_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//search emp name starting with a or ending with a
const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {};
    if (!name) {
      res.status(400).json({
        responseCode: "400",
        responseMessage: "Name field is required",
      });
    }
    if (name) {
      filter.name = {
        $regex: `^${name}`, //starting with a
        //  $regex: `${name}$`, //ending with a
        $options: "i", //case-insensitive
      };

      //or case
      //     if (name) {
      // filter.$or = [
      //   { name: { $regex: `^${name}`, $options: "i" } }, // starting
      //   { name: { $regex: `${name}$`, $options: "i" } }, // ending
      // ];
    }
    //const emp_data = await EmployeeModel.find(filter);
    const [emp_data, totalRecords] = await Promise.all([
      EmployeeModel.find(filter),
      EmployeeModel.countDocuments(filter),
    ]);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      filteredRec: emp_data.length,
      totalRecords,
      data: emp_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

const incSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { salary } = req.body;
    if (!salary) {
      res.status(400).json({
        responseCode: "400",
        responseMessage: "Salary is required!!",
      });
    }
    const updateSal = await EmployeeModel.updateOne(
      { _id: id },
      { $inc: { amount: salary } },
      { runValidators: true },
    );
    // if (!updateSal) {
    //   return res.status(404).json({
    //     responseCode: "404",
    //     responseMessage: "Unable to update salary!!",
    //   });
    // }
    if (updateSal.matchedCount === 0) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "Unable to update salary!!",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Salary updated successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to increase salary!!",
    });
  }
};

//delete by id
// const deleteById=async(req,res)=>{
//     try{
// const {id}=req.params;
// if(!id)
// {
//     res.status(400).json({
//     code:"400",
//     message:"Id is required!!"
//     })
// }
// const emp_data=await EmployeeModel.deleteOne(
//     {_id:id}
// )
//  if (emp_data.deletedCount === 0) {
//       return res.status(404).json({
//         code: "404",
//         message: "Record not found"
//       });
//     }
// res.status(200).json({
// code:"200",
// message:"Record deleted successfully"
// })
//     }
//     catch(err)
//     {
//         res.status(500).json({
//         code:"500",
//         message:"Unavle to delete record"
//         })
//     }
// }

// const deleteByEmail=async(req,res)=>{
//     try{
// const {email}=req.body;
// if(!email)
// {
//     res.status(400).json({
//     code:"400",
//     message:"Email is required!!"
//     })
// }
// const emp_data=await EmpModel.deleteOne(
// {email}
// )
// if(emp_data.deletedCount===0)
// {
//     res.status(404).json({
//     code:"404",
//     message:"Email not found!!"
//     })
// }
// res.status(200).json({
// code:"200",
// message:"Record deleted successfully!!"
// })

//     }
//     catch(err)
//     {
//         res.status(500).json({
//         code:"500",
//         message:"Unable to delete record"
//         })
//     }
//   }
module.exports = {
  createEmployee,
  getEmployees,
  getEmployeesByPost,
  updateEmployee,
  deleteEmployee,
  getEmployeeByName,
  getEmpByRange,
  getEmployeesByPrice,
  getEmpBySalAndPost,
  getEmpByMulPosts,
  sortBySalary,
  searchByName,
  incSalary,
};
