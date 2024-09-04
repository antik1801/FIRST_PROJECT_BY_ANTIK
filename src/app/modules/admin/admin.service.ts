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



export const adminServices = {
    getAllAdminsFromDB
}