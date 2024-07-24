kafka-topics --create --topic=teste --bootstrap-server=localhost:9092 --partitions=3

kafka-topics --list --bootstrap-server=localhost:9092

consumer_offset => possui o "local" dos consumidores (pelo que entendi)

kafka-topics --bootstrap-server=localhost:9092 --topic=teste --describe


kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste

kafka-console-producer --bootstrap-server=localhost:9092 --topic=teste

-- Desorganizado (Sem a ordem das mensagens - Pois nao tem key)
kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste --from-beginning


kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste --group=x

-- Mostra os consumer entre outras coisas. 
kafka-consumer-groups --bootstrap-server=localhost:9092 --group=x --describe

-----------------------------------------

Kafka Connect.

create table categories (id int auto_increment primary key, name varchar(255));

insert into categories (name) values ('Eletronicos');
insert into categories (name) values ('Cozinha');

-- Senha do mongo-express:
admin
pass