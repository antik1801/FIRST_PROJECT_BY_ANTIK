import { Schema, model, connect } from 'mongoose';

export type UserName = {
        firstName: string,
        middleName: string,
        lastName: string
}

export type Gardian ={
    fatherName: string,
    fatherOccupation: string,
    fatherContactNo: string;
    motherName: string,
    motherOccupation: string,
    motherContactNo: string;
}

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type Student = {
    id: string;
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress : string;
    gurdian : Gardian;
    localGuardian:LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked' ;
  }