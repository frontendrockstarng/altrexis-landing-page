// Simple cn utility for className concatenation
export function cn(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
