DO
$body$
BEGIN
   IF NOT EXISTS (SELECT * FROM pg_catalog.pg_user WHERE usename = 'deploy') THEN
      CREATE ROLE deploy LOGIN PASSWORD 'deploy';
      ALTER ROLE deploy WITH SUPERUSER;
   END IF;

END
$body$;
DROP DATABASE IF EXISTS deploy;
CREATE DATABASE deploy;