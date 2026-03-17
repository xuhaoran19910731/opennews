/**
 * 翻译模块
 * 将非中文文章的标题和摘要翻译为中文
 * 使用 @vitalets/google-translate-api（免费、无需 API Key）
 */

import { translate } from '@vitalets/google-translate-api';

// ─────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * 判断文本是否为中文（中文字符占比 > 30%）
 * @param {string} text
 * @returns {boolean}
 */
export function isChinese(text) {
  if (!text) return false;
  const stripped = text.replace(/\s+/g, '');
  if (stripped.length === 0) return false;
  const chineseChars = stripped.match(/[\u4e00-\u9fff]/g);
  return chineseChars ? chineseChars.length / stripped.length > 0.3 : false;
}

/**
 * 翻译单段文本为中文
 * @param {string} text
 * @param {string} [fromLang='auto']
 * @returns {Promise<{text: string|null, rateLimited: boolean}>}
 */
async function translateText(text, fromLang = 'auto') {
  if (!text || text.trim().length === 0) return { text, rateLimited: false };

  try {
    const result = await translate(text, { from: fromLang, to: 'zh-CN' });
    return { text: result.text, rateLimited: false };
  } catch (err) {
    const isRateLimit = err.message?.includes('429') || err.message?.includes('Too Many Requests');
    if (isRateLimit) {
      console.warn('   ⏳ 触发限流，等待 30 秒后重试...');
      await sleep(30000);
      try {
        const retry = await translate(text, { from: fromLang, to: 'zh-CN' });
        return { text: retry.text, rateLimited: false };
      } catch (retryErr) {
        const stillLimited = retryErr.message?.includes('429') || retryErr.message?.includes('Too Many Requests');
        console.warn('   ❌ 重试失败:', retryErr.message);
        return { text: null, rateLimited: stillLimited };
      }
    }
    console.warn('   ❌ 翻译失败:', err.message);
    return { text: null, rateLimited: false };
  }
}

// ─────────────────────────────────────────
// 主函数：批量翻译文章
// ─────────────────────────────────────────

const DELIMITER = '|||';
const BASE_DELAY_MS = 3000;

/**
 * 批量翻译文章数组中的非中文文章
 * 直接修改传入的 articles 数组（in-place）
 *
 * @param {Array} articles
 * @returns {Promise<{translated: number, skipped: number, failed: number}>}
 */
export async function translateArticles(articles) {
  let translated = 0;
  let skipped = 0;
  let failed = 0;
  let consecutiveRateLimits = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const combinedText = `${article.title || ''} ${article.summary || ''}`;

    // 已经是中文，跳过
    if (isChinese(combinedText)) {
      article.translated = false;
      skipped++;
      continue;
    }

    // 连续限流 3 次，放弃剩余翻译
    if (consecutiveRateLimits >= 3) {
      article.translated = false;
      failed++;
      continue;
    }

    const preview = (article.title || '').slice(0, 30);
    console.log(`   翻译中 [${i + 1}/${articles.length}]: ${preview}...`);

    try {
      // 合并标题和摘要为一次 API 调用
      const merged = `${article.title || ''}${DELIMITER}${article.summary || ''}`;
      const result = await translateText(merged);

      if (result.rateLimited) {
        consecutiveRateLimits++;
        article.translated = false;
        failed++;
      } else if (result.text) {
        consecutiveRateLimits = 0;
        const parts = result.text.split(DELIMITER);
        const translatedTitle = (parts[0] || '').trim();
        const translatedSummary = (parts.slice(1).join(DELIMITER) || '').trim();

        // 保存原文
        article.originalTitle = article.title;
        article.originalSummary = article.summary;

        // 替换为译文
        article.title = translatedTitle || article.title;
        article.summary = translatedSummary || article.summary;
        article.translated = true;
        article.sourceLanguage = article.source?.language || 'unknown';
        translated++;
      } else {
        article.translated = false;
        failed++;
      }
    } catch (err) {
      console.warn(`   ❌ 文章翻译异常 [${i + 1}]: ${err.message}`);
      article.translated = false;
      failed++;
    }

    // 速率控制
    if (i < articles.length - 1) {
      await sleep(BASE_DELAY_MS);
    }
  }

  if (consecutiveRateLimits >= 3) {
    console.warn(`   ⚠️ 因连续限流，部分文章未能翻译`);
  }
  console.log(`   ✅ 翻译完成: ${translated} 篇翻译, ${skipped} 篇跳过(已是中文), ${failed} 篇失败`);
  return { translated, skipped, failed };
}

export default translateArticles;
