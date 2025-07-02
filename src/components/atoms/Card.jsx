import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  padding = 'md',
  shadow = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg transition-all duration-200'
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-card',
    lg: 'shadow-card-hover',
    xl: 'shadow-elevated'
  }
  
  const hoverClasses = hoverable ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' : ''
  
  return (
    <motion.div
      initial={hoverable ? { y: 0 } : false}
      whileHover={hoverable ? { y: -4 } : {}}
      className={`${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card