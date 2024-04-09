const employees = require('../models/employeesModel')
require('../models/departmentsModel')
require('../models/shiftsModel')

const getAll = () => {
    return employees.find().populate('department').populate('assignedShifts').exec()
}

const getById = (id) => {
    return employees.findById(id)
}

const getByDepartmentId = (departmentId) => {
    return employees.findOne({departmentId: departmentId})
}

const update = (id,employee) => {
    return employees.findByIdAndUpdate(id,employee)
}

const create = (employee) => {
    return employees.create(employee)
}

module.exports = {getAll, getById, getByDepartmentId, update, create}