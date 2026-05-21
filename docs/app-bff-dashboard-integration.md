# App BFF Dashboard Integration Notes

## Scope

This document records the DK_Theme-only integration for Xboard App BFF dashboard reads.

The integration is additive and opt-in. It must not replace or remove the legacy API paths used by DK_Theme and app clients.

## Enablement

Set the frontend environment flag:

```env
VITE_ENABLE_APP_BFF=true
```

Default remains disabled:

```env
VITE_ENABLE_APP_BFF=false
```

The flag only affects DK_Theme frontend probes. It does not change Xboard backend routing, legacy API response shapes, subscription delivery, node APIs, payment callbacks, or authentication flows.

## Runtime behavior

When enabled and mock mode is off, the dashboard page probes:

```http
GET /api/app/v1/dashboard
```

The probe is used only as a safe read-model overlay for dashboard display fields:

- user email/avatar summary
- subscription expiry summary
- traffic totals, used amount, remaining amount, and usage percent
- order/ticket/notice counts are typed for future UI use but not yet rendered as a business-flow replacement

The existing legacy paths remain the compatibility source and fallback:

- `GET /api/v1/user/info`
- `GET /api/v1/user/getSubscribe`
- traffic log APIs used by the dashboard chart

Any App BFF failure returns `null` in the frontend service and keeps the existing dashboard render path alive.

## Explicit non-goals

Do not use `/api/app/v1/dashboard` for:

- subscription URL delivery
- subscription token or UUID exposure
- node credentials
- raw `auth_data`
- payment provider details
- ticket message bodies
- AES/global response encryption
- replacing old `/api/v1/*` or `/api/v2/*` contracts

## Local validation recorded on 2026-05-21

DK_Theme validation:

```bash
npm run lint
npm run build
VITE_ENABLE_APP_BFF=true npm run build
```

Xboard App API validation:

```bash
API_RATE_LIMITS_ENABLED=false .local/bin/php-xboard ./vendor/bin/phpunit --bootstrap vendor/autoload.php tests/Feature/AppApi tests/Feature/ApiSecurityPilotTest.php
```

Result:

```text
OK (18 tests, 327 assertions)
```

Local route-list/live runtime note:

- `php artisan route:list --path=api/app/v1` is blocked in this environment by `RedisException: Connection refused` from existing statistical service bootstrapping.
- `redis-server` is not installed locally.
- Docker exists but this user cannot access `/var/run/docker.sock`, so a temporary Redis container could not be started.
- This is an environment/runtime dependency issue, not evidence of an App BFF contract failure; the AppApi feature tests cover the dashboard route and envelope behavior without requiring a live web server.

## Next safe slice

Before changing UI again, run one browser/live smoke test in an environment with Redis available:

1. Start Xboard with Redis.
2. Build/run DK_Theme with `VITE_ENABLE_MOCK=false` and `VITE_ENABLE_APP_BFF=true`.
3. Login through the existing DK_Theme auth flow.
4. Confirm the dashboard renders when `/api/app/v1/dashboard` returns 200.
5. Temporarily block `/api/app/v1/dashboard` and confirm dashboard still renders from legacy `/api/v1` data.
