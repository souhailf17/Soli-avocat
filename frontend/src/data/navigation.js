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
  { id: 'tracking', label: 'Suivi des dossiers', group: 'Dossiers', icon: ClipboardList, href: '/actions/suivi', status: 'available', featured: true },
  { id: 'update-case', label: 'Mise à jour d’un dossier', group: 'Dossiers', icon: ClipboardList, href: '/actions/update-case', status: 'planned' },
  { id: 'advanced-search', label: 'Recherche avancée', group: 'Dossiers', icon: Search, href: '/actions/recherches', status: 'available', featured: true },
  { id: 'all-cases', label: 'Tous les dossiers', group: 'Dossiers', icon: FolderKanban, href: '/actions/liste-dossiers', status: 'available', featured: true },
  { id: 'create-case', label: 'Créer un dossier', group: 'Dossiers', icon: FolderKanban, href: '/actions/create-case', status: 'planned', featured: true },
  { id: 'classification', label: 'Classement', group: 'Dossiers', icon: Archive, href: '/actions/classification', status: 'planned' },

  { id: 'court-filings', label: 'Dépôts au tribunal', group: 'Procédures', icon: Gavel, href: '/actions/court-filings', status: 'planned' },
  { id: 'case-tasks', label: 'Diligences', group: 'Procédures', icon: BriefcaseBusiness, href: '/actions/case-tasks', status: 'planned' },
  { id: 'hearings', label: 'Audiences', group: 'Procédures', icon: CalendarDays, href: '/actions/hearings', status: 'planned', featured: true },
  { id: 'bailiff', label: 'Huissier', group: 'Procédures', icon: Gavel, href: '/actions/bailiff', status: 'planned' },
  { id: 'judgments', label: 'Jugements', group: 'Procédures', icon: Gavel, href: '/actions/judgments', status: 'planned' },
  { id: 'notifications', label: 'Notifications', group: 'Procédures', icon: FileText, href: '/actions/notifications', status: 'planned' },
  { id: 'enforcement', label: 'Exécutions', group: 'Procédures', icon: BriefcaseBusiness, href: '/actions/enforcement', status: 'planned' },
  { id: 'formal-notice', label: 'Mise en demeure', group: 'Procédures', icon: FileText, href: '/actions/formal-notice', status: 'planned' },
  { id: 'expert-review', label: 'Expertise', group: 'Procédures', icon: Search, href: '/actions/expert-review', status: 'planned' },

  { id: 'send-email', label: 'Envoyer un e-mail', group: 'Communication', icon: Mail, href: '/actions/send-email', status: 'planned' },
  { id: 'correspondence', label: 'Courriers', group: 'Communication', icon: Mail, href: '/actions/correspondence', status: 'planned' },

  { id: 'calendar', label: 'Agenda', group: 'Outils du cabinet', icon: CalendarDays, href: '/actions/calendar', status: 'planned' },
  { id: 'create-series', label: 'Créer une série', group: 'Outils du cabinet', icon: Archive, href: '/actions/create-series', status: 'planned' },
  { id: 'reporting', label: 'Rapports', group: 'Outils du cabinet', icon: BarChart3, href: '/actions/reporting', status: 'planned' },

  { id: 'new-expense', label: 'Nouveaux frais', group: 'Facturation', icon: Receipt, href: '/actions/new-expense', status: 'planned' },
  { id: 'expense-management', label: 'Gestion des frais', group: 'Facturation', icon: Receipt, href: '/actions/expenses', status: 'planned' },
  { id: 'invoices', label: 'Liste des factures', group: 'Facturation', icon: Receipt, href: '/actions/invoices', status: 'planned', featured: true },
  { id: 'create-invoice', label: 'Créer une facture', group: 'Facturation', icon: Receipt, href: '/actions/create-invoice', status: 'planned' },
  { id: 'batch-invoices', label: 'Factures globales', group: 'Facturation', icon: Receipt, href: '/actions/batch-invoices', status: 'planned' },
  { id: 'payments', label: 'Règlements', group: 'Facturation', icon: WalletCards, href: '/actions/payments', status: 'planned' },
  { id: 'form-100', label: 'Formulaire 100', group: 'Facturation', icon: Receipt, href: '/actions/form-100', status: 'planned' },
  { id: 'receipts', label: 'Encaissements et versements', group: 'Facturation', icon: WalletCards, href: '/actions/receipts-deposits', status: 'planned' },
  { id: 'transfer', label: 'Transfert', group: 'Facturation', icon: WalletCards, href: '/actions/transfer', status: 'planned' },
  { id: 'accounting', label: 'Comptabilité', group: 'Facturation', icon: BarChart3, href: '/actions/accounting', status: 'planned' },
  { id: 'cash-checks', label: 'Chèques et caisse', group: 'Facturation', icon: WalletCards, href: '/actions/cash-checks', status: 'planned' },
  { id: 'other-services', label: 'Autres services', group: 'Outils du cabinet', icon: BriefcaseBusiness, href: '/actions/other-services', status: 'planned' },
]

const serviceLinks = (group) => serviceCatalog
  .filter((service) => service.group === group)
  .map(({ label, href, status }) => ({ label, href, status }))

export const navigation = [
  { label: 'Tableau de bord', icon: Home, href: '/' },
  { label: 'Dossiers', icon: FolderKanban, items: serviceLinks('Dossiers') },
  { label: 'Procédures', icon: Gavel, items: serviceLinks('Procédures') },
  { label: 'Communication', icon: Mail, items: serviceLinks('Communication') },
  { label: 'Outils du cabinet', icon: BriefcaseBusiness, items: serviceLinks('Outils du cabinet') },
  { label: 'Facturation', icon: WalletCards, items: serviceLinks('Facturation') },
  { label: 'Paramètres', icon: Settings, href: '/actions/settings' },
]

export const dashboardActions = serviceCatalog.filter((service) => service.featured)

export const categoryCards = [
  {
    title: 'Gestion des dossiers',
    description: 'Retrouvez, consultez et créez les dossiers de vos clients.',
    icon: FolderKanban,
    tone: 'indigo',
    links: [
      { label: 'Suivi des dossiers', href: '/actions/suivi' },
      { label: 'Tous les dossiers', href: '/actions/liste-dossiers' },
      { label: 'Créer un dossier', href: '/actions/create-case' },
    ],
  },
  {
    title: 'Agenda',
    description: 'Consultez les audiences, les échéances et les rendez-vous.',
    icon: CalendarDays,
    tone: 'violet',
    links: [
      { label: 'Audiences', href: '/actions/hearings' },
      { label: 'Calendrier', href: '/actions/calendar' },
    ],
  },
  {
    title: 'Facturation',
    description: 'Gérez les factures, les règlements et les rapports financiers.',
    icon: BarChart3,
    tone: 'emerald',
    links: [
      { label: 'Factures', href: '/actions/invoices' },
      { label: 'Règlements', href: '/actions/payments' },
      { label: 'Rapports', href: '/actions/reporting' },
    ],
  },
]
