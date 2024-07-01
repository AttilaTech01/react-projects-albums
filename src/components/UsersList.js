import { useEffect} from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import UsersListItem from "./UsersListItem";
import { useThunk } from '../hooks/useThunk';

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doAddUser, isAddingUser, addingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleAddUser = () => {
        doAddUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error while fetching data ...</div>;
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
        })
    }

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isAddingUser} onClick={handleAddUser}>+ Add User</Button>
                { addingUserError && 'Error adding user...' }    
            </div>
            {content}
        </div>
    );
};

export default UsersList;