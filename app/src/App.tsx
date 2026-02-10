import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './sections/Navbar';
import { FilterBar } from './sections/FilterBar';
import { Sidebar } from './sections/Sidebar';
import { NewsCard } from './components/NewsCard';
import { mockNews } from './data/mockData';
import type { FilterState, NewsItem } from './types';
import { sortNews, calculateWeight, calculateTimeDecay } from './lib/utils';
import { Loader2 } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState>({
    source: 'all',
    timeRange: '24h',
    sort: 'weight',
  });
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>(mockNews);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 过滤和排序新闻
  const filteredNews = useMemo(() => {
    let result = [...newsList];

    // 按来源筛选
    if (filters.source !== 'all') {
      result = result.filter((news) => news.source.type === filters.source);
    }

    // 按时间筛选
    const now = new Date();
    result = result.filter((news) => {
      const newsDate = new Date(news.publishedAt);
      const diffInHours = (now.getTime() - newsDate.getTime()) / (1000 * 60 * 60);

      switch (filters.timeRange) {
        case '24h':
          return diffInHours <= 24;
        case 'week':
          return diffInHours <= 168;
        case 'month':
          return diffInHours <= 720;
        default:
          return true;
      }
    });

    // 排序
    result = sortNews(result, filters.sort);

    return result;
  }, [newsList, filters]);

  // 模拟加载更多
  const loadMore = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      // 模拟加载更多数据
      setHasMore(false);
      setIsLoading(false);
    }, 1500);
  };

  // 无限滚动
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  // 模拟实时更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 随机更新某条新闻的权重
      setNewsList((prev) => {
        const index = Math.floor(Math.random() * prev.length);
        const news = prev[index];
        const timeDecay = calculateTimeDecay(news.publishedAt);
        const newWeight = calculateWeight({
          baseWeight: 80,
          timeDecay,
          clickCount: Math.floor(Math.random() * 1000),
          shareCount: Math.floor(Math.random() * 100),
          commentCount: news.userCommentCount,
        });

        const updated = [...prev];
        updated[index] = { ...news, weight: newWeight };
        return updated;
      });
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  const handleToggleExpand = (newsId: string) => {
    setExpandedNewsId(expandedNewsId === newsId ? null : newsId);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Filter Bar */}
      <div className="pt-16">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalCount={filteredNews.length}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* News Feed */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {filteredNews.map((news, index) => (
                <div
                  key={news.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <NewsCard
                    news={news}
                    isExpanded={expandedNewsId === news.id}
                    onToggleExpand={() => handleToggleExpand(news.id)}
                  />
                </div>
              ))}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin" />
                <span className="ml-3 text-[#a1a1a1]">加载更多...</span>
              </div>
            )}

            {/* No More */}
            {!hasMore && !isLoading && filteredNews.length > 0 && (
              <div className="text-center py-8 text-[#666]">
                已加载全部内容
              </div>
            )}

            {/* Empty State */}
            {filteredNews.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#1d1d1d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📭</span>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  暂无相关资讯
                </h3>
                <p className="text-[#a1a1a1]">
                  尝试调整筛选条件或稍后再来
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-36">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1d1d1d] border-t border-[#3d3d3d] mt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h4 className="text-white font-semibold mb-4">关于我们</h4>
              <p className="text-[#a1a1a1] text-sm leading-relaxed">
                InsightHub 是一个专业的信息分析平台，通过聚合全球重要资讯和多维度分析师视角，帮助用户全面了解事件背后的不同立场。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    使用条款
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    隐私政策
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    联系我们
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    加入我们
                  </a>
                </li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h4 className="text-white font-semibold mb-4">订阅更新</h4>
              <p className="text-[#a1a1a1] text-sm mb-4">
                获取每日重要资讯和分析报告
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  className="flex-1 h-10 px-4 rounded-lg bg-[#2d2d2d] border border-[#3d3d3d] text-white placeholder:text-[#666] focus:border-[#3b82f6] focus:outline-none text-sm"
                />
                <button className="h-10 px-4 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                  订阅
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#3d3d3d] mt-8 pt-8 text-center text-sm text-[#666]">
            <p>© 2024 InsightHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
