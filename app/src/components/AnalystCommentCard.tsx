import { useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import type { AnalystComment } from '@/types';
import { getStanceColor, getStanceName, formatTimeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AnalystCommentCardProps {
  comment: AnalystComment;
  isCompact?: boolean;
}

export function AnalystCommentCard({ comment, isCompact = false }: AnalystCommentCardProps) {
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const stanceColor = getStanceColor(comment.analyst.stance);

  if (isCompact) {
    return (
      <div className="bg-[#2d2d2d] rounded-lg p-3 min-w-[240px] max-w-[280px] flex-shrink-0 hover:bg-[#3d3d3d] transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={comment.analyst.avatar}
            alt={comment.analyst.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-medium truncate">
                {comment.analyst.name}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  backgroundColor: `${stanceColor}20`,
                  color: stanceColor,
                }}
              >
                {getStanceName(comment.analyst.stance)}
              </span>
            </div>
            <span className="text-[#666] text-xs">{formatTimeAgo(comment.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <p className="text-[#e2e2e2] text-sm line-clamp-3 mb-2">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center gap-1 text-xs transition-colors duration-200',
              isLiked ? 'text-blue-500' : 'text-[#a1a1a1] hover:text-[#e2e2e2]'
            )}
          >
            <ThumbsUp className={cn('w-3.5 h-3.5', isLiked && 'fill-current')} />
            {likes}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2d2d2d] rounded-xl p-4 hover:bg-[#3d3d3d] transition-all duration-200 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={comment.analyst.avatar}
          alt={comment.analyst.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-medium">{comment.analyst.name}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${stanceColor}20`,
                color: stanceColor,
              }}
            >
              {getStanceName(comment.analyst.stance)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#a1a1a1]">
            <span>{comment.analyst.title}</span>
            <span>·</span>
            <span>{formatTimeAgo(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-[#e2e2e2] text-sm leading-relaxed mb-4">
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={cn(
            'h-8 px-3 text-xs gap-1.5',
            isLiked
              ? 'text-blue-500 hover:text-blue-400 hover:bg-blue-500/10'
              : 'text-[#a1a1a1] hover:text-[#e2e2e2] hover:bg-[#4d4d4d]'
          )}
        >
          <ThumbsUp className={cn('w-4 h-4', isLiked && 'fill-current')} />
          {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs gap-1.5 text-[#a1a1a1] hover:text-[#e2e2e2] hover:bg-[#4d4d4d]"
        >
          <MessageCircle className="w-4 h-4" />
          回复
        </Button>
      </div>
    </div>
  );
}
