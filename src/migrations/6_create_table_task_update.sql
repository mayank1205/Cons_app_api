create table task_update(id serial primary key, task_id integer references tasks(id), updates int, created_at timestamp, created_by varchar(255), updated_at timestamp, updated_by varchar(255))