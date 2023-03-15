import React from 'react';
import './index.scss';

const Loading = ({ children }) => {
    // const isLoading = useSelector(state => state?.auth.isLoading);

    return (
        <>
            {children}
        </>
    );
}

export default Loading;