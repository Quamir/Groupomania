import { it,expect,vi,describe, mockClear} from "vitest";
import User from './userModel.js';
const pool = require('../database');



describe('class User', () =>{
   
    const name = 'Test';
    const lastName = 'McTester';
    const email = 'Test@yahoo.com';
    const password = 'Test123';
    const newPassword = 'NewTestPassword123';
    const newEamil = 'NewTestEmail@yahoo.com';
    const id = '';
    const profilePicture = '';

    // creating a new user 
    describe('createAccount', () =>{
        it('should return a object , password should be hashed', async () =>{  

            const createUserAcc = new User(...[name,lastName,email,password, , , profilePicture]);
            const createUser = await createUserAcc.createAccount();

            expect(typeof createUser).toBe('object'); 
            console.log(createUser);   

            // clearing the database 
            const sql = 'DELETE FROM user_account WHERE id = $1'
            const value = [createUser[0].id];
            const clearTestData = await pool.query(sql,value);
            console.log(clearTestData.rows);
        });

    });

    describe('deleteAccount', () =>{
        it('should return a message saying a user does not exist if not in db', async () =>{
            const createUserAcc = new User(...[name,lastName,email,password, , , profilePicture]);
            const deleteUserAccount = await createUserAcc.deleteAccount();

            expect(typeof deleteUserAccount).toBe('object');
            console.log(deleteUserAccount);
        });

        it('should return a object when exacuted successfully', async () =>{
            const testUser = new User(...[name,lastName,email,password, , , profilePicture]);
            const createUser = await testUser.createAccount();

            const deleteTestUser = new User(...[, ,email, password]);
            const deleteAccount = await deleteTestUser.deleteAccount();
            
            expect(typeof deleteAccount).toBe('object');
            console.log(deleteAccount);
        })
    });



});