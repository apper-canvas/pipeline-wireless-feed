import { format, formatDistanceToNow, isToday, isYesterday, isTomorrow, parseISO, isValid } from 'date-fns'

/**
 * Format date for display
 */
export const formatDate = (date, formatString = 'MMM d, yyyy') => {
  if (!date) return ''
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return ''
    return format(parsedDate, formatString)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

/**
 * Format date and time for display
 */
export const formatDateTime = (date, formatString = 'MMM d, yyyy h:mm a') => {
  return formatDate(date, formatString)
}

/**
 * Format date relative to now (e.g., "2 days ago")
 */
export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return ''
    
    if (isToday(parsedDate)) {
      return 'Today'
    } else if (isYesterday(parsedDate)) {
      return 'Yesterday'
    } else if (isTomorrow(parsedDate)) {
      return 'Tomorrow'
    } else {
      return formatDistanceToNow(parsedDate, { addSuffix: true })
    }
  } catch (error) {
    console.error('Error formatting relative date:', error)
    return ''
  }
}

/**
 * Get days since date
 */
export const getDaysSince = (date) => {
  if (!date) return 0
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return 0
    
    const now = new Date()
    const diffTime = Math.abs(now - parsedDate)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  } catch (error) {
    console.error('Error calculating days since:', error)
    return 0
  }
}

/**
 * Check if date is overdue
 */
export const isOverdue = (date) => {
  if (!date) return false
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return false
    
    return parsedDate < new Date()
  } catch (error) {
    console.error('Error checking if overdue:', error)
    return false
  }
}

/**
 * Get current date in ISO format
 */
export const getCurrentDate = () => {
  return new Date().toISOString()
}

/**
 * Get date for form input (YYYY-MM-DD)
 */
export const getDateForInput = (date) => {
  if (!date) return ''
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(parsedDate)) return ''
    
    return format(parsedDate, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date for input:', error)
    return ''
  }
}