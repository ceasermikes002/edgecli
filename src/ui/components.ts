import boxen from 'boxen';
import ora from 'ora';
import { brandGradient, colors, styles, boxStyles, logo, miniLogo } from './theme';

export class UIComponents {
  static showLogo(): void {
    console.log(brandGradient(logo));
  }

  static showMiniLogo(): void {
    console.log(brandGradient(miniLogo));
  }

  static showWelcome(): void {
    this.showLogo();
    console.log(styles.subtitle('  AI-Powered Log Triage & Incident Analysis'));
    console.log(styles.muted('  Powered by Google Gemini API\n'));
  }

  static showBox(content: string, type: 'default' | 'success' | 'error' | 'info' = 'default'): void {
    console.log(boxen(content, boxStyles[type]));
  }

  static showSection(title: string, content?: string): void {
    console.log('\n' + brandGradient('━'.repeat(50)));
    console.log(styles.title(`  ${title}`));
    console.log(brandGradient('━'.repeat(50)));
    if (content) {
      console.log(content);
    }
  }

  static showMetrics(metrics: Record<string, string | number>): void {
    console.log('\n' + styles.subtitle('📊 Metrics'));
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`  ${styles.metric(key, value)}`);
    });
  }

  static showTriageResult(result: {
    severity: string;
    hypothesis: string;
    confidence: number;
    needs_deeper?: boolean;
  }): void {
    const severityColors: Record<string, any> = {
      low: colors.severityLow,
      medium: colors.severityMedium,
      high: colors.severityHigh,
      critical: colors.severityCritical,
    };

    const severityColor = severityColors[result.severity] || colors.primary;
    const confidencePercent = (result.confidence * 100).toFixed(1);
    
    console.log('\n' + brandGradient('┌─ Triage Result ' + '─'.repeat(32)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + styles.badge('SEVERITY', severityColor) + ' ' + severityColor(result.severity.toUpperCase()));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('Hypothesis:'));
    console.log(brandGradient('│ ') + colors.primary(result.hypothesis));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('Confidence: ') + colors.secondary.bold(`${confidencePercent}%`));
    
    if (result.needs_deeper) {
      console.log(brandGradient('│'));
      console.log(brandGradient('│ ') + colors.warning('⚡ Escalating to deep analysis...'));
    }
    
    console.log(brandGradient('└' + '─'.repeat(49)));
  }

  static showDeepAnalysis(result: {
    root_cause: string;
    patch_diff: string;
    affected_files?: string[];
  }): void {
    console.log('\n' + brandGradient('┌─ Deep Analysis ' + '─'.repeat(32)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + styles.badge('ROOT CAUSE', colors.error));
    console.log(brandGradient('│ ') + colors.primary(result.root_cause));
    
    if (result.affected_files && result.affected_files.length > 0) {
      console.log(brandGradient('│'));
      console.log(brandGradient('│ ') + colors.muted('Affected Files:'));
      result.affected_files.forEach(file => {
        console.log(brandGradient('│ ') + colors.secondary(`  • ${file}`));
      });
    }
    
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + styles.badge('SUGGESTED PATCH', colors.success));
    console.log(brandGradient('│'));
    
    // Format diff with colors
    const diffLines = result.patch_diff.split('\n');
    diffLines.forEach(line => {
      if (line.startsWith('+')) {
        console.log(brandGradient('│ ') + colors.success(line));
      } else if (line.startsWith('-')) {
        console.log(brandGradient('│ ') + colors.error(line));
      } else if (line.startsWith('@@')) {
        console.log(brandGradient('│ ') + colors.info(line));
      } else {
        console.log(brandGradient('│ ') + colors.muted(line));
      }
    });
    
    console.log(brandGradient('└' + '─'.repeat(49)));
  }

  static createSpinner(text: string) {
    return ora({
      text: colors.primary(text),
      color: 'cyan',
      spinner: 'dots12',
    });
  }

  static showStats(stats: {
    duration: number;
    totalTriages: number;
    triageCounts: Record<string, number>;
    deepAnalysisCount: number;
    timeSaved: number;
  }): void {
    this.showSection('Session Statistics');
    
    console.log('\n' + brandGradient('┌─ Summary ' + '─'.repeat(38)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + styles.metric('Duration', `${stats.duration}s`));
    console.log(brandGradient('│ ') + styles.metric('Total Triages', stats.totalTriages));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('Severity Breakdown:'));
    console.log(brandGradient('│ ') + `  ${colors.severityLow('●')} Low: ${stats.triageCounts.low || 0}`);
    console.log(brandGradient('│ ') + `  ${colors.severityMedium('●')} Medium: ${stats.triageCounts.medium || 0}`);
    console.log(brandGradient('│ ') + `  ${colors.severityHigh('●')} High: ${stats.triageCounts.high || 0}`);
    console.log(brandGradient('│ ') + `  ${colors.severityCritical('●')} Critical: ${stats.triageCounts.critical || 0}`);
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + styles.metric('Deep Analyses', stats.deepAnalysisCount));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.success.bold(`⚡ Estimated time saved: ~${stats.timeSaved} minutes`));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();
  }

  static showError(message: string): void {
    console.log('\n' + colors.error('┌─ Error ' + '─'.repeat(40)));
    console.log(colors.error('│'));
    console.log(colors.error('│ ') + message);
    console.log(colors.error('│'));
    console.log(colors.error('└' + '─'.repeat(49)));
    console.log();
  }

  static showSuccess(message: string): void {
    console.log('\n' + colors.success('┌─ Success ' + '─'.repeat(38)));
    console.log(colors.success('│'));
    console.log(colors.success('│ ') + message);
    console.log(colors.success('│'));
    console.log(colors.success('└' + '─'.repeat(49)));
    console.log();
  }

  static showProgress(current: number, total: number, label: string): void {
    const percentage = Math.floor((current / total) * 100);
    const filled = Math.floor(percentage / 2);
    const empty = 50 - filled;
    
    const bar = colors.success('█'.repeat(filled)) + colors.muted('░'.repeat(empty));
    process.stdout.write(`\r${brandGradient('│ ')}${label}: ${bar} ${colors.secondary.bold(`${percentage}%`)}`);
    
    if (current === total) {
      console.log(); // New line when complete
    }
  }
}
