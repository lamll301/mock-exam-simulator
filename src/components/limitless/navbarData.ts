// Dữ liệu mẫu cho các dropdown trên navbar (lấy từ template).

export interface GitUpdate {
  icon: string
  color: 'primary' | 'warning' | 'info' | 'success'
  text: string
  time: string
}

export const gitUpdates: GitUpdate[] = [
  { icon: 'git-pull-request', color: 'primary', text: 'Drop the IE specific hacks for temporal inputs', time: '4 minutes ago' },
  { icon: 'git-commit', color: 'warning', text: 'Add full font overrides for popovers and tooltips', time: '36 minutes ago' },
  { icon: 'git-branch', color: 'info', text: 'Chris Arney created a new Design branch', time: '2 hours ago' },
  { icon: 'git-merge', color: 'success', text: 'Eugene Kopyov merged Master and Dev branches', time: 'Dec 18, 18:36' },
  { icon: 'git-pull-request', color: 'primary', text: 'Have Carousel ignore keyboard events', time: 'Dec 12, 05:46' },
]

export interface OnlineUser {
  name: string
  role: string
  status: 'success' | 'danger' | 'warning' | 'grey'
}

export const onlineUsers: OnlineUser[] = [
  { name: 'Jordana Ansley', role: 'Lead web developer', status: 'success' },
  { name: 'Will Brason', role: 'Marketing manager', status: 'danger' },
  { name: 'Hanna Walden', role: 'Project manager', status: 'success' },
  { name: 'Dori Laperriere', role: 'Business developer', status: 'warning' },
  { name: 'Vanessa Aurelius', role: 'UX expert', status: 'grey' },
]

export interface Message {
  from: string
  time: string
  text: string
}

export const messages: Message[] = [
  { from: 'James Alexander', time: '04:58', text: 'who knows, maybe that would be the best thing for me...' },
  { from: 'Margo Baker', time: '12:16', text: 'That was something he was unable to do because...' },
  { from: 'Jeremy Victorino', time: '22:48', text: 'But that would be extremely strained and suspicious...' },
  { from: 'Beatrix Diaz', time: 'Tue', text: "What a strenuous career it is that I've chosen..." },
  { from: 'Richard Vango', time: 'Mon', text: 'Other travelling salesmen live a life of luxury...' },
]
