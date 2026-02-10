import { Filter, Clock, TrendingUp, Scale, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { FilterState } from '@/types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
}

const sourceOptions = [
  { value: 'all', label: '全部来源' },
  { value: 'international', label: '国际' },
  { value: 'domestic', label: '国内' },
] as const;

const timeOptions = [
  { value: '24h', label: '24小时' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
] as const;

const sortOptions = [
  { value: 'hot', label: '热度', icon: TrendingUp },
  { value: 'time', label: '时间', icon: Clock },
  { value: 'weight', label: '权重', icon: Scale },
] as const;

export function FilterBar({ filters, onFilterChange, totalCount }: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-[#1d1d1d] border-b border-[#3d3d3d]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Filters */}
          <div className="flex items-center gap-2">
            {/* Source Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-transparent border-[#3d3d3d] text-[#e2e2e2] hover:bg-[#2d2d2d] hover:text-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {sourceOptions.find((o) => o.value === filters.source)?.label}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1d1d1d] border-[#3d3d3d]">
                {sourceOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className={cn(
                      'text-[#e2e2e2] hover:text-white hover:bg-[#2d2d2d] cursor-pointer',
                      filters.source === option.value && 'bg-[#2d2d2d] text-white'
                    )}
                    onClick={() =>
                      onFilterChange({ ...filters, source: option.value as any })
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Time Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-transparent border-[#3d3d3d] text-[#e2e2e2] hover:bg-[#2d2d2d] hover:text-white"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {timeOptions.find((o) => o.value === filters.timeRange)?.label}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1d1d1d] border-[#3d3d3d]">
                {timeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className={cn(
                      'text-[#e2e2e2] hover:text-white hover:bg-[#2d2d2d] cursor-pointer',
                      filters.timeRange === option.value && 'bg-[#2d2d2d] text-white'
                    )}
                    onClick={() =>
                      onFilterChange({ ...filters, timeRange: option.value as any })
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Options */}
            <div className="flex items-center bg-[#2d2d2d] rounded-lg p-1">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      onFilterChange({ ...filters, sort: option.value as any })
                    }
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                      filters.sort === option.value
                        ? 'bg-[#3b82f6] text-white'
                        : 'text-[#a1a1a1] hover:text-[#e2e2e2]'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Count & Real-time Indicator */}
          <div className="flex items-center gap-3">
            {/* Real-time indicator */}
            <div className="flex items-center gap-2 text-xs text-[#a1a1a1]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              实时更新中
            </div>

            {/* Total count */}
            <span className="text-sm text-[#a1a1a1]">
              共 <span className="text-white font-medium">{totalCount}</span> 条资讯
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
