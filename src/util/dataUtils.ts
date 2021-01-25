export function getAll(detail: string[]): string {
  return (
    detail
      ?.map((d: string) => {
        return d;
      })
      .join(", ") ?? ""
  );
}
