export interface NavBadge {
  text: string
  color?: string
}

export type NavNode =
  | { type: 'header'; title: string }
  | { type: 'divider' }
  | { type: 'link'; label: string; to: string; icon?: string; badge?: NavBadge; disabled?: boolean }
  | { type: 'group'; label: string; icon?: string; children: NavNode[] }
