import { Fragment } from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { deleteUser } from '../store';
import { useThunk } from "../hooks/useThunk";
import AlbumsList from "./AlbumsList";
import ExpandablePanel from "./ExpandablePanel";


function UsersListItem({ user }) {
    const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

    const handleClick = () => {
        doDeleteUser(user);
    };

    const header = (
        <Fragment>
            <Button className='mr-3' loading={isLoading} onClick={handleClick}>
                <GoTrashcan />
            </Button>
            {error && <div>Error deleting user!</div>}
            {user.name}
        </Fragment>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
};

export default UsersListItem;