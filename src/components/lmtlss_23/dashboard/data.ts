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
  /** % cho vòng tiến độ ở cuối dòng nhóm (data-progress của template) */
  progress: number
  progressColor: string
  rows: Campaign[]
}

export const campaignGroups: CampaignGroup[] = [
  {
    label: 'Today',
    progress: 30,
    progressColor: '#5C6BC0',
    rows: [
      { name: 'Facebook', time: '02:00 - 03:00', mark: 'blue', client: 'Mintlime', change: 2.43, budget: '$5,489', status: 'Active', statusColor: 'blue' },
      { name: 'Youtube videos', time: '13:00 - 14:00', mark: 'danger', client: 'CDsoft', change: 3.12, budget: '$2,592', status: 'Closed', statusColor: 'danger' },
      { name: 'Spotify ads', time: '10:00 - 11:00', mark: 'grey', client: 'Diligence', change: -8.02, budget: '$1,268', status: 'On hold', statusColor: 'grey' },
      { name: 'Twitter ads', time: '04:00 - 05:00', mark: 'grey', client: 'Deluxe', change: 2.78, budget: '$7,467', status: 'On hold', statusColor: 'grey' },
    ],
  },
  {
    label: 'Yesterday',
    progress: 65,
    progressColor: '#3F51B5',
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

export interface DailySale {
  name: string
  /** Class màu nền của nút chữ cái (colors.min.css) */
  color: string
  icon: string
  type: string
  time: string
  price: string
}

export const dailySales: DailySale[] = [
  { name: 'Sigma', color: 'bg-primary-400', icon: 'checkmark3', type: 'New order', time: '06:28 pm', price: '$49.90' },
  { name: 'Alpha', color: 'bg-danger-400', icon: 'spinner11', type: 'Renewal', time: '04:52 pm', price: '$90.50' },
  { name: 'Delta', color: 'bg-indigo-400', icon: 'lifebuoy', type: 'Support', time: '01:26 pm', price: '$60.00' },
  { name: 'Omega', color: 'bg-success-400', icon: 'lifebuoy', type: 'Support', time: '11:46 am', price: '$55.00' },
  { name: 'Alpha', color: 'bg-danger-400', icon: 'spinner11', type: 'Renewal', time: '10:29 am', price: '$90.50' },
]

export interface ChatMessage {
  name: string
  time: string
  text: string
  /** Số tin chưa đọc (badge đỏ trên avatar) */
  unread?: number
}

export interface MessageTab {
  key: string
  label: string
  messages: ChatMessage[]
}

export const messageStats = [
  { value: '2,345', label: 'this week' },
  { value: '3,568', label: 'this month' },
  { value: '32,693', label: 'all messages' },
]

export const messageTabs: MessageTab[] = [
  {
    key: 'tue',
    label: 'Tuesday',
    messages: [
      { name: 'James Alexander', time: '14:58', text: 'The constitutionally inventoried precariously...', unread: 8 },
      { name: 'Margo Baker', time: '12:16', text: 'Pinched a well more moral chose goodness...', unread: 6 },
      { name: 'Jeremy Victorino', time: '09:48', text: 'Pert thickly mischievous clung frowned well...' },
      { name: 'Beatrix Diaz', time: '05:54', text: 'Nightingale taped hello bucolic fussily cardinal...' },
      { name: 'Richard Vango', time: '01:43', text: 'Amidst roadrunner distantly pompously where...' },
    ],
  },
  {
    key: 'mon',
    label: 'Monday',
    messages: [
      { name: 'Isak Temes', time: 'Tue, 19:58', text: 'Reasonable palpably rankly expressly grimy...' },
      { name: 'Vittorio Cosgrove', time: 'Tue, 16:35', text: 'Arguably therefore more unexplainable fumed...' },
      { name: 'Hilary Talaugon', time: 'Tue, 12:16', text: 'Nicely unlike porpoise a kookaburra past more...' },
      { name: 'Bobbie Seber', time: 'Tue, 09:20', text: 'Before visual vigilantly fortuitous tortoise...' },
      { name: 'Walther Laws', time: 'Tue, 03:29', text: 'Far affecting more leered unerringly dishonest...' },
    ],
  },
  {
    key: 'fri',
    label: 'Friday',
    messages: [
      { name: 'Owen Stretch', time: 'Mon, 18:12', text: 'Tardy rattlesnake seal raptly earthworm...' },
      { name: 'Jenilee Mcnair', time: 'Mon, 14:03', text: 'Since hello dear pushed amid darn trite...' },
      { name: 'Alaster Jain', time: 'Mon, 13:59', text: 'Dachshund cardinal dear next jeepers well...' },
      { name: 'Sigfrid Thisted', time: 'Mon, 09:26', text: 'Lighted wolf yikes less lemur crud grunted...' },
      { name: 'Sherilyn Mckee', time: 'Mon, 06:38', text: 'Less unicorn a however careless husky...' },
    ],
  },
]