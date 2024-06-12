import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

// AUTOMATICALLY ADDED
// addUser.pending === 'users/add/pending'
// addUser.fulfilled === 'users/add/fulfilled'
// addUser.rejected === 'users/add/rejected'
const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.name.fullName()
    });

    return response.data;
});

export { addUser };