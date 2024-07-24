CREATE TABLE IF NOT EXISTS clients (
    id varchar(255),
    name varchar(255),
    email varchar(255),
    created_at date
);

CREATE TABLE IF NOT EXISTS accounts (
    id varchar(255),
    client_id varchar(255),
    balance varchar(255),
    created_at date
);

CREATE TABLE IF NOT EXISTS transactions (
    id varchar(255),
    account_id_from varchar(255),
    account_id_to varchar(255),
    amount int,
    created_at date
);

Insert into clients (id, name, email, created_at) values ('teste123', 'Teste 1', 'teste123@teste123.com', NOW())
ON DUPLICATE KEY UPDATE name="Teste 1", email='teste123@teste123.com'
;

Insert into clients (id, name, email, created_at) values ('teste987', 'Teste 2', 'teste987@teste987.com', NOW())
ON DUPLICATE KEY UPDATE name="Teste 2", email='teste987@teste987.com'
;

insert into accounts (id, client_id, balance, created_at) values ('account1', 'teste123', 10000, now())
ON DUPLICATE KEY UPDATE balance=10000
;

insert into accounts (id, client_id, balance, created_at) values ('account2', 'teste987', 0, now())
ON DUPLICATE KEY UPDATE balance=0
;





