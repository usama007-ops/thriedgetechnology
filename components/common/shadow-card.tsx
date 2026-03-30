/**
 * Shadow Card Component
 * Premium shadow-based card for displaying services, projects, etc.
 */

import React from 'react'

interface ShadowCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  darkBg?: boolean
}

export function ShadowCard({
  children,
  className = '',
  hover = true,
  onClick,
  darkBg = false,
}: ShadowCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-lg p-8
        transition-all duration-300
        ${darkBg ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card shadow-sm'}
        ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        boxShadow: darkBg ? '0 10px 30px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {children}
    </div>
  )
}

interface ShadowCardGridProps {
  children: React.ReactNode
  columns?: number
  gap?: string
  className?: string
}

export function ShadowCardGrid({
  children,
  columns = 3,
  gap = 'gap-6',
  className = '',
}: ShadowCardGridProps) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid ${gridColsClass} ${gap} ${className}`}>
      {children}
    </div>
  )
}
