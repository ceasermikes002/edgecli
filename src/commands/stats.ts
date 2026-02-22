import { SessionStats } from '../session-stats';

export function statsCommand(): void {
  const stats = SessionStats.getInstance();
  stats.printSummary();
}
