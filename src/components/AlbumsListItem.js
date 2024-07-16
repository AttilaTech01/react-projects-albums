import { Fragment } from "react"; 
import { GoTrashcan } from "react-icons/go";
import { useDeleteAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function AlbumsListItem({ album }) {
    const [ deleteAlbum, results ] = useDeleteAlbumMutation();

    const handleDelete = () => {
        deleteAlbum(album);
    };

    const header = (
        <Fragment>
            <Button className="mr-2" loading={results.isLoading} onClick={handleDelete}>
                <GoTrashcan />
            </Button>
            {album.title}
        </Fragment>
    );

    return (
        <ExpandablePanel key={album.id} header={header}>
            List of photos in the album
        </ExpandablePanel>
    );
};

export default AlbumsListItem;