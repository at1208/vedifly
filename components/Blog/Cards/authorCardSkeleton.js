import React from 'react';
import { Skeleton } from 'antd';

const AuthorCardSkeleton = () => {
  return <div className="col-md-3 col-sm-3">
            <Skeleton  active  avatar/>
         </div>
}

export default AuthorCardSkeleton;
