import { useMemo } from 'react'
import StatCard from '@/components/molecules/StatCard'

const StatsOverview = ({ leads = [] }) => {
  const stats = useMemo(() => {
    const totalLeads = leads.length
    const totalValue = leads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0)
    const closedWonLeads = leads.filter(lead => lead.stage === 'Closed Won')
    const closedWonValue = closedWonLeads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0)
    
    const qualifiedLeads = leads.filter(lead => 
      ['Qualified', 'Proposal', 'Closed Won'].includes(lead.stage)
    ).length
    
    const conversionRate = totalLeads > 0 ? (closedWonLeads.length / totalLeads * 100) : 0
    
    const averageDealSize = closedWonLeads.length > 0 ? closedWonValue / closedWonLeads.length : 0

    return {
      totalLeads,
      totalValue,
      closedWonValue,
      conversionRate,
      averageDealSize,
      qualifiedLeads
    }
  }, [leads])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <StatCard
        title="Total Leads"
        value={stats.totalLeads.toString()}
        icon="Users"
        color="primary"
      />
      
      <StatCard
        title="Pipeline Value"
        value={formatCurrency(stats.totalValue)}
        icon="DollarSign"
        color="accent"
      />
      
      <StatCard
        title="Closed Won"
        value={formatCurrency(stats.closedWonValue)}
        icon="TrendingUp"
        color="success"
      />
      
      <StatCard
        title="Conversion Rate"
        value={formatPercentage(stats.conversionRate)}
        icon="Target"
        color="info"
        trend={stats.conversionRate > 20 ? 'up' : stats.conversionRate < 10 ? 'down' : 'neutral'}
        trendValue={stats.conversionRate > 0 ? 'Good' : 'Low'}
      />
      
      <StatCard
        title="Avg Deal Size"
        value={formatCurrency(stats.averageDealSize)}
        icon="BarChart3"
        color="warning"
      />
      
      <StatCard
        title="Qualified Leads"
        value={stats.qualifiedLeads.toString()}
        icon="CheckCircle"
        color="primary"
      />
    </div>
  )
}

export default StatsOverview