import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Share2, TrendingUp } from 'lucide-react';
import type { NewsItem, CommentSortType, UserComment } from '@/types';
import { formatTimeAgo, cn, generateId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PoliticalSpectrum } from './PoliticalSpectrum';
import { AnalystCommentCard } from './AnalystCommentCard';
import { UserCommentCard } from './UserCommentCard';

interface NewsCardProps {
  news: NewsItem;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function NewsCard({ news, isExpanded = false, onToggleExpand }: NewsCardProps) {
  const [commentSort, setCommentSort] = useState<CommentSortType>('most-agreed');
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<UserComment[]>(news.userComments);
  const [activeStanceFilter, setActiveStanceFilter] = useState<any>(null);

  // 过滤分析师评论
  const filteredAnalystComments = activeStanceFilter
    ? news.analystComments.filter((c) => c.analyst.stance === activeStanceFilter)
    : news.analystComments;

  // 排序用户评论
  const sortedComments = [...localComments].sort((a, b) => {
    switch (commentSort) {
      case 'most-agreed':
        return b.likes - a.likes;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'most-replies':
        return b.replies.length - a.replies.length;
      default:
        return 0;
    }
  });

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment: UserComment = {
      id: generateId(),
      userId: 'current-user',
      username: '当前用户',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content: commentText,
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString(),
    };

    setLocalComments([newComment, ...localComments]);
    setCommentText('');
  };

  return (
    <div
      className={cn(
        'bg-[#1d1d1d] rounded-xl border border-[#3d3d3d] overflow-hidden transition-all duration-300',
        'hover:border-[#4d4d4d] hover:shadow-lg',
        isExpanded && 'ring-1 ring-[#3b82f6]/30'
      )}
    >
      {/* Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {/* Source Badge */}
              <Badge
                variant="outline"
                className={cn(
                  'text-xs border-[#3d3d3d]',
                  news.source.type === 'international'
                    ? 'text-blue-400'
                    : 'text-cyan-400'
                )}
              >
                {news.source.type === 'international' ? '国际' : '国内'}
              </Badge>

              {/* Source Name */}
              <span className="text-[#a1a1a1] text-sm">{news.source.name}</span>

              <span className="text-[#666]">·</span>

              {/* Time */}
              <span className="text-[#a1a1a1] text-sm">
                {formatTimeAgo(news.publishedAt)}
              </span>

              {/* New Indicator */}
              {news.isNew && (
                <Badge className="bg-green-500/20 text-green-400 text-xs animate-pulse">
                  新
                </Badge>
              )}

              {/* Weight Score */}
              <div className="flex items-center gap-1 ml-auto">
                <TrendingUp className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="text-[#3b82f6] font-medium text-sm">
                  {news.weight.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl font-semibold text-white leading-snug mb-2 cursor-pointer hover:text-[#3b82f6] transition-colors"
              onClick={onToggleExpand}
            >
              {news.title}
            </h3>

            {/* Summary */}
            <p className="text-[#a1a1a1] text-sm leading-relaxed line-clamp-3">
              {news.summary}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-[#2d2d2d] text-[#a1a1a1] hover:bg-[#3d3d3d] hover:text-[#e2e2e2] cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2d2d2d]">
          <div className="flex items-center gap-4">
            {/* Analyst Comments Count */}
            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a1]">
              <div className="flex -space-x-2">
                {news.analystComments.slice(0, 3).map((comment, idx) => (
                  <img
                    key={comment.id}
                    src={comment.analyst.avatar}
                    alt={comment.analyst.name}
                    className="w-5 h-5 rounded-full border-2 border-[#1d1d1d]"
                    style={{ zIndex: 3 - idx }}
                  />
                ))}
              </div>
              <span>{news.analystComments.length} 位分析师评论</span>
            </div>

            {/* User Comments Count */}
            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a1]">
              <MessageSquare className="w-4 h-4" />
              <span>{news.userCommentCount + localComments.length} 条讨论</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-[#a1a1a1] hover:text-white hover:bg-[#2d2d2d]"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              分享
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="h-8 px-3 text-[#3b82f6] hover:text-blue-400 hover:bg-blue-500/10"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1.5" />
                  收起
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1.5" />
                  展开
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#3d3d3d] animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Analyst Comments Section */}
          <div className="p-4 sm:p-6 bg-[#161616]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-red-500 via-purple-500 to-cyan-500 rounded-full" />
                分析师观点
              </h4>
              <span className="text-[#a1a1a1] text-sm">
                {filteredAnalystComments.length} 条评论
              </span>
            </div>

            {/* Political Spectrum */}
            <div className="mb-4">
              <PoliticalSpectrum
                analysts={news.analystComments.map((c) => c.analyst)}
                activeStance={activeStanceFilter}
                onStanceClick={setActiveStanceFilter}
                compact
              />
            </div>

            {/* Analyst Comments List */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin scrollbar-thumb-[#3d3d3d] scrollbar-track-transparent">
              {filteredAnalystComments.map((comment) => (
                <AnalystCommentCard
                  key={comment.id}
                  comment={comment}
                  isCompact
                />
              ))}
            </div>
          </div>

          {/* User Comments Section */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">读者讨论</h4>
              <Tabs
                value={commentSort}
                onValueChange={(v) => setCommentSort(v as CommentSortType)}
                className="w-auto"
              >
                <TabsList className="bg-[#2d2d2d] h-8">
                  <TabsTrigger
                    value="most-agreed"
                    className="text-xs data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
                  >
                    最多认同
                  </TabsTrigger>
                  <TabsTrigger
                    value="newest"
                    className="text-xs data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
                  >
                    最新
                  </TabsTrigger>
                  <TabsTrigger
                    value="most-replies"
                    className="text-xs data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
                  >
                    最多回复
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Comment Input */}
            <div className="mb-6">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="分享你的观点..."
                className="min-h-[100px] bg-[#2d2d2d] border-[#3d3d3d] text-white placeholder:text-[#666] focus:border-[#3b82f6] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="bg-[#3b82f6] hover:bg-blue-600 text-white disabled:opacity-50"
                >
                  发表评论
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {sortedComments.length > 0 ? (
                sortedComments.map((comment) => (
                  <UserCommentCard key={comment.id} comment={comment} />
                ))
              ) : (
                <div className="text-center py-8 text-[#a1a1a1]">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>暂无评论，来发表第一条观点吧</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
