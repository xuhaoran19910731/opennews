// 政治光谱立场
export type PoliticalStance = 'far-right' | 'right' | 'center-right' | 'center' | 'center-left' | 'left' | 'far-left';

// 新闻来源类型
export type NewsSource = 'international' | 'domestic';

// 排序类型
export type SortType = 'hot' | 'time' | 'weight';

// 评论排序类型
export type CommentSortType = 'most-agreed' | 'newest' | 'most-replies';

// 新闻来源
export interface NewsSourceInfo {
  id: string;
  name: string;
  type: NewsSource;
  logo?: string;
}

// 分析师
export interface Analyst {
  id: string;
  name: string;
  avatar: string;
  stance: PoliticalStance;
  title: string;
  description: string;
}

// 分析师评论
export interface AnalystComment {
  id: string;
  analystId: string;
  analyst: Analyst;
  content: string;
  likes: number;
  createdAt: string;
}

// 用户评论
export interface UserComment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  replies: UserComment[];
  createdAt: string;
}

// 新闻项
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: NewsSourceInfo;
  publishedAt: string;
  weight: number;
  weightBreakdown: {
    timeliness: number;
    importance: number;
    spread: number;
  };
  tags: string[];
  analystComments: AnalystComment[];
  userComments: UserComment[];
  userCommentCount: number;
  isNew?: boolean;
}

// 筛选状态
export interface FilterState {
  source: 'all' | NewsSource;
  timeRange: '24h' | 'week' | 'month';
  sort: SortType;
}

// 话题
export interface Topic {
  id: string;
  name: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

// 分析师排行
export interface AnalystRanking {
  analyst: Analyst;
  commentCount: number;
  likesReceived: number;
}

// 权重计算参数
export interface WeightParams {
  baseWeight: number;
  timeDecay: number;
  clickCount: number;
  shareCount: number;
  commentCount: number;
}
