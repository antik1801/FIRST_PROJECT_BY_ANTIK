import QueryBuilder from "../../builder/QueryBuilder"
import { AdminSearchableFields } from "./admin.constant"
import { Admin } from "./admin.model"




const getAllAdminsFromDB = async (query: Record<string , unknown>) =>{
    const adminQuery = new QueryBuilder(
        Admin.find()
        ,
        query
    ).search(AdminSearchableFields)
    .fields()
    .filter()
    .sort()
    .paginate()

    const result = await adminQuery.modelQuery;
    return result;
}

const getSingleAdminFromDB = async(id: string) =>{
    const result = await Admin.findById(id);
    return result;
}

const deleteSingleAdminFromDB = async(id: string) =>{
    const result = await Admin.findByIdAndUpdate(id, {isDeleted: true}, {
        new: true,
    })
    return result;
}

export const adminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    deleteSingleAdminFromDB
}