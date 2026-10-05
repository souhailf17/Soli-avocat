import {
  Archive,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  FileText,
  FolderKanban,
  Gavel,
  Home,
  Mail,
  Receipt,
  Search,
  Settings,
  WalletCards,
} from 'lucide-react'

export const serviceCatalog = [
  { id: 'tracking', label: 'Track a case', group: 'Cases', icon: ClipboardList, href: '/actions/suivi', status: 'available', featured: true },
  { id: 'update-case', label: 'Update a case', group: 'Cases', icon: ClipboardList, href: '/actions/update-case', status: 'planned' },
  { id: 'advanced-search', label: 'Advanced search', group: 'Cases', icon: Search, href: '/actions/recherches', status: 'available', featured: true },
  { id: 'all-cases', label: 'All cases', group: 'Cases', icon: FolderKanban, href: '/actions/liste-dossiers', status: 'available', featured: true },
  { id: 'create-case', label: 'Create a case', group: 'Cases', icon: FolderKanban, href: '/actions/create-case', status: 'planned', featured: true },
  { id: 'classification', label: 'Classification', group: 'Cases', icon: Archive, href: '/actions/classification', status: 'planned' },

  { id: 'court-filings', label: 'Court filings', group: 'Procedures', icon: Gavel, href: '/actions/court-filings', status: 'planned' },
  { id: 'case-tasks', label: 'Case tasks', group: 'Procedures', icon: BriefcaseBusiness, href: '/actions/case-tasks', status: 'planned' },
  { id: 'hearings', label: 'Hearings', group: 'Procedures', icon: CalendarDays, href: '/actions/hearings', status: 'planned', featured: true },
  { id: 'bailiff', label: 'Bailiff', group: 'Procedures', icon: Gavel, href: '/actions/bailiff', status: 'planned' },
  { id: 'judgments', label: 'Judgments', group: 'Procedures', icon: Gavel, href: '/actions/judgments', status: 'planned' },
  { id: 'notifications', label: 'Notifications', group: 'Procedures', icon: FileText, href: '/actions/notifications', status: 'planned' },
  { id: 'enforcement', label: 'Enforcement', group: 'Procedures', icon: BriefcaseBusiness, href: '/actions/enforcement', status: 'planned' },
  { id: 'formal-notice', label: 'Formal notice', group: 'Procedures', icon: FileText, href: '/actions/formal-notice', status: 'planned' },
  { id: 'expert-review', label: 'Expert review', group: 'Procedures', icon: Search, href: '/actions/expert-review', status: 'planned' },

  { id: 'send-email', label: 'Send email', group: 'Communication', icon: Mail, href: '/actions/send-email', status: 'planned' },
  { id: 'correspondence', label: 'Correspondence', group: 'Communication', icon: Mail, href: '/actions/correspondence', status: 'planned' },

  { id: 'calendar', label: 'Calendar', group: 'Office tools', icon: CalendarDays, href: '/actions/calendar', status: 'planned' },
  { id: 'create-series', label: 'Create a series', group: 'Office tools', icon: Archive, href: '/actions/create-series', status: 'planned' },
  { id: 'reporting', label: 'Reporting', group: 'Office tools', icon: BarChart3, href: '/actions/reporting', status: 'planned' },

  { id: 'new-expense', label: 'New expense', group: 'Billing', icon: Receipt, href: '/actions/new-expense', status: 'planned' },
  { id: 'expense-management', label: 'Expense management', group: 'Billing', icon: Receipt, href: '/actions/expenses', status: 'planned' },
  { id: 'invoices', label: 'Invoice list', group: 'Billing', icon: Receipt, href: '/actions/invoices', status: 'planned', featured: true },
  { id: 'create-invoice', label: 'Create an invoice', group: 'Billing', icon: Receipt, href: '/actions/create-invoice', status: 'planned' },
  { id: 'batch-invoices', label: 'Batch invoices', group: 'Billing', icon: Receipt, href: '/actions/batch-invoices', status: 'planned' },
  { id: 'payments', label: 'Payments', group: 'Billing', icon: WalletCards, href: '/actions/payments', status: 'planned' },
  { id: 'form-100', label: 'Form 100', group: 'Billing', icon: Receipt, href: '/actions/form-100', status: 'planned' },
  { id: 'receipts', label: 'Receipts and deposits', group: 'Billing', icon: WalletCards, href: '/actions/receipts-deposits', status: 'planned' },
  { id: 'transfer', label: 'Transfer', group: 'Billing', icon: WalletCards, href: '/actions/transfer', status: 'planned' },
  { id: 'accounting', label: 'Accounting', group: 'Billing', icon: BarChart3, href: '/actions/accounting', status: 'planned' },
  { id: 'cash-checks', label: 'Cash and checks', group: 'Billing', icon: WalletCards, href: '/actions/cash-checks', status: 'planned' },
  { id: 'other-services', label: 'Other services', group: 'Office tools', icon: BriefcaseBusiness, href: '/actions/other-services', status: 'planned' },
]

const serviceLinks = (group) => serviceCatalog
  .filter((service) => service.group === group)
  .map(({ label, href, status }) => ({ label, href, status }))

export const navigation = [
  { label: 'Dashboard', icon: Home, href: '/' },
  { label: 'Cases', icon: FolderKanban, items: serviceLinks('Cases') },
  { label: 'Procedures', icon: Gavel, items: serviceLinks('Procedures') },
  { label: 'Communication', icon: Mail, items: serviceLinks('Communication') },
  { label: 'Office tools', icon: BriefcaseBusiness, items: serviceLinks('Office tools') },
  { label: 'Billing', icon: WalletCards, items: serviceLinks('Billing') },
  { label: 'Settings', icon: Settings, href: '/actions/settings' },
]

export const dashboardActions = serviceCatalog.filter((service) => service.featured)

export const categoryCards = [
  {
    title: 'Case management',
    description: 'Find, review, and create client cases.',
    icon: FolderKanban,
    tone: 'indigo',
    links: [
      { label: 'Track a case', href: '/actions/suivi' },
      { label: 'All cases', href: '/actions/liste-dossiers' },
      { label: 'Create a case', href: '/actions/create-case' },
    ],
  },
  {
    title: 'Schedule',
    description: 'Review hearings, deadlines, and appointments.',
    icon: CalendarDays,
    tone: 'violet',
    links: [
      { label: 'Hearings', href: '/actions/hearings' },
      { label: 'Calendar', href: '/actions/calendar' },
    ],
  },
  {
    title: 'Billing',
    description: 'Manage invoices, payments, and financial reports.',
    icon: BarChart3,
    tone: 'emerald',
    links: [
      { label: 'Invoices', href: '/actions/invoices' },
      { label: 'Payments', href: '/actions/payments' },
      { label: 'Reports', href: '/actions/reporting' },
    ],
  },
]
