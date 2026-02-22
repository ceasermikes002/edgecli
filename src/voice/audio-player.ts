import { spawn } from 'child_process';
import { Readable } from 'stream';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

export class AudioPlayer {
  private static getPlayerCommand(): { command: string; args: string[]; useTempFile: boolean } {
    const platform = os.platform();

    switch (platform) {
      case 'darwin': // macOS
        return { command: 'afplay', args: ['-'], useTempFile: false };
      case 'linux':
        return { command: 'aplay', args: ['-'], useTempFile: false };
      case 'win32': // Windows - use temp file approach
        return { command: 'powershell', args: [], useTempFile: true };
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  static async play(audioBuffer: Buffer): Promise<void> {
    const { command, args, useTempFile } = this.getPlayerCommand();

    if (useTempFile) {
      // Windows: Save to temp file and play
      return this.playWithTempFile(audioBuffer);
    }

    // macOS/Linux: Stream to stdin
    return new Promise((resolve, reject) => {
      const player = spawn(command, args, {
        stdio: ['pipe', 'ignore', 'pipe'],
      });

      player.stdin.write(audioBuffer);
      player.stdin.end();

      let stderrData = '';
      player.stderr?.on('data', (data) => {
        stderrData += data.toString();
      });

      player.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Audio player exited with code ${code}. Error: ${stderrData}`));
        }
      });

      player.on('error', (error) => {
        reject(new Error(`Failed to play audio: ${error.message}`));
      });
    });
  }

  private static async playWithTempFile(audioBuffer: Buffer): Promise<void> {
    const tempFile = path.join(os.tmpdir(), `edgecli-voice-${Date.now()}.mp3`);
    
    try {
      // Write audio to temp file
      await fs.promises.writeFile(tempFile, audioBuffer);
      
      // Play using PowerShell
      return new Promise((resolve, reject) => {
        const psScript = `
          Add-Type -AssemblyName presentationCore
          $mediaPlayer = New-Object System.Windows.Media.MediaPlayer
          $mediaPlayer.Open([System.Uri]::new("${tempFile.replace(/\\/g, '\\\\')}"))
          $mediaPlayer.Play()
          Start-Sleep -Seconds 1
          while ($mediaPlayer.NaturalDuration.HasTimeSpan -eq $false) {
            Start-Sleep -Milliseconds 100
          }
          $duration = $mediaPlayer.NaturalDuration.TimeSpan.TotalSeconds
          Start-Sleep -Seconds $duration
          $mediaPlayer.Stop()
          $mediaPlayer.Close()
        `;
        
        const player = spawn('powershell', ['-NoProfile', '-Command', psScript], {
          stdio: ['ignore', 'ignore', 'pipe'],
        });

        let stderrData = '';
        player.stderr?.on('data', (data) => {
          stderrData += data.toString();
        });

        player.on('close', (code) => {
          // Clean up temp file
          fs.unlink(tempFile, () => {});
          
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Audio player exited with code ${code}. Error: ${stderrData}`));
          }
        });

        player.on('error', (error) => {
          fs.unlink(tempFile, () => {});
          reject(new Error(`Failed to play audio: ${error.message}`));
        });
      });
    } catch (error) {
      // Clean up on error
      try {
        await fs.promises.unlink(tempFile);
      } catch {}
      throw error;
    }
  }

  static async playStream(audioStream: Readable): Promise<void> {
    const { command, args, useTempFile } = this.getPlayerCommand();

    if (useTempFile) {
      // Windows: Collect stream into buffer, then play
      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(Buffer.from(chunk));
      }
      const audioBuffer = Buffer.concat(chunks);
      return this.playWithTempFile(audioBuffer);
    }

    // macOS/Linux: Stream directly
    return new Promise((resolve, reject) => {
      const player = spawn(command, args, {
        stdio: ['pipe', 'ignore', 'pipe'],
      });

      audioStream.pipe(player.stdin);

      let stderrData = '';
      player.stderr?.on('data', (data) => {
        stderrData += data.toString();
      });

      player.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Audio player exited with code ${code}. Error: ${stderrData}`));
        }
      });

      player.on('error', (error) => {
        reject(new Error(`Failed to play audio: ${error.message}`));
      });

      audioStream.on('error', (error) => {
        player.kill();
        reject(error);
      });
    });
  }

  static isAvailable(): boolean {
    const platform = os.platform();
    return ['darwin', 'linux', 'win32'].includes(platform);
  }
}
