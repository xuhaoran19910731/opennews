import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PoliticalStance, WeightParams, NewsItem, CommentSortType, UserComment } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化时间显示
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '刚刚';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}年前`;
}

// 计算新闻权重
export function calculateWeight(params: WeightParams): number {
  const { baseWeight, timeDecay, clickCount, shareCount, commentCount } = params;
  
  // 时效性权重 (随时间衰减)
  const timelinessWeight = baseWeight * timeDecay;
  
  // 互动权重
  const engagementWeight = (
    clickCount * 0.5 + 
    shareCount * 2 + 
    commentCount * 3
  ) / 100;
  
  // 综合权重 (0-100)
  const totalWeight = Math.min(100, timelinessWeight + engagementWeight);
  
  return Math.round(totalWeight * 10) / 10;
}

// 计算时间衰减因子 (24小时内为1，之后逐渐衰减)
export function calculateTimeDecay(publishedAt: string): number {
  const published = new Date(publishedAt);
  const now = new Date();
  const diffInHours = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours <= 24) {
    return 1;
  } else if (diffInHours <= 72) {
    return 0.8;
  } else if (diffInHours <= 168) {
    return 0.6;
  } else if (diffInHours <= 720) {
    return 0.4;
  } else {
    return 0.2;
  }
}

// 立场颜色映射
export function getStanceColor(stance: PoliticalStance): string {
  const colors: Record<PoliticalStance, string> = {
    'far-right': '#dc2626',
    'right': '#ef4444',
    'center-right': '#f97316',
    'center': '#8b5cf6',
    'center-left': '#3b82f6',
    'left': '#0ea5e9',
    'far-left': '#06b6d4'
  };
  return colors[stance];
}

// 立场中文名称
export function getStanceName(stance: PoliticalStance): string {
  const names: Record<PoliticalStance, string> = {
    'far-right': '极右',
    'right': '右',
    'center-right': '中右',
    'center': '中',
    'center-left': '中左',
    'left': '左',
    'far-left': '极左'
  };
  return names[stance];
}

// 立场排序 (从左到右)
export function sortByStance(stances: PoliticalStance[]): PoliticalStance[] {
  const order: PoliticalStance[] = ['far-left', 'left', 'center-left', 'center', 'center-right', 'right', 'far-right'];
  return stances.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// 排序新闻列表
export function sortNews(news: NewsItem[], sortType: 'hot' | 'time' | 'weight'): NewsItem[] {
  const sorted = [...news];
  
  switch (sortType) {
    case 'hot':
      return sorted.sort((a, b) => {
        const hotA = a.weight * 0.6 + a.userCommentCount * 0.4;
        const hotB = b.weight * 0.6 + b.userCommentCount * 0.4;
        return hotB - hotA;
      });
    case 'time':
      return sorted.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'weight':
      return sorted.sort((a, b) => b.weight - a.weight);
    default:
      return sorted;
  }
}

// 排序评论
export function sortComments(comments: UserComment[], sortType: CommentSortType): UserComment[] {
  const sorted = [...comments];
  
  switch (sortType) {
    case 'most-agreed':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'most-replies':
      return sorted.sort((a, b) => b.replies.length - a.replies.length);
    default:
      return sorted;
  }
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
