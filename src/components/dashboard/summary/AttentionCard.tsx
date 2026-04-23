interface AttentionCardProps {
  title: string;
  count: string;
  description: string;
}

export function AttentionCard({
  title,
  count,
  description,
}: AttentionCardProps) {
  return (
    <div className="col-span-12 rounded-lg bg-error-container p-6 md:col-span-3">
      <div className="flex h-full flex-col justify-between">
        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-error-container">
          {title}
        </span>
        <div>
          <div className="text-4xl font-extrabold text-on-error-container">
            {count}
          </div>
          <p className="mt-1 text-xs font-medium text-on-error-container/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
