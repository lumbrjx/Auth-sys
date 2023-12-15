CREATE TABLE `user` (
	`id` varchar(128) NOT NULL,
	`username` varchar(256),
	`password` varchar(256),
	`oauthToken` varchar(256),
	`email` varchar(256),
	`type` varchar(256),
	`TWO_FA` boolean DEFAULT false,
	`twoFaEmail` varchar(256),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_id_unique` UNIQUE(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
