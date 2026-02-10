import type { Analyst, PoliticalStance } from '@/types';
import { getStanceColor, getStanceName } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PoliticalSpectrumProps {
  analysts: Analyst[];
  activeStance?: PoliticalStance | null;
  onStanceClick?: (stance: PoliticalStance | null) => void;
  showLabels?: boolean;
  compact?: boolean;
}

const stanceOrder: PoliticalStance[] = [
  'far-left',
  'left',
  'center-left',
  'center',
  'center-right',
  'right',
  'far-right',
];

export function PoliticalSpectrum({
  analysts,
  activeStance = null,
  onStanceClick,
  showLabels = true,
  compact = false,
}: PoliticalSpectrumProps) {
  // 计算每个立场的分析师数量
  const stanceCount = analysts.reduce((acc, analyst) => {
    acc[analyst.stance] = (acc[analyst.stance] || 0) + 1;
    return acc;
  }, {} as Record<PoliticalStance, number>);

  // 检查每个立场是否有分析师
  const hasAnalystInStance = (stance: PoliticalStance) => 
    analysts.some((a) => a.stance === stance);

  return (
    <div className={cn('w-full', compact ? 'py-2' : 'py-4')}>
      {/* Spectrum Bar */}
      <div className="relative">
        {/* Gradient Bar */}
        <div
          className={cn(
            'w-full rounded-full relative overflow-hidden',
            compact ? 'h-2' : 'h-3'
          )}
          style={{
            background: `linear-gradient(to right, 
              ${getStanceColor('far-left')} 0%, 
              ${getStanceColor('left')} 16.6%, 
              ${getStanceColor('center-left')} 33.3%, 
              ${getStanceColor('center')} 50%, 
              ${getStanceColor('center-right')} 66.6%, 
              ${getStanceColor('right')} 83.3%, 
              ${getStanceColor('far-right')} 100%
            )`,
          }}
        >
          {/* Active indicator */}
          {activeStance && (
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300"
              style={{
                left: `${(stanceOrder.indexOf(activeStance) / 6) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            />
          )}
        </div>

        {/* Stance Markers */}
        <div className="flex justify-between mt-2">
          {stanceOrder.map((stance, index) => {
            const hasAnalyst = hasAnalystInStance(stance);
            const isActive = activeStance === stance;
            const count = stanceCount[stance] || 0;

            return (
              <button
                key={stance}
                onClick={() => onStanceClick?.(isActive ? null : stance)}
                disabled={!hasAnalyst}
                className={cn(
                  'flex flex-col items-center gap-1 transition-all duration-200',
                  !hasAnalyst && 'opacity-30 cursor-not-allowed',
                  hasAnalyst && 'cursor-pointer hover:opacity-80'
                )}
                style={{
                  position: 'absolute',
                  left: `${(index / 6) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Dot */}
                <div
                  className={cn(
                    'rounded-full border-2 border-black transition-all duration-200',
                    compact ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5',
                    isActive && 'ring-2 ring-white scale-125',
                    !hasAnalyst && 'bg-[#3d3d3d]'
                  )}
                  style={{
                    backgroundColor: hasAnalyst ? getStanceColor(stance) : '#3d3d3d',
                  }}
                />

                {/* Label */}
                {showLabels && !compact && (
                  <span
                    className={cn(
                      'text-xs whitespace-nowrap transition-colors duration-200',
                      isActive ? 'text-white font-medium' : 'text-[#a1a1a1]'
                    )}
                  >
                    {getStanceName(stance)}
                    {count > 0 && (
                      <span className="ml-1 text-[#666]">({count})</span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend (compact mode) */}
      {compact && (
        <div className="flex justify-center gap-4 mt-4">
          {stanceOrder.map((stance) => {
            const hasAnalyst = hasAnalystInStance(stance);
            if (!hasAnalyst) return null;

            return (
              <button
                key={stance}
                onClick={() => onStanceClick?.(activeStance === stance ? null : stance)}
                className={cn(
                  'flex items-center gap-1.5 text-xs transition-all duration-200',
                  activeStance === stance
                    ? 'text-white'
                    : 'text-[#a1a1a1] hover:text-[#e2e2e2]'
                )}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStanceColor(stance) }}
                />
                {getStanceName(stance)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
