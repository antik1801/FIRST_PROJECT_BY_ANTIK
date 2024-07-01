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



