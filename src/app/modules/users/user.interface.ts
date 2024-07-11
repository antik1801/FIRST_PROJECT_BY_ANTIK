
export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean; // setting true by default
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked'; // setting 'in-progress' by default
    isDeleted: boolean; // setting true by default
}

export type TNewUser ={
    password: string;
    role: string;
    id: string;
}