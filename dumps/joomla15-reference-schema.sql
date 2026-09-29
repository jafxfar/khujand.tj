-- Reference DDL for Joomla 1.0/1.5-era sites (prefix jos_).
-- Empty structure only — for documentation and dump validation expectations.
-- Real site data must come from the hosting phpMyAdmin export.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `jos_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `usertype` varchar(25) NOT NULL DEFAULT '',
  `block` tinyint(4) NOT NULL DEFAULT 0,
  `sendEmail` tinyint(4) DEFAULT 0,
  `gid` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `registerDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastvisitDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation` varchar(100) NOT NULL DEFAULT '',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `ordering` int(11) NOT NULL DEFAULT 0,
  `access` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `section` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `ordering` int(11) NOT NULL DEFAULT 0,
  `access` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_section` (`section`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `title_alias` varchar(255) NOT NULL DEFAULT '',
  `introtext` mediumtext NOT NULL,
  `fulltext` mediumtext NOT NULL,
  `state` tinyint(3) NOT NULL DEFAULT 0,
  `sectionid` int(11) unsigned NOT NULL DEFAULT 0,
  `catid` int(11) unsigned NOT NULL DEFAULT 0,
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(11) unsigned NOT NULL DEFAULT 0,
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `images` text NOT NULL,
  `urls` text NOT NULL,
  `attribs` text NOT NULL,
  `version` int(11) unsigned NOT NULL DEFAULT 1,
  `ordering` int(11) NOT NULL DEFAULT 0,
  `metakey` text NOT NULL,
  `metadesc` text NOT NULL,
  `access` int(11) unsigned NOT NULL DEFAULT 0,
  `hits` int(11) unsigned NOT NULL DEFAULT 0,
  `language` char(7) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `idx_catid` (`catid`),
  KEY `idx_section` (`sectionid`),
  KEY `idx_alias` (`alias`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `link` text,
  `type` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `parent` int(11) unsigned NOT NULL DEFAULT 0,
  `componentid` int(11) unsigned NOT NULL DEFAULT 0,
  `sublevel` int(11) DEFAULT 0,
  `ordering` int(11) DEFAULT 0,
  `access` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `params` text NOT NULL,
  `home` int(1) unsigned NOT NULL DEFAULT 0,
  `language` char(7) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `menutype` (`menutype`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_menu_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `menutype` (`menutype`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `ordering` int(11) NOT NULL DEFAULT 0,
  `position` varchar(50) DEFAULT NULL,
  `checked_out` int(11) unsigned NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `module` varchar(50) DEFAULT NULL,
  `access` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `showtitle` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `params` text NOT NULL,
  `client_id` tinyint(4) NOT NULL DEFAULT 0,
  `language` char(7) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `published` (`published`,`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_modules_menu` (
  `moduleid` int(11) NOT NULL DEFAULT 0,
  `menuid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`moduleid`,`menuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `option` varchar(50) NOT NULL DEFAULT '',
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  `params` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Joom!Fish (multilingual) — present on khujand.tj clone assets
CREATE TABLE IF NOT EXISTS `jos_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `iso` varchar(20) DEFAULT NULL,
  `code` varchar(20) NOT NULL DEFAULT '',
  `image` varchar(100) DEFAULT NULL,
  `ordering` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `jos_jf_content` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(11) NOT NULL DEFAULT 0,
  `reference_id` int(11) NOT NULL DEFAULT 0,
  `reference_table` varchar(100) NOT NULL DEFAULT '',
  `reference_field` varchar(100) NOT NULL DEFAULT '',
  `value` mediumtext NOT NULL,
  `original_value` varchar(255) DEFAULT NULL,
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(11) unsigned NOT NULL DEFAULT 0,
  `published` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `combined` (`reference_id`,`reference_field`,`reference_table`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- jComments (assets under public/components/com_jcomments)
CREATE TABLE IF NOT EXISTS `jos_jcomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_id` int(11) NOT NULL DEFAULT 0,
  `object_group` varchar(255) NOT NULL DEFAULT '',
  `lang` varchar(20) NOT NULL DEFAULT '',
  `userid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `comment` text NOT NULL,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
