create table inventory_request_trx(id serial primary key, inv_req_id integer references inventory_requests(id), material_id integer references materials(id), quantity int, created_at timestamp, created_by varchar(255), updated_at timestamp, updated_by varchar(255))