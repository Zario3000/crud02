const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const result = await User.findAll()
    return res.status(200).json(result)
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body)
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await User.findByPk(id)
    if(!result) return res.sedStatus(404).json({message: "user not found"})
    return res.status(200).json(result)
});

const destroy = catchError(async(req,res)=>{
    const {id} = req.params
    const result = await User.destroy({where: {id}})
    if(!result) return res.sendStatus(404).json({message: "user not found"})
        return res.sendStatus(204)
})

const update = catchError(async(req,res)=>{
    const {id} = req.params
    const result = await User.update(
        req.body,{where:{id},returning:true}
    )
    if(result[0] === 0) return res.status(404)
        return res.status(200).json(result[1][0])
})
module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}