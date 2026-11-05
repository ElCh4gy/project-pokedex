import type { NoticeData } from '../utils/types';
import '../styles/notice.css';

interface NoticeProps {
  notice: NoticeData;
}

function Notice({ notice }: NoticeProps) {
  return (
    <p
      className={`notice ${notice.isError ? 'notice_type_error' : ''}`}
      role={notice.isError ? 'alert' : 'status'}
    >
      {notice.text}
    </p>
  );
}

export default Notice;
