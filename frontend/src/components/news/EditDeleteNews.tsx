import { useLocation } from 'react-router-dom';
import EditNews from './EditNews.tsx';
import DeleteNews from './DeleteNews.tsx';

export default function EditDeleteNews() {
    const location = useLocation();

    return (
        <div className="container mt-4">
            <h4>{location.pathname === '/deletenews' ? 'Delete News' : 'Edit News'}</h4>
            {location.pathname === '/deletenews' ? <DeleteNews /> : <EditNews />}
        </div>
    );
};