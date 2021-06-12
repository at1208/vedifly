import React from 'react';
import { Skeleton } from 'antd';

const SmallCardSkeleton = () => {
  return <div className="row p-2">
          <Skeleton  active paragraph={{ rows: 3 }} />
         </div>
}

export default SmallCardSkeleton;
