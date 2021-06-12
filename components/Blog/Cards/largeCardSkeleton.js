import React from 'react';
import { Skeleton } from 'antd';

const LargeCardSkeleton = () => {
  return <div className="p-4">
          <Skeleton.Button active={true} size={300} shape="rectangle"   />
          <br />
          <Skeleton active paragraph={{ rows: 3 }} />
         </div>
}

export default LargeCardSkeleton;
