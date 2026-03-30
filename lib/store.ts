/**
 * Zustand Store Configuration
 * Global application state management
 */

import { create } from 'zustand'

interface UIState {
  // Navigation
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  
  // Theme
  isDarkMode: boolean
  setDarkMode: (dark: boolean) => void
  
  // Active states
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
  
  // Filters
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Navigation
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  // Theme
  isDarkMode: true,
  setDarkMode: (dark: boolean) => set({ isDarkMode: dark }),
  
  // Active states
  activeCategory: null,
  setActiveCategory: (category: string | null) => set({ activeCategory: category }),
  
  // Filters
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))
