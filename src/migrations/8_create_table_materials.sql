create table materials(id serial primary key, name varchar(255), site_id integer references sites(id), unit int, created_at timestamp, created_by varchar(255), updated_at timestamp, updated_by varchar(255))