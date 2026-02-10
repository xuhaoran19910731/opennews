import { TrendingUp, MessageSquare, Globe, Newspaper } from 'lucide-react';
import { hotTopics, analystRankings, sourceDistribution } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Hot Topics */}
      <div className="bg-[#1d1d1d] rounded-xl border border-[#3d3d3d] p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
          <h3 className="text-white font-semibold">热门话题</h3>
        </div>

        <div className="space-y-3">
          {hotTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d2d] cursor-pointer transition-colors group"
            >
              <span
                className={`
                  w-6 h-6 rounded flex items-center justify-center text-sm font-bold
                  ${index === 0 ? 'bg-red-500/20 text-red-400' : ''}
                  ${index === 1 ? 'bg-orange-500/20 text-orange-400' : ''}
                  ${index === 2 ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${index > 2 ? 'bg-[#2d2d2d] text-[#a1a1a1]' : ''}
                `}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[#e2e2e2] text-sm truncate group-hover:text-white transition-colors">
                  {topic.name}
                </p>
                <p className="text-[#666] text-xs">
                  {formatNumber(topic.count)} 讨论
                </p>
              </div>
              {topic.trend === 'up' && (
                <TrendingUp className="w-4 h-4 text-green-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Analysts */}
      <div className="bg-[#1d1d1d] rounded-xl border border-[#3d3d3d] p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#8b5cf6]" />
          <h3 className="text-white font-semibold">本周活跃分析师</h3>
        </div>

        <div className="space-y-3">
          {analystRankings.map((ranking) => (
            <div
              key={ranking.analyst.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d2d] cursor-pointer transition-colors"
            >
              <img
                src={ranking.analyst.avatar}
                alt={ranking.analyst.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {ranking.analyst.name}
                </p>
                <p className="text-[#a1a1a1] text-xs">
                  {ranking.commentCount} 条评论 · {formatNumber(ranking.likesReceived)} 赞同
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Source Distribution */}
      <div className="bg-[#1d1d1d] rounded-xl border border-[#3d3d3d] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-[#0ea5e9]" />
          <h3 className="text-white font-semibold">信息来源分布</h3>
        </div>

        <div className="space-y-3">
          {sourceDistribution.map((source) => (
            <div key={source.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#e2e2e2]">{source.name}</span>
                <span className="text-[#a1a1a1]">{source.value}%</span>
              </div>
              <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${source.value}%`,
                    backgroundColor: source.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#2d2d2d] flex items-center gap-2 text-sm text-[#a1a1a1]">
          <Newspaper className="w-4 h-4" />
          <span>每日更新 200+ 条资讯</span>
        </div>
      </div>

      {/* About */}
      <div className="bg-gradient-to-br from-[#1d1d1d] to-[#2d2d2d] rounded-xl border border-[#3d3d3d] p-5">
        <h3 className="text-white font-semibold mb-2">关于 InsightHub</h3>
        <p className="text-[#a1a1a1] text-sm leading-relaxed">
          我们聚合全球重要资讯，通过多维度分析师视角，帮助您全面了解事件背后的不同立场和观点。
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-[#666]">
          <span>7 位分析师</span>
          <span>·</span>
          <span>多光谱视角</span>
          <span>·</span>
          <span>实时更新</span>
        </div>
      </div>
    </aside>
  );
}
