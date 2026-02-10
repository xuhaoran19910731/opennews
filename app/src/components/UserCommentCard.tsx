import { useState } from 'react';
import { ThumbsUp, MessageCircle, MoreHorizontal, CornerDownRight } from 'lucide-react';
import type { UserComment } from '@/types';
import { formatTimeAgo, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface UserCommentCardProps {
  comment: UserComment;
  isReply?: boolean;
  onReply?: (content: string) => void;
}

export function UserCommentCard({ comment, isReply = false, onReply }: UserCommentCardProps) {
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div className={cn('flex gap-3', isReply && 'ml-12')}>
      {/* Avatar */}
      <img
        src={comment.avatar}
        alt={comment.username}
        className="w-10 h-10 rounded-full shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-medium text-sm">{comment.username}</span>
          <span className="text-[#666] text-xs">{formatTimeAgo(comment.createdAt)}</span>
        </div>

        {/* Comment Text */}
        <p className="text-[#e2e2e2] text-sm leading-relaxed mb-2">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors duration-200',
              isLiked
                ? 'text-blue-500 bg-blue-500/10'
                : 'text-[#a1a1a1] hover:text-[#e2e2e2] hover:bg-[#2d2d2d]'
            )}
          >
            <ThumbsUp className={cn('w-3.5 h-3.5', isLiked && 'fill-current')} />
            {likes}
          </button>

          {!isReply && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded text-[#a1a1a1] hover:text-[#e2e2e2] hover:bg-[#2d2d2d] transition-colors duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              回复
            </button>
          )}

          <button className="flex items-center gap-1 text-xs px-2 py-1 rounded text-[#a1a1a1] hover:text-[#e2e2e2] hover:bg-[#2d2d2d] transition-colors duration-200">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reply Input */}
        {isReplying && (
          <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder={`回复 ${comment.username}...`}
              className="min-h-[80px] bg-[#2d2d2d] border-[#3d3d3d] text-white placeholder:text-[#666] focus:border-[#3b82f6] resize-none text-sm"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(false)}
                className="h-8 text-xs text-[#a1a1a1] hover:text-white"
              >
                取消
              </Button>
              <Button
                size="sm"
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="h-8 text-xs bg-[#3b82f6] hover:bg-blue-600 text-white disabled:opacity-50"
              >
                回复
              </Button>
            </div>
          </div>
        )}

        {/* Replies */}
        {!isReply && comment.replies.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-xs text-[#3b82f6] hover:text-blue-400 transition-colors"
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              {showReplies ? '收起回复' : `查看 ${comment.replies.length} 条回复`}
            </button>

            {showReplies && (
              <div className="mt-3 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {comment.replies.map((reply) => (
                  <UserCommentCard
                    key={reply.id}
                    comment={reply}
                    isReply={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
