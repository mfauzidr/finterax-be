# --- Konfigurasi ---
KNEX=npm run knex
MIGRATE=$(KNEX) migrate:latest
SEED=$(KNEX) seed:run
ROLLBACK=$(KNEX) migrate:rollback
MIGRATIONS_DIR=src/db/migrations

# Buat migration baru: make migrate-new name=create_users_table
migrate-new:
	$(KNEX) migrate:make $(name) --knexfile src/config/knexfile.ts --migrations-directory $(MIGRATIONS_DIR)

# Jalankan migration
migrate-up:
	$(MIGRATE)

# Rollback migration terakhir
migrate-down:
	$(ROLLBACK)

# Jalankan semua seed
seed:
	$(SEED)

# Reset DB: rollback semua lalu migrate ulang + seed
reset:
	$(KNEX) migrate:rollback --all
	$(MIGRATE)
	$(SEED)
