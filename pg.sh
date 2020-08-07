

# change pwd
su postgres
psql postgres
\password postgres
\q
exit

# 简写
sudo -u postgres psql postgres


# 登录
psql -h localhost -U postgres

#  psql (12.2 (Debian 12.2-2.pgdg90+1), server 11.7 (Debian 11.7-2.pgdg90+1))
#  SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
#  Type "help" for help.
#
#  postgres=#


# createdb

db=rice_development

dropdb -h localhost -U postgres $db
createdb -h localhost -U postgres $db



clusterdb
createdb
createlang
createuser
dropdb
droplang
dropuser
pg_archivecleanup
pg_basebackup
pgbench
pg_dump
pg_dumpall
pg_isready
pg_receivewal
pg_receivexlog
pg_recvlogical
pg_restore
psql
reindexdb
vacuumdb
vacuumlo


s="postgresql://postgres:postgres@localhost:5432/rice"
