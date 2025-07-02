/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Phone number validation (US format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Required field validation
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined && value !== ''
}

/**
 * Minimum length validation
 */
export const hasMinLength = (value, minLength) => {
  if (typeof value !== 'string') return false
  return value.trim().length >= minLength
}

/**
 * Maximum length validation
 */
export const hasMaxLength = (value, maxLength) => {
  if (typeof value !== 'string') return false
  return value.trim().length <= maxLength
}

/**
 * Number validation
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * Positive number validation
 */
export const isPositiveNumber = (value) => {
  return isValidNumber(value) && parseFloat(value) > 0
}

/**
 * URL validation
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Date validation
 */
export const isValidDate = (date) => {
  if (!date) return false
  const parsedDate = new Date(date)
  return !isNaN(parsedDate.getTime())
}

/**
 * Future date validation
 */
export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false
  return new Date(date) > new Date()
}

/**
 * Past date validation
 */
export const isPastDate = (date) => {
  if (!isValidDate(date)) return false
  return new Date(date) < new Date()
}

/**
 * Validate lead data
 */
export const validateLead = (leadData) => {
  const errors = {}

  if (!isRequired(leadData.name)) {
    errors.name = 'Name is required'
  }

  if (!isRequired(leadData.email)) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(leadData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (leadData.phone && !isValidPhone(leadData.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (leadData.dealValue && !isPositiveNumber(leadData.dealValue)) {
    errors.dealValue = 'Deal value must be a positive number'
  }

  if (leadData.nextActionDate && !isValidDate(leadData.nextActionDate)) {
    errors.nextActionDate = 'Please enter a valid date'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate activity data
 */
export const validateActivity = (activityData) => {
  const errors = {}

  if (!isRequired(activityData.type)) {
    errors.type = 'Activity type is required'
  }

  if (!isRequired(activityData.description)) {
    errors.description = 'Description is required'
  }

  if (!isValidDate(activityData.date)) {
    errors.date = 'Please enter a valid date'
  }

  if (activityData.duration && !isPositiveNumber(activityData.duration)) {
    errors.duration = 'Duration must be a positive number'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}