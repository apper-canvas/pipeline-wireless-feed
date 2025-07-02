import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
            <div>
              <div className="h-8 w-40 bg-gray-200 rounded shimmer mb-2"></div>
              <div className="h-4 w-60 bg-gray-200 rounded shimmer"></div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="h-10 w-full bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-24 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg shimmer"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="h-10 w-32 bg-gray-200 rounded-lg shimmer"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg shimmer"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg shimmer"></div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gray-200 rounded shimmer mb-2"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded shimmer"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Board Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, stageIndex) => (
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="bg-gray-50 rounded-lg border-2 border-gray-200"
            >
              {/* Stage Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full shimmer"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded shimmer"></div>
                  <div className="h-5 w-8 bg-gray-200 rounded-full shimmer"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded shimmer"></div>
              </div>

              {/* Lead Cards */}
              <div className="p-4 space-y-3">
                {[...Array(Math.floor(Math.random() * 4) + 1)].map((_, cardIndex) => (
                  <motion.div
                    key={cardIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (stageIndex * 0.1) + (cardIndex * 0.05) }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="h-4 w-24 bg-gray-200 rounded shimmer mb-1"></div>
                          <div className="h-3 w-20 bg-gray-200 rounded shimmer"></div>
                        </div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded shimmer"></div>
                      <div className="h-5 w-12 bg-gray-200 rounded-full shimmer"></div>
                      <div className="space-y-1">
                        <div className="h-3 w-32 bg-gray-200 rounded shimmer"></div>
                        <div className="h-3 w-28 bg-gray-200 rounded shimmer"></div>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="h-3 w-16 bg-gray-200 rounded shimmer"></div>
                          <div className="h-3 w-12 bg-gray-200 rounded shimmer"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading