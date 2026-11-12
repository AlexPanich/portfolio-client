import { LoaderCircle, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

/** After this delay the request is most likely a Render cold start. */
const COLD_START_HINT_MS = 2500;

export function LoadingState() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), COLD_START_HINT_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <output
      aria-busy="true"
      className="flex flex-col gap-6 px-5 py-24 md:px-16 md:py-32"
    >
      <span className="caption text-accent">Загрузка</span>
      <div className="h-14 w-full max-w-[420px] animate-pulse rounded bg-surface-muted" />
      <div className="h-14 w-4/5 max-w-[320px] animate-pulse rounded bg-surface-muted" />
      {[520, 480, 360].map((w) => (
        <div
          key={w}
          className="h-3.5 animate-pulse rounded bg-surface-muted"
          style={{ maxWidth: w }}
        />
      ))}
      <p className="flex items-center gap-2.5 pt-3 text-sm text-fg-secondary">
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        {slow
          ? 'Сервер на бесплатном тарифе просыпается — это занимает до минуты'
          : 'Загружаем данные из GraphQL API…'}
      </p>
    </output>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-6 px-5 py-24 md:px-16 md:py-32"
    >
      <span className="caption text-danger">Ошибка</span>
      <h1 className="font-heading text-4xl font-semibold tracking-[-0.02em]">
        Не удалось загрузить данные
      </h1>
      <p className="max-w-[520px] leading-[1.55] text-fg-secondary">
        API не ответил. Проверьте соединение или попробуйте ещё раз — запрос
        уйдёт заново.
      </p>
      <code className="font-mono text-xs text-fg-muted">{message}</code>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex cursor-pointer items-center gap-2 rounded-ds bg-fg px-5 py-3.5 text-[15px] font-medium text-fg-inverse transition-opacity hover:opacity-85"
      >
        <RotateCcw className="size-4" aria-hidden="true" /> Повторить
      </button>
    </div>
  );
}
