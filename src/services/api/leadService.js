import leadData from "@/services/mockData/leads.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for demo purposes
let leads = [...leadData];

export const getAll = async () => {
  await delay(300)
  return leads.map(lead => ({ ...lead }))
}

export const getById = async (id) => {
  await delay(200)
  const lead = leads.find(l => l.Id === parseInt(id))
  if (!lead) {
    throw new Error('Lead not found')
  }
  return { ...lead }
}

export const create = async (leadData) => {
  await delay(400)
  
  // Find the highest existing Id and add 1
  const maxId = leads.reduce((max, lead) => Math.max(max, lead.Id), 0)
  const newLead = {
    ...leadData,
    Id: maxId + 1,
    createdAt: new Date().toISOString(),
    lastContactDate: leadData.lastContactDate || new Date().toISOString()
  }
  
  leads.push(newLead)
  return { ...newLead }
}

export const update = async (id, leadData) => {
  await delay(300)
  
  const leadIndex = leads.findIndex(l => l.Id === parseInt(id))
  if (leadIndex === -1) {
    throw new Error('Lead not found')
  }
  
  const updatedLead = {
    ...leads[leadIndex],
    ...leadData,
    Id: parseInt(id) // Ensure Id remains integer
  }
  
leads[leadIndex] = updatedLead
  return { ...updatedLead }
}

export const deleteById = async (id) => {
  await delay(200)
  
  const leadIndex = leads.findIndex(l => l.Id === parseInt(id))
  if (leadIndex === -1) {
    throw new Error('Lead not found')
  }
  
  leads.splice(leadIndex, 1)
  return true;
};