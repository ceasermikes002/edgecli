# Using EdgeCLI with NestJS

## Quick Start

```bash
# Install EdgeCLI globally
npm install -g @ceasermikes/edgecli

# Setup (one time)
edgecli init

# Run your NestJS app with monitoring
npm run start:dev 2>&1 | edgecli watch --stdin --voice
```

## Why Use EdgeCLI with NestJS?

### 1. **Instant Error Detection**
NestJS errors are caught and analyzed immediately with AI-powered triage.

### 2. **Voice Alerts**
Get audio notifications for critical errors while coding in another window.

### 3. **Root Cause Analysis**
AI identifies the root cause and suggests fixes for common NestJS issues.

### 4. **Hands-Free Monitoring**
Monitor your app while focusing on code - voice alerts grab your attention when needed.

## Common NestJS Errors EdgeCLI Detects

### 1. Dependency Injection Issues

**Error:**
```
[Nest] ERROR [ExceptionsHandler] Nest can't resolve dependencies of the UserService (?, DatabaseConnection)
```

**EdgeCLI Triage:**
- **Severity:** HIGH
- **Hypothesis:** Missing provider in module imports
- **Suggested Fix:** Add DatabaseConnection to module providers array

### 2. Circular Dependencies

**Error:**
```
[Nest] ERROR [ExceptionHandler] A circular dependency has been detected (UserService -> PostService -> UserService)
```

**EdgeCLI Triage:**
- **Severity:** CRITICAL
- **Hypothesis:** Circular dependency between services
- **Suggested Fix:** Use forwardRef() or restructure dependencies

### 3. Database Connection Failures

**Error:**
```
[Nest] ERROR [TypeOrmModule] Unable to connect to the database
```

**EdgeCLI Triage:**
- **Severity:** CRITICAL
- **Hypothesis:** Database connection configuration error
- **Suggested Fix:** Check database credentials and connection string

### 4. Validation Errors

**Error:**
```
[Nest] ERROR [ExceptionsHandler] Validation failed (numeric string is expected)
```

**EdgeCLI Triage:**
- **Severity:** MEDIUM
- **Hypothesis:** Request validation failed - invalid input type
- **Suggested Fix:** Check DTO validation decorators

### 5. Module Import Issues

**Error:**
```
[Nest] ERROR [ExceptionHandler] Nest cannot export provider UserService, which is not a part of the currently processed module
```

**EdgeCLI Triage:**
- **Severity:** HIGH
- **Hypothesis:** Provider not exported from module
- **Suggested Fix:** Add UserService to module exports array

## Setup Options

### Option 1: Inline Monitoring (Recommended for Development)

```bash
npm run start:dev 2>&1 | edgecli watch --stdin --voice
```

**Pros:**
- ✅ Real-time monitoring
- ✅ Voice alerts
- ✅ No log files needed

**Cons:**
- ❌ Can't scroll back through logs easily

### Option 2: Log File + Monitoring (Recommended for Production)

```bash
# Terminal 1: Run app and write to log
npm run start:prod 2>&1 | tee app.log

# Terminal 2: Monitor log file
edgecli watch app.log --voice
```

**Pros:**
- ✅ Can review logs later
- ✅ Separate monitoring terminal
- ✅ Better for long-running apps

**Cons:**
- ❌ Requires two terminals

### Option 3: Package.json Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "start:dev": "nest start --watch",
    "start:dev:monitored": "npm run start:dev 2>&1 | edgecli watch --stdin --voice",
    "start:prod": "node dist/main",
    "start:prod:monitored": "npm run start:prod 2>&1 | edgecli watch --stdin",
    "monitor:log": "edgecli watch app.log --voice"
  }
}
```

Then use:
```bash
npm run start:dev:monitored
```

## Configuration

### Voice Alert Threshold

For NestJS development, recommended settings:

```bash
edgecli voice
# Select "Warning and above" threshold
```

This will speak:
- ✅ WARN messages (package warnings, deprecations)
- ✅ ERROR messages (exceptions, failures)
- ✅ CRITICAL messages (startup failures, crashes)

But skip:
- ❌ LOG messages (route mapping, module init)
- ❌ DEBUG messages (verbose output)

### Severity Mapping

EdgeCLI maps NestJS log levels to severity:

| NestJS Level | EdgeCLI Severity | Voice Alert (warning+ threshold) |
|--------------|------------------|----------------------------------|
| LOG          | INFO             | ❌ No                            |
| DEBUG        | INFO             | ❌ No                            |
| VERBOSE      | INFO             | ❌ No                            |
| WARN         | MEDIUM/WARNING   | ✅ Yes                           |
| ERROR        | HIGH/ERROR       | ✅ Yes                           |
| Fatal Error  | CRITICAL         | ✅ Yes (priority)                |

## Real-World Example

### Scenario: Database Connection Error

**Your NestJS App:**
```typescript
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'wrong_password', // ❌ Wrong password
      database: 'myapp',
    }),
  ],
})
export class AppModule {}
```

**Terminal Output:**
```bash
$ npm run start:dev 2>&1 | edgecli watch --stdin --voice

[Nest] 12345  - 02/22/2026, 3:45:23 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/22/2026, 3:45:23 PM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 02/22/2026, 3:45:24 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
Error: password authentication failed for user "admin"
```

**EdgeCLI Response:**

```
✔ Batch processed

┌─ Triage Result ────────────────────────────────
│
│  SEVERITY  CRITICAL
│
│ Hypothesis:
│ PostgreSQL authentication failure - incorrect password for user 'admin'.
│ Database connection cannot be established, preventing application startup.
│
│ Confidence: 95.0%
│
│ ⚡ Escalating to deep analysis...
└─────────────────────────────────────────────────

🎙️ Voice Alert:
"CRITICAL alert. PostgreSQL authentication failure. Incorrect password 
for user admin. Confidence: 95 percent. Escalating to deep analysis."

✔ Deep analysis complete

┌─ Deep Analysis ────────────────────────────────
│
│  ROOT CAUSE
│ The PostgreSQL database rejected the connection attempt due to invalid
│ credentials. The password provided for user 'admin' does not match the
│ database configuration.
│
│ Affected Files:
│   • app.module.ts (TypeORM configuration)
│   • .env (if using environment variables)
│
│  SUGGESTED PATCH
│
│ 1. Verify database password:
│    - Check PostgreSQL user password
│    - Update TypeOrmModule.forRoot() configuration
│
│ 2. Use environment variables (recommended):
│
│ --- a/app.module.ts
│ +++ b/app.module.ts
│ @@ -5,7 +5,7 @@
│      type: 'postgres',
│      host: process.env.DB_HOST || 'localhost',
│      port: parseInt(process.env.DB_PORT) || 5432,
│      username: process.env.DB_USER || 'admin',
│ -    password: 'wrong_password',
│ +    password: process.env.DB_PASSWORD,
│      database: process.env.DB_NAME || 'myapp',
│    }),
│
│ 3. Create .env file:
│    DB_PASSWORD=correct_password_here
└─────────────────────────────────────────────────
```

## Tips for NestJS Development

### 1. Use Voice Alerts Wisely

```bash
# Development: Warning and above
edgecli voice
# Select "Warning and above"

# Production: Error and above
edgecli voice
# Select "Error and above"
```

### 2. Monitor Specific Modules

If you only want to monitor specific errors:

```bash
# Filter for specific module errors
npm run start:dev 2>&1 | grep "UserModule" | edgecli watch --stdin
```

### 3. Combine with NestJS Logger

```typescript
// main.ts
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // Customize log levels
  });
  await app.listen(3000);
}
```

### 4. Use with Docker

```bash
# Monitor Docker logs
docker logs -f my-nestjs-app 2>&1 | edgecli watch --stdin --voice
```

### 5. CI/CD Integration

```yaml
# .github/workflows/test.yml
- name: Run tests with monitoring
  run: |
    npm test 2>&1 | edgecli watch --stdin --no-voice
```

## Troubleshooting

### Issue: Too Many Alerts

**Solution:** Increase severity threshold
```bash
edgecli voice
# Select "Error and above" instead of "Warning and above"
```

### Issue: Missing Some Errors

**Solution:** Ensure stderr is captured
```bash
# Use 2>&1 to redirect stderr to stdout
npm run start:dev 2>&1 | edgecli watch --stdin
```

### Issue: Voice Alerts Too Slow

**Solution:** Use faster voice model
```bash
edgecli voice
# Select "Flash V2.5 - Fastest (<75ms)"
```

## Best Practices

1. ✅ **Use `2>&1`** to capture both stdout and stderr
2. ✅ **Set appropriate severity threshold** (warning+ for dev, error+ for prod)
3. ✅ **Use voice alerts during active development** for hands-free monitoring
4. ✅ **Disable voice in CI/CD** with `--no-voice` flag
5. ✅ **Review deep analysis patches** before applying
6. ✅ **Keep EdgeCLI updated** for latest NestJS error patterns

## Summary

EdgeCLI works seamlessly with NestJS:

```bash
# Simple command
npm run start:dev 2>&1 | edgecli watch --stdin --voice

# What you get:
✅ Real-time error detection
✅ AI-powered triage
✅ Voice alerts for critical issues
✅ Root cause analysis
✅ Suggested fixes
✅ Hands-free monitoring
```

Perfect for NestJS development! 🚀

---

Built for HackLondon 2026
