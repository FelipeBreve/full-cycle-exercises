CREATE TABLE IF NOT EXISTS balance (
    id bigint(20) AUTO_INCREMENT PRIMARY KEY,
    account varchar(255),
    balance decimal(10,2),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);