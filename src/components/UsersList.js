import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingUsersError, setIsLoadingUsersError] = useState(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isAddingUserError, setIsAddingUserError] = useState(null);

    const dispatch = useDispatch();
    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .catch((err) => {
                setIsLoadingUsersError(err);
            })
            .finally(() => {
                setIsLoadingUsers(false);
            });

    }, [dispatch]);

    const handleAddUser = () => {
        setIsAddingUser(true);
        dispatch(addUser())
            .unwrap()
            .catch((err) => {
                setIsAddingUserError(err);
            })
            .finally(() => {
                setIsAddingUser(false);
            });
    };

    if (isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full" />;
    }

    if (isLoadingUsersError) {
        return <div>Error while fetching data ...</div>;
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center curser-pointer">
                    {user.name}
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">
                { isAddingUser 
                    ? 'Adding user'
                    : <Button onClick={handleAddUser}>+ Add User</Button> 
                }    
                </h1>
            </div>
            {renderedUsers}
        </div>
    );
};

export default UsersList;