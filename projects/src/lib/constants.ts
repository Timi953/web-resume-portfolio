import type { ProjectCategory, ProjectStatus } from "@/types/project";

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: 'bg-green-500/10 text-green-500 border-green-500/20',
  'in-development': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  archived: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

export const CATEGORY_ICONS: Record<ProjectCategory, string> = {
  'SaaS': '🚀',
  'Landing Page': '📄',
  'Dashboard': '📊',
  'Mobile App': '📱',
  'Tool': '🔧',
  'E-commerce': '🛒',
  'Portfolio': '💼',
  'Other': '✨',
};
