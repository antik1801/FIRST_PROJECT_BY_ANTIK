
Resources: 
Installation: https://blog.logrocket.com/linting-typescript-eslint-prettier
GitHub Link: https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/tree/mastering-mongoose

Index:


3-5 Software Design Pattern , Mvc Vs Modular, Create An Interface

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-8-5-software-design-pattern-mvc-vs-modular-create-an-interface 

MVC - modular , view , controller
And Modular pattarn

In MVC there are three main folders

Moduler
View
Controller
Routes
Interfaces

→ File namings

Controllers : 
students.controller.ts
admin.controller.ts
faculty.controller.ts

Views:
→ Template engine:
ejs
handlerbars
Pugs

→ Library / Frameworks
React
Vue
Angular

Models:
students.models.ts
admin.models.ts
faculty.models.ts

Routes: 
students.routes.ts
admin.routes.ts
faculty.routes.ts

Interfaces: 

students.interface.ts
admin.interface.ts
faculty.interface.ts

But in this process there is a problem , if i want to work in students we have to go in students models interfaces and all that is a hazard process. Also a senior developer is working in a codebase that a junior is also working in. 


So there comes a modular pattern: 

Students: 
students.controller.ts
students.models.ts
students.routes.ts
students.interface.ts
student.services.ts


Admin: 
admin.controller.ts
admin.models.ts
admin.routes.ts
admin.interface.ts
admin.services.ts

So we add all this 4 mvc of any user into one folder


Benefits of using modular pattern:
Scalability
Refactor
Maintainablity

Rules / Principles: 

DRY - Don’t repeat yourself
Fat model = we will make the model fat
Thin controller =  we will make the controller clean

In javascript if we go step by step in mongoose the steps we need to follow
Schema : first we need to create schema
Model : 2nd we need to create model
dbQuery: 3rd we need to create dbQuery
So if we are using typescript the flow is
Interface → 1st
Model → 2nd
Routes → 3rd
dbQuery → 4th





Now lets start the project:

Inside /src/app → we create a folder name modules

Inside modules we create a folder name students.
So the path is /src/app/modules/students
Inside students we have to create 4 files.
students.controller.ts
students.model.ts
students.routes.ts
students.interface.ts

Step 1 —-> Now first we have to work in students.interface.ts

Students.interface.ts 

First thing we go to mongoose typescript documentation → https://mongoosejs.com/docs/typescript.html 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.interface.ts 

To get started with Mongoose in TypeScript, you need to:
Create an interface representing a document in MongoDB.
Create a Schema corresponding to the document interface.
Create a Model.
Connect to MongoDB.
Importing schema , model , connect from mongoose
import { Schema, model, connect } from 'mongoose';



Now we have to copy paste the interface code from the documentation inside student.interfaces.ts: 

interface Students {
  name: string;
  email: string;
  avatar?: string;
}
Change the name of the interfaces IUser to students
We want to export the interface like that and give a “= “ after Students

export type Students =  {
  name: string;
  email: string;
  avatar?: string;
}
We are using type instate of interface , 
The name would be in three part
Name: {
firstName: string,
middleName: string,
lastName : string
}

We add id and gender 
id: string,
gender: “male” | “Female”

| ⇒ in typescript the or operator is | 
Type literals: When we are sure about the type either male or female 

We  have to add email, contactNumber , emergencyContactNo , bloodGroup ? (optional), presentAddress(string), parmanentAddress(string), 


The Student.interface.ts → looks like that

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddres: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};



For different types of blood group go to chatgpt → 
https://chatgpt.com/ 
Search = give me different union types of blood group


Again search typescript string literal types. We can use this to define the blood group types

Student.model.ts

2) Step 2 → Student.model.ts

Now inside /src/app/modules/student → create another file name 
student.model.ts

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.model.ts 

Go to the documentation → https://mongoosejs.com/docs/typescript.html and from example make the schema 

If you want you can fo to the documentation to know the schema types → https://mongoosejs.com/docs/schematypes.html 

Now we have to import in student.model.ts→ 
import { Schema, model, connect } from 'mongoose';

Now we have to create a new schema for student  and give its data type student and import student from student.interface.ts


import Student from ‘./student/student.interface’

const studentSchema = new Schema<Student>({})

Now first we have t give studentschema a id 
const studentSchema = new Schema<Student>({
	id: { type: String }
})

In schema we will use type String ⇒ Capital letter string and in interfaces we will use string in small letter

Now same way we can add name 

const studentSchema = new Schema<Student>({
	id: { type: String },
	firstName: {
   		 type: String,
   		 required: true,
 	 },
  middleName: {
    	type: String,
  },
  lastName: {
    	type: String,
    	required: true,
  },

})

Here required: true means the field is a required field. 
Now we can add gender


const studentSchema = new Schema<Student>({
	id: { type: String },
	firstName: {
   		 type: String,
   		 required: true,
 	 },
  middleName: {
    	type: String,
  },
  lastName: {
    	type: String,
    	required: true,
  },
 gender: ['male', 'female'],	
})

Here in gender we have given male and female inside an array . This type is called enum, Enum means we can use either one value from this two. 

In this same way we have to add blood group , presentAddress, parmanetAddress, guardian, localGardian, profileImg, isActive

If any error is given please check the interface if you have named the interface correctly

Now change some of the type like name and others type separately

So now the student.model.ts will look like this
Student.model.ts → 

import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);




Now the last line 
export const StudentModel = model<Student>('Student', studentSchema);
Go to the documentation → https://mongoosejs.com/docs/typescript.html 

And look to create a new model we have to give 
const modelName = model<interface_name>(‘Database collection name’, Schema name that defined before)

What is schema? ⇒ schema makes a new instance


Since we have done interfaces we needed some other files like

Controllers, services, routes 


Data flow: 

Client → route → controller → service → controller → client 



Client will hit route first → route hit controller → controller hit services → services will having all business logic and it will query into database → in response it will return the data in controller → the controller will get back to the client

Service will handle business logic : means service will query in model. 

From controller to client it will return 3 response

Success
Message
Data


Student.route.ts: 
3-8 Create Route , Service And Controller
https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-8-8-create-route-service-and-controller 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.route.ts 

Now inside /src/app/modules/student → we will create another file named Student.route.ts

import express from ‘express’
const router = express.Router()

Now Router is function inside express. Now we create a POST method in router

router.post(‘/create-student’, )

Now if client hit this route /create-student we have to pass the hit from router to controller. So we need another file Student.controller.ts inside student

Student.controller.ts
https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.controller.ts 

Inside controller we have to create a function name createStudent which will work like the middle man between router and service while it takes req from router

import express, {Request, Response} from ‘express’
const createStudent = (req: Request, res: Response) ⇒{ }


Now the createStudent will handle the req, res , and pass it to the services, lets say a client hit the route 
/create-student

And the route pass the data from router to controller , so the controller will receive the data from → req.body

import express, {Request, Response} from ‘express’
const createStudent = (req: Request, res: Response) ⇒{
	const student = req.body;
 }

Now the create student pass the data from controller to service where all business logic will be handled, so we need a file like → 
student.service.ts


Student.service.ts
https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.service.ts 

Inside student.service.ts we have to create a new function called “createStudentInDb” that will receive data student and the student data’s type is Student from Student.interface.ts → This has to be async await function


import {Student} from “student.interface”

const createStudentInDb = (student : Student) ⇒{

}


Now we need to run db query from student model like this and we can change the function into a async await function and return a result


import {Student} from “student.interface”
import {StudentModel} from “student.model”

const createStudentInDb =async (student : Student) ⇒{
	const result = await StudentModel.create(student);
	return result;
}


Now create is a mongoose method → https://mongoosejs.com/docs/api/model.html#Model.create() 
That is used to save a new data in mongodb, method syntex

modelName.create(data)
Now we need to export the function because we are going to import it in router, so lets make a export like this


export const StudentService = {
	cretaeStudentInDb,
}


Now student.service.ts → 

import {Student} from “student.interface”
import {StudentModel} from “student.model”

const createStudentInDb =async (student : Student) ⇒{
	const result = await StudentModel.create(student);
	return result;
}

export const StudentService = {
	cretaeStudentInDb,
}


Now go back to student.controller.ts → 

Student.controller.ts
import express, {Request, Response} from ‘express’
const createStudent = (req: Request, res: Response) ⇒{
	const student = req.body;
 }


Now we make the normal function into a async , await function and import the student services like this →

import express, {Request, Response} from ‘express’
import {StudentServices} from “./student.service”
const createStudent =async (req: Request, res: Response) ⇒{
	const student = req.body;
	const result = await StudentServices.createStudentInDB(student);
 }


Now if the data flows correctly the function will response a data
Like that → 

 res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });

We can also use a try catch block so that the error can be thrown if any occurs.
Student.controller.ts→

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


export const studentController = {
createStudent
}


Now we can send studentController.createStudent into routes

Get back to routes →

import { StudentControllers } from './student.controller';

router.post('/create-student', StudentControllers.createStudent);



3-9 Insert A Student Data Into MongoDB
https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-8-9-insert-a-student-data-into-mongodb 

Now get back to the Student.routes.ts and export the router 

export const StudentRoutes = router;

So the router will looks like this ⇒



import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);

export const StudentRoutes = router;


Now the app.ts doesn’t know that there is a routes so inside app.ts we need to bring the routes, 
Get back to the app.ts , import the studentsRoutes

app.ts →
import StudentRoutes from ‘./student/Student.route’

app.use('/api/v1/students', StudentRoutes);

Here /api → its a api
/v1 → version 1
/students → students 


Now if any client hit the route → /api/v1/students/create-student that will create a student data , So lets test the api

Chatgpt to create a json data for student model

Now copy all the data from student.model.ts (cntr+A , cntr+c)
Go to chatgpt →

And paste the data and write → “This is my model , please make a json data by following this model”

It will give us a fake data.


Postman for api testing:

https://www.postman.com/downloads/ → Download and install postman

Create a new collection , give a collection name (ex. first-project)

Add request → 
Give request a new name → create a student

Now we will test and send the request(the data that has copied from chatgpt) but we will not send the request directly rather we will send the data into a object named student

{
	student: {
// The data that copied from the chatgp
     }
}

Error: I am find a response error from postman , 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot POST /api/v1/students/create-student</pre>
</body>
</html>

Lets restart the server and take a look whats wrong, No this error occurs because I haven’t  done the previous stages 

So I have encountered so different types of error and finally I have been successfully entered / created a student on postman ⇒

{
    "student": {
        "id": "STU001",
        "name": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}


Now we can test the api , 
Now we can restart the server using “start:dev” command 

“start:dev” : “ts-node-dev --respawn --transpile-only src/server.ts”


If we hit the data the server will not resond . why ? it is not responding ? because we are sending out data into a object name student and into student we are sending our data

So from controller we also have to receive data student named , So get back to the student.controller.ts

And catch the data named student

const { student: studentData } = req.body;

The method is called destructering and studentData is the allies for student and we will receive studentData into services

So now the StudentController looks like → 

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


Now the request , res → successfully inserted, We can go to the mongodb compass to see if the data is inserted or not , so we again and again go to the mongodb and see if the data is inserted or not , rather we could use mongodb compass to see the datas. 

What we have to do ?
We have to go to the mongodb atlas and copy and paste the url connection string that is inside our .env file
And we can connect our compass with mongodb atlas

We can use the connection in favouites so that we don’t have to cpy and pst the string again and again .


3-10 Create Get Student Route
https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-8-10-create-get-student-route 

So we can get back to students.service.ts

Now create a function that getAllStudentsFromDB that is async await function ⇒

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};


find() == find() is a mongoose model that will give all data from the document

So we can get back to students.controller.ts

And create a function getAllStudents that will take the return data from services

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

Now we have to export the controller →

export const StudentController = {
getAllStudents,
}


Now get back to the student.route.ts →

Add a get route inside student.route.ts

router.get(“/”, StudentsControllers.getAllStudents );


Now get back to the postman and create a new route in the postman name → Get All Students

And give a get request for the new get request →


Now we get back to Student.service.ts →

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/mastering-mongoose/src/app/modules/student/student.service.ts 

Create a new function called getSingleStudentFromDB , so inside Student.service.ts , 




const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

Now we will get back to Student.controller.ts and create a new function named getSingleStudent

⇒
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

Req.params will take the studentId from the routes ,


Now we will get back to the Student.route.ts and make a get request to get single student

Student.route.ts →

router.get('/:studentId', StudentControllers.getSingleStudent);


Now we get back to post man , and try to hit any specific student id data , 

Error: In mezba bhai project the two data was same id so if that happens we delete it from mongodb compass because we will validate and sanidate the data from next module.





GitHub Link: https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/tree/advanced-crud 

Index: 
Validation
Introduction of validation
Utilising joi package
Custom validation
Instance method validation
Zod integration
A basic understand of validation
Explore practical validation using joi
Instance method and advance joi technique
Validate data in typescript

4-1 Introduction To Validation
https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-1-introduction-to-validation 


When client sends a data from frontend , mongoose receive it and matches it with the object data model , thats why mongoose is called Object Data Modeling library. If data maped then mongoose does insert it into database , other wise it throw error,

Sometimes we need to validate data a second type of validation . Mongoose generally check the data we are sending is valid data type or not , like if we send data have included required data or not . inside required data if we send the exact data type data or not. But sometimes we need to check if our data format is perfect or not.


Like in email is a string , so if someone sends the data
“asdfasdfasdf”
Mongoose will accept the data but we have to check before if someone have send proper format data like “antik.edu@gmail.com” or not this type of data. 

We can do 3 types of validations in mongoose 
Build in validation
Custom validation
Third party library like (validator, Zod, Joi)

First we will look at mongoose default built in Validation:

From our last video we can see we did not gave enum in proper way , So our bloodgroup, gender , isActive → has been saved in a array like. 


If  we go mongoose validation documentation → https://mongoosejs.com/docs/validation.html#built-in-validators 

We can see how enum is declared. The enum build in validator looks like that →

drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
We have to give a 
type : String , number , boolean , 
then enum named an array [] ,
 if this is required then required will be a function


So we can go to the student.model.ts to change the enum format

student.model.ts →
https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.model.ts 

So we will change the gender model like this : 
gender : {
	type: string,
	enum: [‘male’, ‘female’, ‘others’],
	required: true
}
Same wy blood group
bloodGroup: {
	type: String,
	enum: [] ⇒ the blood groups
}

Since blood group is a optional property so we didnot give the required property

isActive: {
	type: String,
	enum: [‘active’ ,‘inActive’],
	default: ‘active’
}

Default : ‘active’  → we want when a student is created its status is by default active.


Now we can check our recent changes using postman , first things we can remove our old data from mongodb compass, May be delete the whole database , and then try. 

Now from postman hit the route /api/v1/students/create-student with proper data,

If data sends successfully we can see the changes 
gender : “” ,
bloodGroup: “”,
isActive: “active” 

Properly formatted. 

Now from postman if we remove firstname from the object name and hit the route , the request is holded . if we go to the backed terminal where server is running it will show some error.

Now if you are clever enough then you can remove whole name object and try to send the request then you can see the mongoose will give us the permission to send the data.

Now the postman data looks like that →

{
    "student": {
        "id": "STU001",
        "name": {
            "firstName": "Gazi Ehsanul",
            "lastName":"Haque"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}



 
Why that happed because inside the name property , firstname and lastname was required but name itself we didnot declared required.

So we can solve the error , go to students.model.ts and make name like a object like that →

name: {
	type: String,
	required: true
}

Now if we try to save the data that postman have without name property , mongoose will grab us and gives us error that name is required.

Same way we can change guardian , localGuardian type→

property: {
	type: the property type,
	required : true
}

Now the mongoose gives us an error message but if we custom the message for required property what we can do? We will declare the property like that : 

name: {
	type: String,
	required: [true, ‘bhai name lagbei lagbe’]
}

So we can see our custom message inside the terminal , we can change the message in professional way 


name: {
	type: UserNameSchema,
	required: [true, ‘Name is required’]
}

Now please do the same for all property with a proper professional name.

Now what we will do with enum ?  for enum we will throw message and declare property like this : 

gender : {
	type: string,
	enum: {
	values: [‘male’, ‘female’, ‘others’],
	message: “Gender must be one of the following ‘male’ , ‘female’ or ‘others’”
},
	required:[true, “Gender is required”]
}

Now if you want to customs the validation message will have user given data also , so →

Go to the mongoose documentation → 
https://mongoosejs.com/docs/validation.html#built-in-validators 

gender : {
	type: string,
	enum: {
	values: [‘male’, ‘female’, ‘others’],
	message: “{VALUE} must be one of the following ‘male’ , ‘female’ or ‘others’”
},
	required:[true, “Gender is required”]
}

In message {VALUE} property append what users has given and then our message please try it.



Now look at the database two document data they are having same id as we given , we have to stop saving the same id again and again. So mongoose gives a property → unique: true


https://mongoosejs.com/docs/api/schematypeoptions.html#SchemaTypeOptions.prototype.unique 


Now in student.model.ts →

id : { type: String , required: true , unique: true }

Now drop the collection because the same id has inserted again , and try to save with the same id twice. 

Note: Before saving data please restart the server and refresh the collection from mongodb compass.

Now if you try to hit the api it will find error.

Now lets do one thing , we will add unique → email too , email also wants to be unique

4-2 How To Do Custom Validation

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-2-how-to-do-custom-validation 


Now go to chatgpt → https://chatgpt.com/ 

Go to student.model.ts and copy the whole model (cntr+A , cntr+c) , and paste it to chatgpt and ask - “please make the appropriate message where is required”


So build in validation has also some amazing features , if we go to the documentation → https://mongoosejs.com/docs/validation.html#built-in-validators 

For numbers → min, max
string  → enum , match , minLength , maxLength

So give firstname inside name maxLength : 20





firstName: {
	type : String,
	required: [true, ‘First name is required’],
	maxLength: 20
}

If we go to the postman and give firstname more than 20 character , It will provides me an error , So we can change the error message like our way.

firstName: {
	type : String,
	required: [true, ‘First name is required’],
	maxLength: [20, ‘Max allowed length is 20’]
}

Error: I have write names property max instead of maxLength , max is a property of number and maxLength is the property of string.

Now its been very pathetic that we are check all the error message from console. We want to see the message from postman . So we can go to the student.controller.ts

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.controller.ts

student.controller.ts → 

And inside catch block we can throw a message like → 
catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }

Now there is a method called trim → https://mongoosejs.com/docs/api/schemastring.html#SchemaString.prototype.trim() 

What trim does ? trim basically removes the left most and right most gap.

Now go to the postman and inside the firstName give some spaces like that

“name” : {
	“firstName” : “          Gazi           ”,
	“lastName” : “                          Haque     ”,
	
}

And try to save the data in that way first space and last space, So inside the mongodb the data will be saved exactly like that so we need to trim the data. 

So use required and the name property will look like : 

firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },


Now try to hit the api with that data from post man ,

“name” : {
	“firstName” : “          Gazi           ”,
	“lastName” : “                          Haque     ”,
	
}

This time you can see the extra spaces are gone. 

Now until this point we used buildin validator , now we want to use custom validator. 

Go to documentation → https://mongoosejs.com/docs/validation.html#custom-validators 

Now to custom the validator we have to make a property named validator

And the validator property have a function , mezba bhai recommends and documentation also recommends to use normal function because it might be possible to use “this” at some stage , 


firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
    validate : function(value){
	console.log(value);
}
},

Before sending data lets say we gave firstname in postman is →

“name” : {
	“firstName” : “          gAzI           ”,
	“lastName” : “                          hAqUe     ”,
	
}

This format data is totally unbearable and non accepted . 

Now we can send the data from postman and can see firstname in the terminal .

And mongodb also saved this kind of data as well. We want first letter uppercase and rest lowercase

Go to documentation → https://masteringjs.io/tutorials/fundamentals/uppercase 

So we want to stop to save the document inside mongodb. So we a function inside validate like this : 

firstName: {
    validate : function(value){
	const firstName = value.charAt(0).toUpperCase() + value.slice(1);
	// Now we will send back the request if this format doesn’t match
	if(value !== firstName ) return false
return true;	
}
}
},

Now if we want to send a custom validate message we will write the function like this 

firstName: {
    validate : {

	validator: 
 function(value : string){
	const firstName = value.charAt(0).toUpperCase() + value.slice(1);
	// Now we will send back the request if this format doesn’t match
	if(value !== firstName ) return false
return true;	
}
},
message : ‘{VALUE} is not in capitalised formar’

}


If we send again from the postman we can see the error message “gAzI is not in capitalised format” 

We can add a type the function is returning → function(value: string)






4-3 How To Validate Using Validator And Joi Package

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-3-how-to-validate-using-validator-and-joi-package 


Hello developers, so in our previous video we have used custom made validation from mongoose ODM library. In real life if we use custom validation like this way the life cycle of a application will increase much a long. So we will not validate our data like that , rather we can use a custom made validator library like joi, Zod.

So if we search google → validator npm

We can see a library npm package → https://www.npmjs.com/package/validator 

We copy paste the command → npm i validator

We can run the command and install the package to our project. 
By default validator package will not support typescript, so the file is → data definition file


So DT file will not support typescript so what will we do ? we click on dt and it will show us a typescript supported file. And it will land us to this package → https://www.npmjs.com/package/@types/validator

But this package command → npm i -D @types/validator

So we go to the homepage of validator documentation github → 
https://github.com/validatorjs/validator.js 

The documentation shows to import like ES6
import validator from 'validator';

If we go the down of this github it will show us some methods also , like isDate , isEmail , isHash, 
Lest say we for example use → isAlphanumeric(str [, locale, options]) 

Now go to the postman and after lastName a number

“name” : {
	“firstName” : “Gazi ”,
	“lastName” : “Haque14211111”,
	
}

Now this formate is not correct , there is a number in your name ?
 




So in the student.model.ts →

name: {
	firstName: {},
	lastName: {
	Type: String,
	Required : true,
	validate: {
	validator: (value: string ) ⇒validator.isAlpha(value),
	message : “{VALUE} is not valid”
}
}
}
 

Error: In mezba bhai it did not worked since the id and email are same from the post man. 

Solution: change the id and email and then try to send the data to the backend. 

Now at the same way we can change the email and add validator property. 

email: {
	type: String,
	required : true,
	validate : {
	validator : (value) ⇒ validator.isEmail(value),
	message : “{VALUE} is not a valid email”
}
}

Now the test the data from postman using 
“email” : “gazi”;

It will return a  error,


But developers use another two most popular library Joi, and Zod

Lets explore Joi : 

Joi use by default typescript so we install the joi in our project ⇒
npm i joi

So we go to joi’s github ⇒ https://github.com/hapijs/joi 

And after the scroll at last there is joi’s documentation ⇒ https://joi.dev/api/?v=17.13.3 


If we go to the example of Joi , we can see it does not work like validator package , rather it makes its own schema model and call all the property by its methods like string , number.

Now if we integrate Joi we will not put the code inside student.model.ts because Joi itself gives a schema of its own where model has its own schema. 



So lets try to integrate it with student.controller.ts

Student.controller.ts →

import joi from ‘joi’


Now inside createStudent function → lets create the joi schema here and then we will moved our joi sanitizations into different file

→ https://joi.dev/api/?v=17.13.3 

To create schema we need to follow the properties that have in student.model.ts

createStudent →
	const joiValidationSchema = joi.object({
	id : joi.string(),
	name: {
	firstName : joi.string().max(30).required(),
	middleName: 
	lastName: 
},
gender: joi.string().required().valid({[‘male’, ‘female’, ‘others’]})
})


max(30) → defines maximum length 30
required() → means this property is required
.valid({[‘male’, ‘female’, ‘others’]}) → is used for enum values

But to do that in hand coding is boring , we can use chatgpt for that , so go to chatgpt → https://chatgpt.com/ 

We can cpy the student.model.ts and paste to chatgpt prompts.

And tell him = “please create a joi validation schema by following this model”




4-4 How To Validate Using Joi

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-4-how-to-validate-using-joi 

Hello developers , Last video We have seen how we can use validator library , now we are seeing how we can use joi

So out chatgpt has given joi validation schema , lets copy and paste the full schema inside create student function carefully.

NB: Make a careful copy paste so that the existing code does not effect.

So from the documentation we have learned that if we want to validate with joi , we have to call joi validator like that

https://joi.dev/api/?v=17.13.3 
const {error, value} = schema.validate(data)
Here might be little bit confusions,
So , Schema means JoiValidationSchema 
And data means studentData




So in this case studentData is the data , so our line is after req.body→

const {error, value} = schema.validate(studentData)
console.log({error}, {value});


Next test out backend , we go to mongodb and drop the collection , and again send the proper data. Yeah successful


We are using 3rd party library , so we have to see console log and have the habit to read the documentation , other wise we will not be a next level developer.


Now if all okay then we have to create a if block , after the joi validator , because if error occurred it will return the data to the client.


const {error, value} = schema.validate(studentData)
console.log({error}, {value});

if(error)
{
	res.status(500).json({
	success: false,
	message : ‘Something went wrong’,
	error : error.details
})
}


Now test → 
Drop the collection of mongodb
Make email “this_is_a_wrong_email”
Send the information to backend


Now code refactoring →

Since we are working in a organising code base , we will not validate our data from here , so what will we do ?
We create a file called → student.joi.validator.ts inside /app/modules/students

Student.joi.validator.ts →

We will copy paste the joi codes here. And we change our schema names like studentValidationSchema like that,

After last we will export our schema model

export default studentValidationSchema;


Now we can use cntr+d to change any schema name so that all schema name will be changed

Or we can use f2 button. 

Now if we use if(error) before db operation the server cost will be none . 


4-5 How To Validate Using Zod

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-5-how-to-validate-using-zod 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.controller.ts 

Now inside student.controller.ts 

And inside createStudent function we are performing operation over mongodb server with the data we get req.body , but after getting data from req.body , we are validating it with so we will operation our data after validate and send into the mongodb




const {error, value} = schema.validate(studentData)
console.log({error}, {value});
const result = await StudentServices.createStudentIntoDB(value);



Joi  is definitely a good library but there is another library that uses most of the programmer community and adjust with typescript is zod.

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.validation.ts 


Zod documentation → https://zod.dev/?id=installation 

Run this command to install zod → npm install zod 

From documentation basic uses → https://zod.dev/?id=basic-usage 

Github → https://github.com/colinhacks/zod 

We can see import syntex
import { z } from "zod";

Zod also create schema 
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

schema.parse(data) if the statement is true it will pass 
Otherwith it will throw error

If I want to parse the data still doesnt want to throw error if the validation false we have to use safeParse()

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }


So lets try to intrigrade zod in our project. Since it is also giving us a schema and we can’t use this in student.model.ts because of a schema model is already exists there. 

We can use it inside student.controller.ts temporarily like we have used joi before,

So our joi codes already exists in there , we can comment the code and can we use chatGpt for creating this model schema again ?

Task : Create a zod schema model using chatgpt like you created a joi .

Ans: → Go to chatgpt → https://chatgpt.com/ 
Go to student.model.ts →
Copy the whole code and paste to the chatgpt prompt. And ask gpt that “This is my schema model please make a zod validation schema using this model”

→ Now the chatgpt will give us a zod schema , Now create a file inside student folder called → Student.zod.validation.ts , and paste the code here →

import { z } from 'zod';
import validator from 'validator';


// UserName schema
const userNameValidationSchema = z.object({
  firstName: z.string()
    .min(3, "First name is no more than 3 characters")
    .max(20, "First name should not have more than 20 characters")
    .trim()
    .refine(value => validator.isAlpha(value), { message: "{VALUE} is not a valid name" }),
  middleName: z.string(),
  lastName: z.string()
    .min(5, "Last name must have at least 5 characters")
    .max(20, "Last name must not have more than 20 characters")
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Last name is not in a valid format" })
});


// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Father name is in capitalized format" }),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Mother name is not in a capitalized format" }),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim()
});


// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Name is not in a capitalized format" }),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim()
});


// Student schema
const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "others"], { message: "{VALUE} is invalid, Gender must be one of the following 'male', 'female', 'others'" }),
  dateOfBirth: z.string().optional(),
  email: z.string()
    .trim()
    .refine(value => validator.isEmail(value), { message: "{VALUE} is not a valid email format" }),
  contactNo: z.string().trim(),
  emergencyContactNo: z.string().trim(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "{VALUE} is invalid. Please provide a valid blood group" }).optional(),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  gurdian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"], { message: "{VALUE} is invalid" })
});


export default studentValidationSchema




Also into student.interface.ts → 
gender: ‘male’ | ‘female’ | ‘others’


Ans: I am doing it in menual way inside createStudent , create a validationSchema for zod.

createStudent() →
	
	const studentValidationSchema = z.object({
	
	
})
Now we start writing validation code 👍

id: z.string().max(6)
name : z.object({
	firstName: z.string().max(20,{message: “Maximum character can be 20”})
})


We can pass a custom validation message for each method like this : 

z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address" });
z.string().url({ message: "Invalid url" });
z.string().emoji({ message: "Contains non-emoji characters" });
z.string().uuid({ message: "Invalid UUID" });
z.string().includes("tuna", { message: "Must include tuna" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
z.string().datetime({ message: "Invalid datetime string! Must be UTC." });
z.string().date({ message: "Invalid date string!" });
z.string().time({ message: "Invalid time string!" });
z.string().ip({ message: "Invalid IP address" });

So we dont need to create the validation all just go to chatGpt and cpy the student.model.ts and paste it to chatGpt and tell him
“This is my model please make a zod validation schema for this model”


Since this is another validation method so make this schema to another file named like student.zod.validation.ts

student.zod.validation.ts →

Paste the chatgpt given schema model in this folder , and export

beforeExport please make sure the naming convention is correct ,then write

export default studentValidationSchema;

Now go to the student.controller.ts and import the studentValidationSchema from student.zod.validation.ts

Documentation → https://zod.dev/?id=basic-usage 

To use this validation package we need to follow 2 steps : 
Step 1: create a schema [which is already been created]
Step 2: use this using parse
	mySchema.parse(data);
We will create parsing inside the student.controller.ts

I am encouraged with two errors , 1st data:
student.zod.validation.ts →
Since I have used chatgpt for zod validation schema The →
“Guardian”

The types of 'name.middleName' are incompatible between these types.
   Type 'string | null | undefined' is not assignable to type 'string'.
     Type 'undefined' is not assignable to type 'string'.ts(2345)

Inside createStudent function →

const zodParseData = StudentValidationSchema.parse(studentData);


Now we can pass the zodParseData into database query operation

const zodParseData = StudentValidationSchema.parse(studentData);
const result = await StudentServices.createStudentIntoDB(zodParsedData);


In mezba bhai’s project a error is given from typescript that comes from gender enum. Because in model he has create “male” “female” “others”  but when he has created interface there were two genders “male” “female”

Another error cames from gender , because cahtgpt has made some mistaks , 
The quick solution is → https://zod.dev/?id=zod-enums copy the enum written format and ask chatgpt to gives enum like that. 

And the manual process is remove .string() and other methods and using .enum() method

Why we are using zod ? zod can infer the datatypes, like it can redefine the datatype using type scripts type

4-6 Implement A Custom Instance Method

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-6-implement-a-custom-instance-method- 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/tree/advanced-crud 

Static method and instance method : 


What is instance method: 

Class Counter{
	count : number = 0;
	public: 
		increment(){
		return this.counter = this.counter + 1;
}
decrement(){
return this.counter = this.counter - 1
}
}

const counter1 = new Counter();

counter1.increment()
counter1.decrement()


Now in Static method there are no need to create instance. In static method we have to add static keyword first. And instate of this we have to use class name 


Class Counter{
	static count : number = 0;
	public: 
		static increment(){
		return Counter.count = Counter.count + 1;
}
static decrement(){
return Counter.count = Counter.count - 1
}
}

counter1.increment()
counter1.decrement()

Mongoose can provide both build in Static method and Instance method

StudentModel.create() // Static method


// Instance method
const student = new StudentModel()
student.save();

Since in our project at that point we only used static method because up until now we only used studentModel.create() 


If we want we can build custom Static method also : 
If we want to make custom we have to understand the flow of the method first

Documentation → https://mongoosejs.com/docs/typescript/statics-and-methods.html 

What we have to do if we want to use custom made static method ?

Schema → statics → model → call on model 

We have to go in that way

Example: 
Step 1:
// creating schema
Const studentSchema = new Schema({


})
Step 2: 
// creating statics
studentSchema.Statics.isUserExist = async function (id : string)
{
	
	return await User.findOneById({id})
}

Step 3: Creating a model
const studentModel = model(‘Student’, studentSchema) // creating db model

Step 4: Call on the model

studentModel.isUserExist() // call on the model


I don’t have idea what isUserExist() method is doing ? other than all okay.


We can create custom made Instance method also. We have to follow that flow

Schema → methods → model → Instance → call on model 

Template: 
Step 1: 
// creating schema
Const studentSchema = new Schema({


})
Step 2: 
// creating methods
studentSchema.methods.isUserExist = async function (id : string)
{
	
	return await User.findOneById({id})
}
Step 3: 
const studentModel = new StudentModel() // Creating instance

Step 4: 
studentModel.isUserExist() // call on the model



So lets go to the student.service.ts and see

We have used StudentModel.create(studentData)

So we have used mongoose build in static method in this project. 
Now can we want to  use a instance method instead of static . 

So to use this method first comment the static method.

And write code like this 

const student = new StudentModel(studentData)

// If the parameter of this function is student , change it to studentData



This will create a instance method of student and we want to run query in this instance using build in Instance save() method

const result = await student.save()

Return result






Now test → 
Now can we test the data from postman: 
Drop the collection 
Send the data 
Test
Api → http://localhost:5000/api/v1/students/create-student
Data → 
{
    "student": {
        "id": "STU004",
        "name": {
            "firstName": "Gazi",
            "middleName": "Ismat",
            "lastName":"Haque"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@gmail.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}




If all goes well lets check custom static instance method. Where will we write the code ? 

Student.model.ts

We can see from documentation →
Go to documentation → typescript → static and methods

→ https://mongoosejs.com/docs/typescript/statics-and-methods.html 

If you want to be a next level developer you must have the habit to read the documentation

So if we want to make a custom make static method the steps are →
Step 1: create a interface
interface user{

}
Step 2: create a method 
interface userMethod {

}
Step 3: create a model
type userModel = Model<user, {} , userMethod>
Step 4: create a schema
const schema = new Schema<user, userModel, userMethod>({

})

Step 6: call on the schema methods
schema.methods.isUserExists = async function(id:string) {

}


So the flow is : 

interface → method → model → schema → static 



So lets go to the student.interface.ts →

since we already have student interfaces so we skip the create of student method

And write → 
St 1:
// we have to create a interface for student
Student.interface.ts → already a interface is created here for students

St: 2 → inside student.interface.ts →
export type StudentMethods = {
	// here we have to create isUserExists() function

	isUserExists(id: string) : Promise<Student>
}

St 3: 
We have to create a model inside student.interface.ts

type StudentModel = Model<Student, {}, StudentMethods>;

Now it will be give an error → probably want object instance 
Solution : 
Replace → Record<string , never> in student Model
Add export before that ,
export type StudentModel = Model<Student, Record<string,never> , StudentMethods>;

We have to export the model because we have to implement it in model


St 4: 
// We have to create a schema

Now inside student.model.ts already a schema is created for student

Now inside schema we have to give 3 generic parameters

const studentSchema = new Schema<StudentInterface, StudentMethods, StudentModel>

All of them exported from student.interface.ts


Error: Now a error will be given that there are two student model inside student.model.ts so the solution is inside student.interface.ts we will rename all types T like TStudent , TUsername , TGardian etc.

In this T stands for type

I am encountering a error : Individual declarations in merged declaration 'StudentModel' must be all exported or all local.

Solution : go to student.interface.ts →
Change the exported model name from 
StudentModel to StudentInstanceModel →

And we change the model name inside student.model.ts to student

St 5: 

// we have to create methods inside student.model.ts

// What is the purpose for this schema calling function?
// It will detect if the user is already exists in the database or not.

StudentSchema.methods.isUserExists = async function(id: string){
	const existingUser = await Student.findOne({id});
	return existingUser;
}

Now I have changed some code naming convention in student.model.ts I have changed the exported model name from studentModel to Student(press f2 so that all connecting place change)
And in student.interface.ts I named the studentStaticModel to studentModel (f2 again)




The function looks like that → 
studentSchema.methods.isUserExists = async function (id: string) {


    const existingUser = await Student.findOne({id});
    return existingUser;


};




Now there is a problem : and the problem is if there is no student exist in this id the function will return null. 
So the solution is go to the 
student.interface.ts →


export type StudentMethods = {
	// here we have to create isUserExists() function

	isUserExists(id: string) : Promise<Student | null>
}

We can add null because if no id is matched with the documents it will return null

Now come to the student.model.ts →
And add the line export we need to add StudentModel also

export const student = model<TStudent , StudentModel>(‘Student’, StudentSchema)


Now our custom static method is created , lets call them inside 
student.service.ts →
	createStudent → 
		const student = new Student(studentData)
		if(await student.isUserExists(studentData.id))
		{
		throw new Error(‘Student already exists’);
}


Test→api

  Now take a look to the database , A same id student is already created in mongodb , we want to create another same id student and our purpose is sending user a message if this id is already exists or not?

Since we have indexed both id and email , so if any id is exists then any email is also exists. Now test the api with the same id.

APi → http://localhost:5000/api/v1/students/create-student 

Now if we want to hit the createStudent routes we can see “something went wrong” is still showing in the postman

Because in student.controller.ts we have sent the message “something went wrong”

But now we can change the error massage in the controller, we change student.controller.ts →

catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }

Here err : any we gave just temporarily and we will fix it after error handling

4-7 Implement A Custom Static Method

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-7-implement-a-custom-static-method- 

Hello developers , from the previous module we have made a custom make instance method, Now from this module we will create a custom made static method. Because in instance method we were creating instance and then we were applying on that. 

From student.services.ts →
		createStudent() →
			Here we were making an instance and then we were applying on that. Now we will create a static method so that we can use it on our model.

Documentation → https://mongoosejs.com/docs/typescript/statics-and-methods.html 

If we see the documentation it says →

Statics
Mongoose models do not have an explicit generic parameter for statics. If your model has statics, we recommend creating an interface that extends Mongoose's Model interface as shown below.

That means we have to use extends , and since we have to use extends we will use it in student.interface.ts → 

So we get back to project and inside student.insterface.ts →

schema.methods.isUserExists  we have created for creating Instance method , new we will use static method so we can comment that 

Also inside student.services.ts →
	const student = new Student(studentData)
	if(await student.isUserExists(studentData.id))
	{
	throw new Error(‘User is already exists’)
	}

This two lines also has created for instance method
Please comment the codes.

From the documentation → https://mongoosejs.com/docs/typescript/statics-and-methods.html 

In statics sections we can see that We have to follow 5 steps. Here is steps and data flows part:

Interface → Model → schema → schema static calls → user model → call the model

St 1: 
Interface:  student.interface.ts

interface IUser {
  name: string;
}
St2: 
Model:  student.interface.ts
interface UserModel extends Model<IUser> {
  myStaticMethod(): number;
}


St 3:  student.model.ts
Schema:
 
const schema = new Schema<IUser, UserModel>({ name: String });

St 4: student.model.ts
Schema static call

schema.static('myStaticMethod', function myStaticMethod() {
  return 42;
});


St5: student.model.ts
User model

const User = model<IUser, UserModel>('User', schema);


St6: student.service.ts
Call the model
const answer = User.myStaticMethod(data?);
→ in my code → const result = Student.create(studentData) 

Now inside our student.service.ts we will uncomment the code 

const result = Student.create(studentData)

And comment rest of the result line because another result is created for instance method.

Now go to the student.interface.ts and comment that codeline studentMethods and studentModel

St 1: create a student Interface ,

Already created in student.interface.ts


St 2 : student.interface.ts 
Model: 

export interface studentModel extends Model<TStudent>{
	isUserExists(id: string) : Promise<TStudent | null>
}


St3:  student.model.ts
Schema

const studentSchema = new schema<TStudent, StudentModel>

studentModel is imported from student.interface.ts
So in the instance method there were three parameter <TStudent, StudentModel, StudentMethod>
But in the schema there were 2 perimeter.


St 4:  student.model.ts
 Schema static call

There can be 2 ways to call schema statics  calls

Type 1: 
schema.static('myStaticMethod', function myStaticMethod() {
  return 42;
});

Type 2: 
We can call like this
StudentSchema.statice.isUserExists = async function(id: string) {
	const existingUser = await Student.findOne({id})

	return existingUser;
}


St 5: student.model.ts
User model

User model already created


St6: student.services.ts
Call on the model

createStudent →
	cosnt result = await Student.create(studentData)
	if(await Student.isUserExists(studentData.id))
	{
		throw new Error(‘User is already exists’)
}

Now vise versa the lines alignment →
	
	if(await Student.isUserExists(studentData.id))
	{
		throw new Error(‘User is already exists’)
}
           cosnt result = await Student.create(studentData)


Because if we first hit the server and then check if user already exists or not it will increase the server cost

So what is the difference between instance and static method ? static extends the model and some mejor changes of instance method, how do a developer knows about that ? → to read the documentation , Until the habit of reading and exploring documentation you will not be a next level developer


My way of reading documentation ,
Open a doc file 
Explore full documentation and make notes about everything in that blank doc
After exploring the documentation properly and making notes in docs you will find much easier
Please if you facing problem in life keep writing and the problem is solved

There is another method → Both Methods and Statics

We will not see it in this project but my task is explore the Both Methods and static and integrate it in our project











Task → Implement both methods and statics in our project
Docs → https://mongoosejs.com/docs/typescript/statics-and-methods.html 

Steps: 




Our CodeBase: 




4-8 Implement Mongoose Middleware Part

https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-8-implement-mongoose-middleware-part 

https://mongoosejs.com/docs/middleware.html 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/tree/advanced-crud 



Mongoose Middlewares

Before learning about middlewares we need to know 2 word

Pre
Post

Mongoose middleware can also be called mongoose hooks
Mongoose support different types of middle ware 
Pre → https://mongoosejs.com/docs/middleware.html#pre 
Post → https://mongoosejs.com/docs/middleware.html#post 

Types of middlewares and its functionality: 
validate
save
remove
updateOne
deleteOne
init (note: init hooks are synchronous)
We have to use “this” keyword to access the middlewares. And if the middleware passes then we have to use →
next()

To pass the function

Syntax of this middlewares:
	Schema.pre(‘save’, function)
	Schema.post(‘save’, function)
	Schema.pre(‘remove’, function)
	Schema.post(‘remove’, function)

Since we have to use ‘this’ keywords we can’t use arrow function we will have to use normal function

https://mongoosejs.com/docs/middleware.html#aggregate 

Mongoose also provides methods to pre and post hooks before and after query in aggregation methods.

Schema.pre(‘aggregate’, function)
Schema.post(‘aggregate’, function)

So we will use document middleware. So what is document middleware ? Document middleware means the middleware which works in document save - before or after .

To implement a middleware there were 2 steps

Schema → middleware functions

St 1: Student.model.ts
Create a schema
const schema = new Schema({ /* ... */ });

St2: Student.model.ts
Middleware functions

Schema.pre(‘save’, function(next){
// do all works

next(); 
})

Now the function taking next parameter. Thats means if all the works are done then the function will go to the next function .

 
Lets implement:

St1: create a schema 
→ student.model.ts , already have a schema made

St2: Middleware functions
student.model.ts →

So after schema we will build our middleware function:

First just take a look our pre and post middleware are working or not, so write in student.model.ts →


StudentSchema.pre(‘save’, function(next){
	console.log(this, “pre hook : this is a pre hook middleware”)
})

StudentSchema.post(‘save’, function(next){
	console.log(this , “post hook : this is a post hook middleware”)
})


In this function this means the data , the document that send from the postman client.

Now test the code →

Drop the collection from mongodb compass
Hit the api
Go to console and see if the consoles are output 


{
    "student": {
        "id": "STU001",
        "name": {
            "firstName": "John",
            "middleName": "Stephen",
            "lastName": "Doein"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}



Okay now get clear why in this project we are using middleware hooks? Lets suppose we are sending a password from the client side, now the password type is string , but the client send a password if we save the exact same password in our database then there might be a security threat . Our database could be hacked and all. So we need to hash / encryption the  password.

But we didn’t add password field either in interface or in models so we have to add on both file

student.interface.ts→

	export type TStudent →
		password : string

student.model.ts →
	const studentSchema = new Schema<TStudent , StudentModel>({

	id: …
	password: {type: String , required: [true , ‘Password is required’], maxLength: [20, ‘password cannot be more than 20 characters’]},
})


student.validation.ts →

export const studentValidationSchema = z.object({

	id: ……
	password: z.string().max(20)
})

Now test →
Drop the mongodb collection
Add password field after id in postman like
“password” : “gazi@1234”
restart the server 
Send the data

Data: 
{
    "student": {
        "id": "STU001",
	 “password”: “antik@1234”,
        "name": {
            "firstName": "Gazi Ehsanul",
            "lastName":"Haque"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}


Now you can see , the password has added just like you added it, in same string but it is not the correct way , we have to hash the password.

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.model.ts 

So to do hashing we have to use a library called bcrypt library →
Documentation : 
https://www.npmjs.com/package/bcrypt 

We have to install Bcrypt in our project →

npm i bcrypt

But Bcrypt by default does not support the typeschipt
So go to ts supported → https://www.npmjs.com/package/@types/bcrypt 

We will install this library as dev dependencies →

npm i -D @types/bcrypt


Steps → 

St1 : import the bcrypt
St2: There are two technique

1.
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

2.
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
We are going to use 2nd technique

St 1: student.model.ts
So inside student.model.ts → import bcrypt

import bcrypt from ‘bcrypt’





St2: student.model.ts
Now inside →
studentSchema.pre(‘save’, function(){
	const user = this;
	bcrypt.hash(user.password, )

})

Pause ⏸️


→ for salt , is a sensitive information we will keep it into .env file

.env →

NODE_ENV = development
…
BCRYPT_SALT_ROUNDS=12




Now go to /src/app/config/index.ts →
inside export default —>

export default {
…
bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
}


Now again get bact to student.model.ts →
studentSchema.pre(‘save’, async function(next){
	const user = this;
	user.password = await bcrypt.hash(user.password,  Number(config.bcrypt) )
	next()
})

Error: Type 'Promise<string>' is not assignable to type 'string'. 
I am encountering this error , this error is caused because when promise is returned it needs some time , by that time if data returns then the data becomes null. 

Solution: Use async , await function
Error: const user will give a error like unexpected alias , its a typescript error so we can do a quick fix solution in this error.
We are doing async await function and hassing the hashed password inside user.password.


Now test → 

Now test →
Drop the mongodb collection
restart the server 
Send the data

Data: 
{
    "student": {
        "id": "STU001",
	 “password”: “antik@1234”,
        "name": {
            "firstName": "Gazi Ehsanul",
            "lastName":"Haque"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}

Now look at mongodb compass document the password field has been hashed.

4-9 How To Implement Delete Data In Another Way



https://web.programming-hero.com/l2-b1-b2-mission-success/video/l2-b1-b2-mission-success-9-9-how-to-implement-delete-data-in-another-way 


Now we can see after saving the data inside database the password is still showing in the response , but even after hashing the password and saving it into database . It is not professional to show the password so here at this stage we will use post middleware hook

student.model.ts →

StudentSchema.post(‘save’, function(doc, next){
doc.password = ‘’;
next()

})


Now the doc will having all the documented information that saved data into the database

So when the response return the password field is empty
Now test →
Drop the mongodb collection
restart the server 
Send the data

Data: 
{
    "student": {
        "id": "STU001",
	 “password”: “antik@1234”,
        "name": {
            "firstName": "Gazi Ehsanul",
            "lastName":"Haque"
        },
        "gender": "male",
        "dateOfBirth": "2000-01-01",
        "email": "john.doe@example.com",
        "contactNo": "1234567890",
        "emergencyContactNo": "9876543210",
        "bloodGroup": "A+",
        "presentAddress": "123 Main St, Anytown",
        "permanentAddress": "456 Oak Ave, Hometown",
        "gurdian": {
            "fatherName": "Michael Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "1111111111",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "2222222222"
        },
        "localGuardian": {
            "name": "Alice Smith",
            "occupation": "Teacher",
            "contactNo": "3333333333",
            "address": "789 Elm Rd, Nearbytown"
        },
        "profileImg": "https://example.com/profile.jpg",
        "isActive": "active"
    }
}

Query middleware

Documentation → https://mongoosejs.com/docs/middleware.html#types-of-middleware 

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/tree/advanced-crud 



In our query middleware if we use → this , then ‘this’ will refer the current query. 

Query middleware is supported for the following Query functions. Query middleware executes when you call exec() or then() on a Query object, or await on a Query object. In query middleware functions, this refers to the query.
count
countDocuments
deleteMany
deleteOne
estimatedDocumentCount
find
findOne
findOneAndDelete
findOneAndReplace
findOneAndUpdate
remove
replaceOne
updateOne
updateMany
validate

So we lets get back to our project , what will we do ? 
To implement query middleware we can implement it same as we implemented document middleware.

Steps:


After the document middlewares →
student.model.ts →

studentSchema.pre()
studentSche.post()

studentSchema.pre(‘find’, function(next){
	console.log(this)

})



Before that go to the student.service.ts →

Create a find method → 


const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};


// Why we used updateOne instate of delete method ? , because in real life if there is any connection between datas saved in the db , there might be some inconsistency created.

→ updateOne takes two parameters ({which field to update}, {what to update})

Example: updateOne({id},{isDeleted: true})

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};



export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentFromDB,
  getSingleStudentFromDB
};


We have to create that getAllStudentsFromDB inside the student.service.ts →



















Now we have to create a function in student.controller.ts → 

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

















const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};














const deleteStudent = async (req: Request, res: Response) => {
  try {
const { studentId } = req.params;

const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};



export const StudentControllers = {
  getAllStudents,
deleteStudent,
 getSingleStudent
};

And inside student.route.ts →

router.get('/', StudentControllers.getAllStudents);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.get('/:studentId', StudentControllers.getSingleStudent);

Now go to postman and hit the api →

http://localhost:500/api/v1/students


Now go to the console and the console will be shown the document that the database have


*********************Here

Okay suppose when the query run we want some operation in the middle of it, we want to remove something while document query runed.


Now to check our deleted user lets say we add a property inside 

student.model.ts   schema:

isDeleted : {
	type: boolean,
	enum: [true , false],
	default: false
}

Now when we add it , there is a error occurred , because our interface doesn’t know about 

So go to student.interface.ts →

Add →

{
isDeleted : boolean,
}




So inside student.validation.ts →

Inside →
studentValidationSchema({
…
isDeleted: z.boolean()
})










Inside student.model.ts →
studentSchema({

…
isDeleted: {
	type: Boolean,
	default: false
}
})

Now test →
Now go to postman →

Hit → http://localhost:500/api/v1/students/{id}  → delete route hit
Here {id} → go to mongodb compass and take any id that saved documents , and we will want to see the property isDeleted: became true ? or not

If our postman responses 
{
	modifiedCount: 1  → really deleted
}


Now go to the compass and check there is one document has isDeleted: false

And the same document isDeleted: property is missing.

Now go to the postman and hit →
http://localhost:5000/api/v1/students    → get request

The postman is not responding because in the middleware we did not call next() , if we didnot call next it will stacked
student.model.ts →

studentSchema.pre(‘find’, function(next){
	next()
})

Now if we hit the route again, we can see the deleted data is in the response. →

Now go to the postman and hit →
http://localhost:5000/api/v1/students    → get request


In real life project we will not send deleted data to the client. So what can we do?

We will take help of query middleware. In 
student.model.ts →

studentSchema.pre(‘find’, function(next){
	this.find({isDeleted: {$ne: true}})
	next()
})


This.find → this databases documents points

How again we hit the route → 
Now go to the postman and hit →
http://localhost:5000/api/v1/students    → get request


We can see the deleted document is missing , what is happening here ? 
Chaining → 
First executing the middleware find() and filter that , then it is passing the documents to students.service.ts

Now we take the deleted student’s id and hit the findOne() route,
Go to postman →
Hit → http://localhost:500/api/v1/students/{id}

Here {id} = is the document’s id which is deleted

We are getting the data . Why ? Because we have applied document middleware in find() property not findOne() property , 
Now lets apply it in findOne()



Student.model.ts →

StudentSchema.pre(‘findOne’, function(next){
this.find({isDeleted: {$ne: true}})
next()
})

Now test the api again , and this time we are getting any.
Now in a normal find it works properly . lets try it into aggregation →










Student.service.ts →

Inside → getSingleStudentFromDB function
const getSingleStudentFromDB = async (id: string) =>{

	const result = await Student.aggregate([{ $match: { id } }]);
	return result;

}
	

Now we take the deleted student’s id and hit the findOne() route,
Go to postman →
Hit → http://localhost:500/api/v1/students/{id}

We are getting data again? Because our middleware function is not working on aggregations. So what we have to do ?
We have to build a middleware for the aggregation as well.


student.model.ts →

StudentSchema.pre(‘aggregate’, function(next){
console.log(this.pipeline());
next()
})

Now we can hit the route again →http://localhost:500/api/v1/students/{id} - get

We will get like this in console : [{‘$match’ : { id : ‘11111’ } }] like this

So if in this array we can send like that 👍
[{$match: { isDeleted: {$ne: true} }},{ ….}]


So in → student.model.ts

StudentSchema.pre(‘aggregate’, function(next){
this.pipeline().unshift({$match: {isDeleted : {$ne: true}}});
next()
})


Now again we try to hit the api →
Now we can hit the route again →http://localhost:500/api/v1/students/{id} - get

We will not get the document , that means we removed the middleware as well.



Mongoose Virtual

Now we will see a magic , mongoose magic, 
Lets say our database has 

“name”: {
	“firstName” : “Mazbaul”,
	“middleName”: “Abedin”,
	“lastName”: “Persian”
}

Now we want to add the three name and give user a full name

“fullName”: “Mazbaul Abedin Persian”

If we derived from more than one fields and sends client a new field , that is virtual

Why we use virtuals? Because we want to save the space of the database.

Those data are not necessary but try to send it to client. We can use virtuals.

Lets apply 👍 

student.model.ts →

	After studentSchema we want to add a property named full name.

// virtual
studentSchema.virtual('fullName').get(function () {
  return(
	`${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
);
});

Now hit the api and see if there is a new field added to the document named full name?

Now we can hit the route again →http://localhost:500/api/v1/students/{id} - get

No , it is not giving  virtual because we have to configure our model to get virtual.

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/blob/advanced-crud/src/app/modules/student/student.model.ts 

student.model.ts →

const studentSchema = new Schema<TStudent, StudentModel>({
…
},
{
toJSON: {
   virtuals: true
}
}
)


Now if we hit the route 
→http://localhost:500/api/v1/students/{id} - get
 We can get a property named “fullName” in the document.

Our task →

Go to student.route.ts →
Here 
Post , get, delete, getone done

Task : →
Do a route that can update the document.

Hint:: see the delete method


