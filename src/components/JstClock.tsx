import React, { useState, useEffect, useMemo } from 'react';

export const JstClock = React.memo(function JstClock() {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') setTime(new Date());
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const { displayTime, isoString } = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return { displayTime: formatter.format(time), isoString: time.toISOString() };
  }, [time]);

  return (
    <time
      dateTime={isoString}
      aria-label={`現在時刻（日本標準時）: ${displayTime}`}
      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 select-none"
    >
      <span aria-hidden="true" className="text-xs font-medium text-slate-400 dark:text-slate-500">
        JST
      </span>
      <span className="text-sm font-mono font-semibold tabular-nums text-slate-700 dark:text-slate-200">
        {displayTime}
      </span>
    </time>
  );
});
