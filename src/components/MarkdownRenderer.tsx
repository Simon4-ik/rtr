import React from 'react';

interface MarkdownProps {
  content: string;
  className?: string;
  isLecture?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({ content, className = '', isLecture = false }) => {
  // Simple, robust zero-dependency parser for headings, lists, bold, tables, blockquotes, code
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let listItems: string[] = [];
  let isNumberedList = false;

  const flushList = (keyPrefix: number) => {
    if (listItems.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${keyPrefix}`} className={`my-2 space-y-1 list-decimal list-inside ${isLecture ? 'pl-4' : 'pl-5'}`}>
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className={`my-2 space-y-1 list-disc list-inside ${isLecture ? 'pl-4' : 'pl-5'}`}>
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }
      listItems = [];
    }
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-brand-700 dark:text-brand-300 font-mono text-xs">$1</code>');
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(idx);
      return;
    }

    // Horizontal rule
    if (trimmed === '---') {
      flushList(idx);
      elements.push(<hr key={idx} className="my-4 border-slate-300 dark:border-slate-700" />);
      return;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      flushList(idx);
      elements.push(
        <h1 key={idx} className={`${isLecture ? 'text-[18pt] font-bold text-center mb-4 uppercase' : 'text-2xl font-bold mb-3 text-slate-900 dark:text-white'}`}>
          {trimmed.replace('# ', '')}
        </h1>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList(idx);
      elements.push(
        <h2 key={idx} className={`${isLecture ? 'text-[15pt] font-bold mt-4 mb-2' : 'text-xl font-bold mt-5 mb-2 text-slate-900 dark:text-white'}`}>
          {trimmed.replace('## ', '')}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList(idx);
      elements.push(
        <h3 key={idx} className={`${isLecture ? 'text-[14pt] font-semibold mt-3 mb-1' : 'text-lg font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-100'}`}>
          {trimmed.replace('### ', '')}
        </h3>
      );
      return;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList(idx);
      elements.push(
        <div key={idx} className="my-3 rounded-lg border-l-4 border-brand-500 bg-brand-50/50 p-3 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
          <p dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace('> ', '')) }} />
        </div>
      );
      return;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (isNumberedList && listItems.length > 0) flushList(idx);
      isNumberedList = false;
      listItems.push(trimmed.substring(2));
      return;
    }

    // Numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!isNumberedList && listItems.length > 0) flushList(idx);
      isNumberedList = true;
      listItems.push(numMatch[2]);
      return;
    }

    // Regular paragraph
    flushList(idx);
    elements.push(
      <p
        key={idx}
        className={`${isLecture ? 'my-2 text-justify indent-6' : 'my-2 leading-relaxed'}`}
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  });

  flushList(lines.length);

  return <div className={className}>{elements}</div>;
};

