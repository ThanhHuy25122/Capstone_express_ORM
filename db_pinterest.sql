-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_binh_luan` date NOT NULL,
  `noi_dung` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1,	1,	1,	'2023-05-10',	'dep'),
(7,	1,	1,	'2023-04-25',	'Xau'),
(8,	1,	3,	'2023-04-25',	'Xau'),
(9,	1,	3,	'2023-04-25',	'Xau'),
(10,	1,	3,	'2023-04-27',	'Xau'),
(11,	1,	3,	'2023-05-10',	'Xau'),
(12,	1,	3,	'2023-05-10',	'Xau');

DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duong_dan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mo_ta` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1,	'1231231',	'Thanh Huy',	'123123',	1),
(2,	'1231231',	'Thanh Huy',	'123123',	1),
(3,	'123123',	'123123444s',	'asdasfa',	2),
(8,	'thanhhuy',	'Thanh Huy',	'12323123',	1),
(9,	'1231231',	'Thanh Huy',	'123123',	1),
(12,	'thanhhuy',	'Thanh Huy',	'12323123',	9);

DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1,	1,	'2023-04-18'),
(2,	1,	'2023-05-10');

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mat_khau` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ho_ten` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tuoi` int NOT NULL,
  `anh_dai_dien` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1,	'huyxh@gmail.com',	'123',	'thanh huy',	12,	'hasdf.'),
(2,	'thanhhuy12@gmail.com',	'1231231112',	'Thanh Huy',	122,	'thanh.jpg'),
(6,	'thanhhuy@gmail.com',	'$2b$10$mBr9lsC6E2VpbcGMirW.K.Kyy1C23FINyz1opX50gO5XY8wzboX5G',	'Thanh Huy',	12,	'thanh.jpg'),
(7,	'thanhhuy@gmail.com',	'$2b$10$MZhJltVfTrUrBz5kwvzI2ecYyCwoB9XlsuSF.KoWhxODZDaopry0K',	'Thanh Huy',	12,	'thanh.jpg'),
(9,	'huy@gmail.com',	'$2b$10$2hGrDIOqfM2jrKpD7hiN6.DDAtefMuWymzOcgudvST/SZwMpKJ7py',	'Thanh Huy',	122,	'thanh.jpg');

-- 2023-05-10 06:09:05
