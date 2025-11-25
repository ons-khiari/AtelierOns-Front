"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { TrendingUp, Users, ShoppingCart, Package, AlertTriangle } from "lucide-react"

interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  lowStockAlerts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    lowStockAlerts: 0,
  })

  useEffect(() => {
    // Load data from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const products = JSON.parse(localStorage.getItem("products") || "[]")

    const totalSales = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
    const lowStockProducts = products.filter((p: any) => p.stock && p.stock < 5).length

    setStats({
      totalSales: Math.round(totalSales * 100) / 100,
      totalOrders: orders.length,
      totalCustomers: users.filter((u: any) => u.role !== "admin").length,
      totalProducts: products.length,
      lowStockAlerts: lowStockProducts,
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Ons. Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Sales"
          value={`$${stats.totalSales.toFixed(2)}`}
          color="text-accent"
        />
        <StatCard
          icon={<ShoppingCart className="w-6 h-6" />}
          label="Total Orders"
          value={stats.totalOrders.toString()}
          color="text-primary"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Total Customers"
          value={stats.totalCustomers.toString()}
          color="text-secondary"
        />
        <StatCard
          icon={<Package className="w-6 h-6" />}
          label="Total Products"
          value={stats.totalProducts.toString()}
          color="text-foreground"
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Low Stock"
          value={stats.lowStockAlerts.toString()}
          color="text-destructive"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Recent Orders</h2>
          <div className="text-muted-foreground text-sm">Orders will appear here</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Trending Products</h2>
          <div className="text-muted-foreground text-sm">Trending products will appear here</div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
    </div>
  )
}
