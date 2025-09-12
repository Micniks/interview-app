import React from 'react';
import { useParams } from 'react-router-dom';

const NotFound = () => {
    const {path} = useParams();

    return <div>Page for /{path} not Found, this has not been developt as part of this project task</div>
};

export default NotFound;