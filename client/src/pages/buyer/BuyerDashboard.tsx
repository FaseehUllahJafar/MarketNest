import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'

export const BuyerDashboard: React.FC = () => {
  const items = [ { label: 'Dashboard', path: '/buyer' } ]
  return (
    <DashboardLayout items={items}>
      <div className="space-y-4">
        <div className="rounded bg-white p-4">Upcoming bookings (stub)</div>
        <div className="rounded bg-white p-4">Recent activity (stub)</div>
      </div>
    </DashboardLayout>
  )
}

export default BuyerDashboard
