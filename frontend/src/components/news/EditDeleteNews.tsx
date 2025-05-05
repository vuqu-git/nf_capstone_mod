import {Link, useLocation} from 'react-router-dom';
import EditNews from './EditNews.tsx';
import DeleteNews from './DeleteNews.tsx';
import React from "react";

export default function EditDeleteNews() {
    const location = useLocation();

    return (
        <div className="container mt-4">
            <Link to={`/admin`}>
                zum Adminbereich
            </Link>

            <h4>{location.pathname === '/deletenews' ? 'Delete News Selection' : 'Edit News Selection'}</h4>
            {location.pathname === '/deletenews' ? <DeleteNews /> : <EditNews />}
        </div>
    );
};