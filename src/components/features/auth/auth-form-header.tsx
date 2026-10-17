type AuthFormHeaderProps = {
  title: string;
  description: string;
};

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        {title}
      </h2>
      <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
        {description}
      </p>
    </div>
  );
}
