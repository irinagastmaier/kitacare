const ChildModel = require("../../model/childModel")

//Managers --> validate eto check if manager
exports.deleteChild = async (req, res, next) => {
    const { id } = req.params;
    try {
        const child = await ChildModel.findByIdAndRemove(id)
        if (child) {
            res.send({ success: true, message: "child removed from db" })
        } else {
            res.status(404).send({ success: false, message: "no matching child found in db" })
        }
    } catch (err) { next(err) }
}

