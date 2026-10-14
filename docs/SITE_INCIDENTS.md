# AutomationExercise Service Incident Log

Recorded on 14 October 2026 for https://automationexercise.com. These are service failures seen during testing, not a statement of the site's current availability.

## CI results

| Run | Passed | Flaky | Failed |
| --- | ---: | ---: | ---: |
| [Run #17](https://github.com/Heba-art/playwright-typescript-automation/actions/runs/38525320473), before the fixes (`b7d603d`) | 8 | 5 | 2 |
| [Run after the fixes](https://github.com/Heba-art/playwright-typescript-automation/actions/runs/38535731948) (`000f5bb`) | 14 | 1 | 0 |

Both runs used Chromium, Firefox and WebKit, one worker and up to two retries.

## Incidents

| ID | What happened | Evidence |
| --- | --- | --- |
| ENV-001 | Cloudflare 520 pages in local WebKit runs (TC-UI-001, TC-UI-002). | Page snapshots |
| ENV-002 | HTTP 503 "queue full" in run #17. `GET /logout` returned 503 in Chromium and Firefox, so the session stayed active. | CI snapshots and traces |
| OBS-003 | TC-UI-005 API cleanup failed once in Firefox. The status was not captured, so the cause is **unconfirmed**. | Failure message |
| ENV-004 | `GET /logout → HTTP 520` twice locally (WebKit) and once in CI (Firefox, passed on retry). | `server error` annotations and the 520 page snapshot |

## Notes

- `/logout` failed five times across these runs. The server-side cause is unknown.
- Check the report for `server error` annotations before changing locators or timeouts.