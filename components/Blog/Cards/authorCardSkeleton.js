import React from "react";
import Skeleton from "react-loading-skeleton";

const AuthorCardSkeleton = () => {
  return (
    <div className="col-md-3 col-sm-3">
      <Skeleton circle={true} height={50} width={50} />
    </div>
  );
};

export default AuthorCardSkeleton;
