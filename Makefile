# --- Konfigurasi ---
ENV ?= development
KNEX = npx knex
KNEXFILE = src/config/knexfile.ts
MIGRATIONS_DIR = src/database/migrations
SEEDERS_DIR = src/database/seeders

# buat migration baru: make migrate-new name=create_users_table
migrate-new:
	@if [ -z "$(name)" ]; then \
		echo "❌ Harus pakai argumen name=<nama_migration>"; \
		exit 1; \
	fi; \
	$(KNEX) migrate:make $(name) --knexfile $(KNEXFILE) --env $(ENV)

# jalankan semua migration
migrate-up:
	$(KNEX) migrate:latest --knexfile $(KNEXFILE) --env $(ENV)

# rollback migration terakhir
migrate-down:
	$(KNEX) migrate:rollback --knexfile $(KNEXFILE) --env $(ENV)

# lihat status migration
migrate-status:
	$(KNEX) migrate:status --knexfile $(KNEXFILE) --env $(ENV)

# jalankan semua seeder
seed:
	$(KNEX) seed:run --knexfile $(KNEXFILE) --env $(ENV)

# reset DB: rollback semua → migrate lagi → seed
db-reset:
	$(KNEX) migrate:rollback --all --knexfile $(KNEXFILE) --env $(ENV)
	$(KNEX) migrate:latest --knexfile $(KNEXFILE) --env $(ENV)
	$(KNEX) seed:run --knexfile $(KNEXFILE) --env $(ENV)
