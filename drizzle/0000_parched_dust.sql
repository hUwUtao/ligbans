CREATE TABLE `litebans_allow` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uuid` binary(16) NOT NULL,
	`type` int NOT NULL,
	CONSTRAINT `litebans_allow_id` PRIMARY KEY(`id`),
	CONSTRAINT `litebans_allow_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `litebans_bans` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uuid` varchar(191),
	`ip` varchar(191),
	`reason` varchar(191),
	`banned_by_uuid` varchar(191) NOT NULL,
	`banned_by_name` varchar(191),
	`removed_by_uuid` varchar(191),
	`removed_by_name` varchar(191),
	`removed_by_reason` varchar(191),
	`removed_by_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`time` bigint NOT NULL,
	`until` bigint NOT NULL,
	`template` int NOT NULL DEFAULT 255,
	`server_scope` varchar(191),
	`server_origin` varchar(191),
	`silent` boolean NOT NULL,
	`ipban` boolean NOT NULL,
	`ipban_wildcard` boolean NOT NULL DEFAULT (b'0'),
	`active` boolean NOT NULL,
	CONSTRAINT `litebans_bans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_config` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`version` varchar(191) NOT NULL,
	`build` varchar(191) NOT NULL,
	`timezone` varchar(191) NOT NULL DEFAULT '+00:00',
	CONSTRAINT `litebans_config_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_history` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`name` varchar(191),
	`uuid` varchar(191),
	`ip` varchar(191),
	CONSTRAINT `litebans_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_kicks` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uuid` varchar(191),
	`ip` varchar(191),
	`reason` varchar(191),
	`banned_by_uuid` varchar(191) NOT NULL,
	`banned_by_name` varchar(191),
	`time` bigint NOT NULL,
	`until` bigint NOT NULL,
	`template` int NOT NULL DEFAULT 255,
	`server_scope` varchar(191),
	`server_origin` varchar(191),
	`silent` boolean NOT NULL,
	`ipban` boolean NOT NULL,
	`ipban_wildcard` boolean NOT NULL DEFAULT (b'0'),
	`active` boolean NOT NULL,
	CONSTRAINT `litebans_kicks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_mutes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uuid` varchar(191),
	`ip` varchar(191),
	`reason` varchar(191),
	`banned_by_uuid` varchar(191) NOT NULL,
	`banned_by_name` varchar(191),
	`removed_by_uuid` varchar(191),
	`removed_by_name` varchar(191),
	`removed_by_reason` varchar(191),
	`removed_by_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`time` bigint NOT NULL,
	`until` bigint NOT NULL,
	`template` int NOT NULL DEFAULT 255,
	`server_scope` varchar(191),
	`server_origin` varchar(191),
	`silent` boolean NOT NULL,
	`ipban` boolean NOT NULL,
	`ipban_wildcard` boolean NOT NULL DEFAULT (b'0'),
	`active` boolean NOT NULL,
	CONSTRAINT `litebans_mutes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_servers` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`uuid` varchar(191) NOT NULL,
	`date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `litebans_servers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_sync` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`info` int NOT NULL,
	`msg` varchar(191) NOT NULL,
	`time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `litebans_sync_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `litebans_warnings` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`uuid` varchar(191),
	`ip` varchar(191),
	`reason` varchar(191),
	`banned_by_uuid` varchar(191) NOT NULL,
	`banned_by_name` varchar(191),
	`removed_by_uuid` varchar(191),
	`removed_by_name` varchar(191),
	`removed_by_reason` varchar(191),
	`removed_by_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`time` bigint NOT NULL,
	`until` bigint NOT NULL,
	`template` int NOT NULL DEFAULT 255,
	`server_scope` varchar(191),
	`server_origin` varchar(191),
	`silent` boolean NOT NULL,
	`ipban` boolean NOT NULL,
	`ipban_wildcard` boolean NOT NULL DEFAULT (b'0'),
	`active` boolean NOT NULL,
	`warned` boolean NOT NULL,
	CONSTRAINT `litebans_warnings_id` PRIMARY KEY(`id`)
);
