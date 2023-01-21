import Setting from "../models/SettingModel.js"

export const getSettingValueByKey = async (req,res) => {
    // res.json(req.body.nameKey)
    try {
        const settingValue = await Setting.findOne({
            where:{
                key:req.body.nameKey
            }
        })
        res.json(settingValue)
    }catch (error){
        console.log(error)
    }
}

export const updateSettingValueByKey = async (req,res) => {
    // res.json(req.body.nameKey)
    try {
        const updateValue = await Setting.update(
            {
                value:req.body.value
            },
            {
            where:{
                key:req.body.nameKey
            }
        })
        res.json(updateValue)
    }catch (error){
        console.log(error)
    }
}