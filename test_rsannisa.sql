create table users (
	user_id serial primary key,
	username varchar(50) unique not null,
	password varchar(100) not null,
	is_admin boolean default false
);

create table doctors(
	doctor_id serial primary key,
	username varchar(50) not null
);
create table jadwal_doctor (
	id serial primary key,
	doctor_id int not null,
	day varchar(50) not null,
	time_start varchar(10) not null,
	time_finish varchar(10) not null,
	quota int not null,
	status boolean not null,
	date timestamp not null,
	foreign key (doctor_id) references doctors(doctor_id) on update cascade on delete cascade
);

insert into users (username, password) values ('admin', 1234);

insert into doctors (username) values ('Dr. Fahmi');
insert into doctors (username) values ('Dr. Budi');
insert into doctors (username) values ('Dr. Joko');
select a.*, b.username  from jadwal_doctor a join doctors b on a.doctor_id = b.doctor_id

select * from users
select * from doctors
select * from jadwal_doctor
update users set is_admin = true where user_id = 1