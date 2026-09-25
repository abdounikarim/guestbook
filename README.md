# Symfony Book

A Symfony application built while following **[The Symfony Book](https://symfony.com/book)**. It's the
conference guestbook app used throughout the book: visitors can browse conferences, leave comments and
photos, and admins can moderate feedback from a back office — with each commit on this repository tracking
a chapter of the book (database, forms, security, async messaging, caching, AI spam filtering, and more).

## Requirements

- PHP >= 8.4, with the `ctype` and `iconv` extensions
- [Composer](https://getcomposer.org/)
- [Symfony CLI](https://symfony.com/download) (recommended)
- Docker, to run the services defined in `compose.yaml` (PostgreSQL, Redis, RabbitMQ, Mailpit)

## Installation

1. Clone the repository and install PHP dependencies:

   ```bash
   git clone https://github.com/abdounikarim/symfony-book.git
   cd symfony-book
   composer install
   ```

2. Start the Docker services (database, Redis, RabbitMQ, Mailpit):

   ```bash
   docker compose up -d
   ```

   Symfony Flex/Docker Compose integration reads the connection details automatically. If you need to
   override anything (credentials, DSNs, API keys), copy the relevant variables from `.env` into a
   git-ignored `.env.local` file.

3. Create the database schema by running the migrations:

   ```bash
   symfony console doctrine:migrations:migrate
   ```

4. Install front-end assets (AssetMapper/Stimulus):

   ```bash
   symfony console importmap:install
   ```

## Usage

Start the local web server:

```bash
symfony serve -d
```

Then open <https://localhost:8000>. Useful entry points:

- `/` — the public conference list and guestbook
- `/admin` — the back office (EasyAdmin), protected by `ROLE_ADMIN`
- `/_profiler` — the Symfony web debug profiler (dev environment)

Some features depend on the Docker services above:

- **Messenger / RabbitMQ** — asynchronous messages (emails, notifications, comment moderation) are
  dispatched to the `async` transport backed by RabbitMQ. Run a worker to process them:

  ```bash
  symfony console messenger:consume async -vv
  ```

- **Redis** — used to store HTTP sessions.
- **Mailpit** — catches outgoing emails in development; check its UI (see `compose.override.yaml` for the
  exposed port).
- **AI spam filtering** — set `OPENAI_API_KEY` in `.env.local` to enable the AI-powered comment moderation.

## Tests

Tests use `WebTestCase`/`KernelTestCase` and a dedicated test database. Run them with:

```bash
make tests
```

which drops/recreates the test database, runs migrations, and then executes PHPUnit. To run PHPUnit
directly (e.g. to target a single test or pass extra options):

```bash
symfony php bin/phpunit
```

## Useful links

- [The Symfony Book](https://symfony.com/book) — the book this project follows
- [Symfony documentation](https://symfony.com/doc/current/index.html)
- [Symfony best practices](https://symfony.com/doc/current/best_practices.html)
- [Symfony CLI](https://symfony.com/download)

Bundles and libraries used in this project:

- [Doctrine ORM / DoctrineBundle](https://symfony.com/doc/current/doctrine.html)
- [Doctrine Migrations](https://symfony.com/bundles/DoctrineMigrationsBundle/current/index.html)
- [Symfony Forms](https://symfony.com/doc/current/forms.html)
- [Symfony Security](https://symfony.com/doc/current/security.html)
- [EasyAdmin](https://symfony.com/bundles/EasyAdminBundle/current/index.html)
- [API Platform](https://api-platform.com/docs/symfony/)
- [Symfony Messenger](https://symfony.com/doc/current/messenger.html)
- [Symfony Notifier](https://symfony.com/doc/current/notifier.html)
- [Symfony Mailer](https://symfony.com/doc/current/mailer.html)
- [Symfony Scheduler](https://symfony.com/doc/current/scheduler.html)
- [Symfony Workflow](https://symfony.com/doc/current/workflow.html)
- [Symfony Translation](https://symfony.com/doc/current/translation.html)
- [Symfony AI](https://symfony.com/doc/current/ai/index.html) — used for AI-based spam detection
- [Symfony UX Turbo / Stimulus](https://symfony.com/doc/current/frontend.html)
- [Nelmio CORS Bundle](https://github.com/nelmio/NelmioCorsBundle)
- [Zenstruck Foundry](https://github.com/zenstruck/foundry) & [DAMA Doctrine Test Bundle](https://github.com/dmaicher/doctrine-test-bundle) (tests)
</content>
