import { useCallback, useEffect, useState } from 'react';
import { NOTICE_DURATION_MS } from '../utils/constants';
import type { NoticeData } from '../utils/types';

export const useNotice = () => {
  const [notice, setNotice] = useState<NoticeData | null>(null);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), NOTICE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const showNotice = useCallback((text: string, isError = false) => {
    setNotice({ text, isError });
  }, []);

  return { notice, showNotice };
};
