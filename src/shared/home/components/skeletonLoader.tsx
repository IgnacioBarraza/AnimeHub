import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonLoaderProps } from '@/utils/propsInterface'

export const SkeletonLoader = ({title}: SkeletonLoaderProps) => {
  return (
    <div className="relative mb-8">
      <Skeleton className="h-8 w-48 mb-4">
        <span className='text-2xl font-bold mb-4 text-foreground'>{title}</span>
      </Skeleton>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex-none w-48">
            <Skeleton className="h-64 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
