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
    label: 'Hôm nay',
    progress: 30,
    progressColor: '#5C6BC0',
    rows: [
      { name: 'Facebook', time: '02:00 - 03:00', mark: 'blue', client: 'Mintlime', change: 2.43, budget: '$5,489', status: 'Active', statusColor: 'blue' },
      { name: 'Video YouTube', time: '13:00 - 14:00', mark: 'danger', client: 'CDsoft', change: 3.12, budget: '$2,592', status: 'Đã đóng', statusColor: 'danger' },
      { name: 'Quảng cáo Spotify', time: '10:00 - 11:00', mark: 'grey', client: 'Diligence', change: -8.02, budget: '$1,268', status: 'Tạm dừng', statusColor: 'grey' },
      { name: 'Quảng cáo Twitter', time: '04:00 - 05:00', mark: 'grey', client: 'Deluxe', change: 2.78, budget: '$7,467', status: 'Tạm dừng', statusColor: 'grey' },
    ],
  },
  {
    label: 'Hôm qua',
    progress: 65,
    progressColor: '#3F51B5',
    rows: [
      { name: 'Chiến dịch Bing', time: '15:00 - 16:00', mark: 'success', client: 'Metrics', change: -5.78, budget: '$970', status: 'Đang chờ', statusColor: 'success-400' },
      { name: 'Quảng cáo Amazon', time: '18:00 - 19:00', mark: 'danger', client: 'Blueish', change: 6.79, budget: '$1,540', status: 'Active', statusColor: 'blue' },
      { name: 'Quảng cáo Dribbble', time: '20:00 - 21:00', mark: 'blue', client: 'Teamable', change: -9.83, budget: '$8,350', status: 'Đã đóng', statusColor: 'danger' },
    ],
  },
]

export interface Post {
  title: string
  category: string
  excerpt: string
}

export const latestPosts: Post[] = [
  { title: 'Tổng quan thân thiện', category: 'Video hướng dẫn', excerpt: 'Người cha của anh ấy nhìn về phía giáo xứ sớm hơn. Sự gắn bó thường kết thúc bằng lời chào từ con trai...' },
  { title: 'Quyền lợi đã được thông qua', category: 'Video hướng dẫn', excerpt: 'Văn học thay đổi khiến người ta đồng cảm với sự thiếu thận trọng. Đối tượng được Ferrars yêu thích...' },
  { title: 'Họ nhất định phải đọc hồ sơ', category: 'Video hướng dẫn', excerpt: 'Việc lặp lại những khác biệt đã khiến mọi thứ trở nên cần thiết. Sau đó, cô gái gọn gàng vẫn biết vị trí của bông hồng...' },
  { title: 'Đã có người đi cùng xe ngựa', category: 'FAQ', excerpt: 'Marianne hoặc những người chồng, nếu ở bên người mạnh mẽ hơn. Gia đình Middleton được xem là khác thường...' },
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
  { name: 'Sigma', color: 'bg-primary-400', icon: 'checkmark3', type: 'Đơn hàng mới', time: '06:28 pm', price: '$49.90' },
  { name: 'Alpha', color: 'bg-danger-400', icon: 'spinner11', type: 'Gia hạn', time: '04:52 pm', price: '$90.50' },
  { name: 'Delta', color: 'bg-indigo-400', icon: 'lifebuoy', type: 'Support', time: '01:26 pm', price: '$60.00' },
  { name: 'Omega', color: 'bg-success-400', icon: 'lifebuoy', type: 'Support', time: '11:46 am', price: '$55.00' },
  { name: 'Alpha', color: 'bg-danger-400', icon: 'spinner11', type: 'Gia hạn', time: '10:29 am', price: '$90.50' },
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
  { value: '2,345', label: 'tuần này' },
  { value: '3,568', label: 'tháng này' },
  { value: '32,693', label: 'tất cả tin nhắn' },
]

export const messageTabs: MessageTab[] = [
  {
    key: 'tue',
    label: 'Thứ Ba',
    messages: [
      { name: 'James Alexander', time: '14:58', text: 'Được kiểm kê theo hiến pháp một cách thận trọng...', unread: 8 },
      { name: 'Margo Baker', time: '12:16', text: 'Chọn điều tốt đẹp hơn về mặt đạo đức...', unread: 6 },
      { name: 'Jeremy Victorino', time: '09:48', text: 'Dày đặc, tinh nghịch, bám chặt và cau mày...' },
      { name: 'Beatrix Diaz', time: '05:54', text: 'Chim sơn ca, lời chào, vùng quê và chim hồng y...' },
      { name: 'Richard Vango', time: '01:43', text: 'Ở giữa đường, chim chạy, xa xôi và khoa trương...' },
    ],
  },
  {
    key: 'mon',
    label: 'Thứ Hai',
    messages: [
      { name: 'Isak Temes', time: 'Tue, 19:58', text: 'Hợp lý, rõ ràng, thẳng thắn và bẩn thỉu...' },
      { name: 'Vittorio Cosgrove', time: 'Tue, 16:35', text: 'Có thể nói, vì vậy càng khó giải thích...' },
      { name: 'Hilary Talaugon', time: 'Tue, 12:16', text: 'Dễ thương, khác biệt, cá heo và chim kookaburra...' },
      { name: 'Bobbie Seber', time: 'Tue, 09:20', text: 'Trước đó, quan sát cẩn thận, tình cờ và rùa...' },
      { name: 'Walther Laws', time: 'Tue, 03:29', text: 'Tác động xa hơn, liếc nhìn và không trung thực...' },
    ],
  },
  {
    key: 'fri',
    label: 'Thứ Sáu',
    messages: [
      { name: 'Owen Stretch', time: 'Mon, 18:12', text: 'Muộn màng, rắn đuôi chuông, hải cẩu và giun đất...' },
      { name: 'Jenilee Mcnair', time: 'Mon, 14:03', text: 'Từ khi lời chào thân mến vang lên giữa những điều tầm thường...' },
      { name: 'Alaster Jain', time: 'Mon, 13:59', text: 'Chó dachshund, chim hồng y và những lời thân mến...' },
      { name: 'Sigfrid Thisted', time: 'Mon, 09:26', text: 'Sói phát sáng, vượn cáo và tiếng càu nhàu...' },
      { name: 'Sherilyn Mckee', time: 'Mon, 06:38', text: 'Kỳ lân và chú husky bất cẩn...' },
    ],
  },
]