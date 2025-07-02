import activityData from "@/services/mockData/activities.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for demo purposes
let activities = [...activityData]

export const getAll = async () => {
  await delay(250)
  return activities.map(activity => ({ ...activity }))
}

export const getById = async (id) => {
  await delay(200)
  const activity = activities.find(a => a.Id === parseInt(id))
  if (!activity) {
    throw new Error('Activity not found')
  }
  return { ...activity }
}

export const getByLeadId = async (leadId) => {
  await delay(200)
  return activities
    .filter(activity => activity.leadId === parseInt(leadId))
    .map(activity => ({ ...activity }))
}

export const create = async (activityData) => {
  await delay(300)
  
  // Find the highest existing Id and add 1
  const maxId = activities.reduce((max, activity) => Math.max(max, activity.Id), 0)
  const newActivity = {
    ...activityData,
    Id: maxId + 1,
    leadId: parseInt(activityData.leadId),
    date: activityData.date || new Date().toISOString()
  }
  
  activities.push(newActivity)
  return { ...newActivity }
}

export const update = async (id, activityData) => {
  await delay(250)
  
  const activityIndex = activities.findIndex(a => a.Id === parseInt(id))
  if (activityIndex === -1) {
    throw new Error('Activity not found')
  }
  
  const updatedActivity = {
    ...activities[activityIndex],
    ...activityData,
    Id: parseInt(id) // Ensure Id remains integer
  }
  
  activities[activityIndex] = updatedActivity
  return { ...updatedActivity }
}

export const deleteActivity = async (id) => {
  await delay(200)
  
  const activityIndex = activities.findIndex(a => a.Id === parseInt(id))
  if (activityIndex === -1) {
    throw new Error('Activity not found')
  }
  
  activities.splice(activityIndex, 1)
  return true
}