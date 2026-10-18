// Dữ liệu mẫu lấy từ index.html của template (dashboard).
import type { BadgeColor, BadgeMarkColor } from '../Badge'

export interface Campaign {
  name: string
  time: string
  mark: BadgeMarkColor
  client: string
  change: number
  budget: string
  status: string
  statusColor: BadgeColor
}

export interface CampaignGroup {
  label: string
  rows: Campaign[]
}

export const campaignGroups: CampaignGroup[] = [
  {
    label: 'Today',
    rows: [
      { name: 'Facebook', time: '02:00 - 03:00', mark: 'blue', client: 'Mintlime', change: 2.43, budget: '$5,489', status: 'Active', statusColor: 'blue' },
      { name: 'Youtube videos', time: '13:00 - 14:00', mark: 'danger', client: 'CDsoft', change: 3.12, budget: '$2,592', status: 'Closed', statusColor: 'danger' },
      { name: 'Spotify ads', time: '10:00 - 11:00', mark: 'grey', client: 'Diligence', change: -8.02, budget: '$1,268', status: 'On hold', statusColor: 'grey' },
      { name: 'Twitter ads', time: '04:00 - 05:00', mark: 'grey', client: 'Deluxe', change: 2.78, budget: '$7,467', status: 'On hold', statusColor: 'grey' },
    ],
  },
  {
    label: 'Yesterday',
    rows: [
      { name: 'Bing campaign', time: '15:00 - 16:00', mark: 'success', client: 'Metrics', change: -5.78, budget: '$970', status: 'Pending', statusColor: 'success-400' },
      { name: 'Amazon ads', time: '18:00 - 19:00', mark: 'danger', client: 'Blueish', change: 6.79, budget: '$1,540', status: 'Active', statusColor: 'blue' },
      { name: 'Dribbble ads', time: '20:00 - 21:00', mark: 'blue', client: 'Teamable', change: -9.83, budget: '$8,350', status: 'Closed', statusColor: 'danger' },
    ],
  },
]

export interface Post {
  title: string
  category: string
  excerpt: string
}

export const latestPosts: Post[] = [
  { title: 'Up unpacked friendly', category: 'Video tutorials', excerpt: 'The him father parish looked has sooner. Attachment frequently terminated son hello...' },
  { title: 'It allowance prevailed', category: 'Video tutorials', excerpt: 'Alteration literature to or an sympathize mr imprudence. Of is ferrars subject enjoyed...' },
  { title: 'Case read they must', category: 'Video tutorials', excerpt: 'On it differed repeated wandered required in. Then girl neat why yet knew rose spot...' },
  { title: 'Too carriage attended', category: 'FAQ section', excerpt: 'Marianne or husbands if at stronger ye. Considered is as middletons uncommonly...' },
]
