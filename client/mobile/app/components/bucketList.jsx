'use client'

import BucketListCard from "./bucketListCard"

export default function BucketList({ bucketlistItems }) {

  return (
    <>
      {bucketlistItems && bucketlistItems.length > 0 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-[16px] font-semibold text-teal-600 mb-4">Bucket List</h2>
          <p className="text-xs text-black mb-6">
            This experience includes the following series of activities and locations for you to visit and enjoy. You can select and mark places as visited as you visit them.
          </p>
          <div className="relative">
            
            {bucketlistItems.map((item, index) => (
              <BucketListCard key={index} cardData={item} isLastItem={index === bucketlistItems.length - 1} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
