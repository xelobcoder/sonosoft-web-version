-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2021 at 07:02 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `sonosoft_web_version`
--
-- --------------------------------------------------------
--
-- Table structure for table `abdomen_preset`
--
CREATE TABLE `abdomen_preset` (
  `ID` int(255) NOT NULL,
  `LIVER` varchar(255) NOT NULL,
  `SPLEEN` varchar(255) NOT NULL,
  `GALLBLADDER` varchar(255) NOT NULL,
  `ABDOMINAL_CAVITY` varchar(255) NOT NULL,
  `PANCREAS` varchar(255) NOT NULL,
  `KIDNEY` varchar(255) NOT NULL,
  `TITLE` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `abdomen_preset`
--
INSERT INTO `abdomen_preset` (
    `ID`,
    `LIVER`,
    `SPLEEN`,
    `GALLBLADDER`,
    `ABDOMINAL_CAVITY`,
    `PANCREAS`,
    `KIDNEY`,
    `TITLE`
  )
VALUES (
    0,
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'ACUTE CHOLECYTITIS'
  ),
  (0, '', '', '', '', '', '', 'PANCREATITIS');
-- --------------------------------------------------------
--
-- Table structure for table `abdominalpelvic_preset`
--
CREATE TABLE `abdominalpelvic_preset` (
  `ID` int(255) NOT NULL,
  `TITLE` varchar(255) NOT NULL,
  `LIVER` varchar(255) NOT NULL,
  `SPLEEN` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `abdominalscan`
--
CREATE TABLE `abdominalscan` (
  `id` int(255) NOT NULL,
  `LIVER` varchar(255) NOT NULL,
  `KIDNEYS` varchar(255) NOT NULL,
  `SPLEEN` varchar(255) NOT NULL,
  `ABDOMINAL_CAVITY` varchar(255) NOT NULL,
  `PANCREAS` varchar(255) NOT NULL,
  `LT_KIDNEY_SIZE` varchar(30) NOT NULL,
  `RT_KIDNEY_SIZE` varchar(30) NOT NULL,
  `SPLEEN_SIZE` varchar(30) NOT NULL,
  `LIVER_SIZE` varchar(30) NOT NULL,
  `TRANSACTIONID` bigint(11) NOT NULL,
  `OTHERFINDINGS` varchar(255) NOT NULL,
  `IMPRESSION` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `abdominalscan`
--
INSERT INTO `abdominalscan` (
    `id`,
    `LIVER`,
    `KIDNEYS`,
    `SPLEEN`,
    `ABDOMINAL_CAVITY`,
    `PANCREAS`,
    `LT_KIDNEY_SIZE`,
    `RT_KIDNEY_SIZE`,
    `SPLEEN_SIZE`,
    `LIVER_SIZE`,
    `TRANSACTIONID`,
    `OTHERFINDINGS`,
    `IMPRESSION`
  )
VALUES (
    35,
    ' Differences between Functional Components and Class Components in React',
    ' Differences between Functional Components and Class Components in React',
    'Differences between Functional Components and Class Components in React ',
    'Differences between Functional Components and Class Components in React ',
    'Differences between Functional Components and Class Components in React ',
    '16 cm x 12 cm',
    '14.2 cm x 0.36 cm',
    '61.2 cm x 20.05 cm',
    '16 cm x 3 cm',
    1636653255799,
    'Differences between Functional Components and Class Components in React ',
    'helol'
  ),
  (
    37,
    '',
    'wefkjfef\n;fuqfel\njejewk\njeked\njeje\nhek',
    'Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content. ',
    'Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content. ',
    'Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content. ',
    '12 cm x 8.5 cm',
    '12 cm x 6 cm',
    '49 cm x 10 cm',
    '20 cm x 15 cm',
    1636868431322,
    'Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content. ',
    'Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content. '
  ),
  (
    38,
    '',
    ' Differences between Functional Components and Class Components in React',
    '',
    '',
    '',
    '33 cm x 33 cm',
    '33 cm x 33 cm',
    '33 cm x 33 cm',
    '16 cm x  cm',
    1636653262447,
    '',
    ''
  ),
  (
    39,
    'prince abangiba',
    'wertyuiopwertyuiopwertyuiop',
    'Differences between Functional Components and Class Components in React ',
    'Differences between Functional Components and Class Components in React ',
    'Differences between Functional Components and Class Components in React ',
    '16 cm x 12 cm',
    '14.2 cm x 0.36 cm',
    '61.2 cm x 20.05 cm',
    '16 cm x  cm',
    1637611365983,
    'Differences between Functional Components and Class Components in React ',
    'acute cholecytitis'
  );
-- --------------------------------------------------------
--
-- Stand-in structure for view `abdominal_preview_template`
-- (See below for the actual view)
--
CREATE TABLE `abdominal_preview_template` ();
-- --------------------------------------------------------
--
-- Table structure for table `crl_preset`
--
CREATE TABLE `crl_preset` (
  `ID` int(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `foetus` varchar(255) NOT NULL,
  `cardiac activity` varchar(255) NOT NULL,
  `crl` varchar(255) NOT NULL,
  `ovaries` varchar(255) NOT NULL,
  `adnexa` varchar(255) NOT NULL,
  `Ga` varchar(255) NOT NULL,
  `edd` varchar(255) NOT NULL,
  `impression` varchar(255) NOT NULL,
  `title` int(11) NOT NULL,
  `UUID` bigint(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `institutions`
--
CREATE TABLE `institutions` (
  `ID` int(255) NOT NULL,
  `INSTITUTION` varchar(255) NOT NULL,
  `SHORTCODE` int(255) NOT NULL,
  `DATEADDED` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `LOCATION` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `institutions`
--
INSERT INTO `institutions` (
    `ID`,
    `INSTITUTION`,
    `SHORTCODE`,
    `DATEADDED`,
    `LOCATION`
  )
VALUES (
    26,
    ' polyclinic',
    100,
    '2021-11-11 05:40:50.103012',
    'tamale opposite regional office'
  ),
  (
    27,
    'seventh day adventist hospital',
    24,
    '2021-11-30 18:19:06.184807',
    'tamale '
  );
-- --------------------------------------------------------
--
-- Table structure for table `msd`
--
CREATE TABLE `msd` (
  `ID` int(255) NOT NULL,
  `LOCATION` varchar(255) NOT NULL,
  `YOLKSAC` varchar(255) NOT NULL,
  `GSD` int(255) NOT NULL,
  `WEEKS` int(255) NOT NULL,
  `DAYS` int(255) NOT NULL,
  `GA` varchar(255) NOT NULL,
  `EDD` varchar(255) NOT NULL,
  `OVARIES` varchar(255) NOT NULL,
  `ADNEXA` varchar(255) NOT NULL,
  `DATE` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `ABNORMAL_FINDINGS` varchar(255) NOT NULL,
  `IMPRESSION` varchar(255) NOT NULL,
  `TRANSACTIONID` bigint(255) NOT NULL,
  `PROGRESSREF` varchar(255) NOT NULL DEFAULT 'NULL'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `msd`
--
INSERT INTO `msd` (
    `ID`,
    `LOCATION`,
    `YOLKSAC`,
    `GSD`,
    `WEEKS`,
    `DAYS`,
    `GA`,
    `EDD`,
    `OVARIES`,
    `ADNEXA`,
    `DATE`,
    `ABNORMAL_FINDINGS`,
    `IMPRESSION`,
    `TRANSACTIONID`,
    `PROGRESSREF`
  )
VALUES (
    24,
    'intrauterine',
    'present',
    0,
    4,
    0,
    '10',
    '',
    'get away',
    'null',
    '2021-11-13 10:57:08.903037',
    'null',
    'viable',
    1636653255799,
    'NULL'
  ),
  (
    25,
    'intrauterine',
    'absent',
    0,
    4,
    0,
    '',
    '',
    'both appear normal in size and echo patterm',
    'no adnexa mass observed.',
    '2021-11-13 11:36:16.837465',
    'A well defined hypoechoic mass situated anterior of theuterine fundus seen.',
    'ealy cyesis\n\nintamural myom',
    1636653262266,
    'NULL'
  ),
  (
    26,
    'extrauterine',
    'present',
    0,
    4,
    0,
    '',
    '2021-11-25',
    'null',
    'null',
    '2021-11-13 13:28:01.504069',
    'null',
    'early intrauterine cyesis(sds)',
    1636653543795,
    'NULL'
  );
-- --------------------------------------------------------
--
-- Table structure for table `msd_preset`
--
CREATE TABLE `msd_preset` (
  `ID` int(255) NOT NULL,
  `LOCATION` varchar(255) NOT NULL,
  `YOLKSAC` varchar(255) NOT NULL,
  `OVARIES` varchar(255) NOT NULL,
  `GSD` varchar(255) NOT NULL,
  `ADNEXA` varchar(255) NOT NULL,
  `ABNORMALS` varchar(255) NOT NULL,
  `IMPRESSION` varchar(255) NOT NULL,
  `TITLE` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `msd_preset`
--
INSERT INTO `msd_preset` (
    `ID`,
    `LOCATION`,
    `YOLKSAC`,
    `OVARIES`,
    `GSD`,
    `ADNEXA`,
    `ABNORMALS`,
    `IMPRESSION`,
    `TITLE`
  )
VALUES (
    28,
    'extrauterine',
    'absent',
    'both appear normal in size and echo patterm',
    '',
    'no adnexa mass observed.',
    'A well defined hypoechoic mass situated anterior of theuterine fundus seen.',
    'ealy cyesis\n\nintamural myom',
    'threatened abortion'
  ),
  (
    29,
    'intrauterine',
    'present',
    'null',
    '',
    'null',
    'null',
    'early intrauterine cyesis',
    'incomplete abortion'
  ),
  (
    30,
    'extrauterine',
    'absent',
    'failed trial.complete again',
    '',
    '',
    '',
    '',
    'jigga on move'
  ),
  (
    31,
    'intrauterine',
    'absent',
    'normal',
    '',
    'normal',
    'normak',
    'features is suggestive of anembryonic gestation',
    'anembryonic'
  );
-- --------------------------------------------------------
--
-- Table structure for table `referer`
--
CREATE TABLE `referer` (
  `ID` int(255) NOT NULL,
  `REFERER` varchar(255) NOT NULL,
  `INSTITUTION` varchar(255) NOT NULL,
  `SHORTCODE` int(255) NOT NULL,
  `DATEADDED` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `referer`
--
INSERT INTO `referer` (
    `ID`,
    `REFERER`,
    `INSTITUTION`,
    `SHORTCODE`,
    `DATEADDED`
  )
VALUES (
    20,
    'Paul Issac',
    'kabsad Hospital',
    2,
    '2021-09-24 12:49:22.839608'
  ),
  (
    22,
    'Adom Issac',
    'Seventh Day Adventist Hospital',
    22,
    '2021-09-24 12:49:23.181212'
  ),
  (
    23,
    'Isaac Awal',
    'Seventh Day Adventist Hospital',
    2,
    '2021-09-24 12:49:23.432327'
  ),
  (
    28,
    'mr prince abangiba',
    'kabsad',
    3,
    '2021-11-30 18:16:44.304297'
  );
-- --------------------------------------------------------
--
-- Table structure for table `registration`
--
CREATE TABLE `registration` (
  `ID` int(255) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `GENDER` varchar(255) NOT NULL,
  `AGE` varchar(255) NOT NULL,
  `AGE_CATEGORY` varchar(255) NOT NULL,
  `SCAN` varchar(255) NOT NULL,
  `REFERER` varchar(255) NOT NULL,
  `INSTITUTION` varchar(255) NOT NULL,
  `PAYMENT_MODE` varchar(255) NOT NULL,
  `AMOUNT_PAID` int(255) NOT NULL,
  `DISCOUNT` int(255) NOT NULL,
  `STATE` varchar(255) NOT NULL,
  `HISTORY` varchar(255) NOT NULL,
  `COST` int(255) NOT NULL,
  `TRANSACTIONID` bigint(255) NOT NULL,
  `RESOLUTION` varchar(255) NOT NULL DEFAULT 'NULL',
  `COMPLETED` varchar(255) NOT NULL DEFAULT 'FALSE',
  `REFID` varchar(255) NOT NULL DEFAULT 'NULL'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `registration`
--
INSERT INTO `registration` (
    `ID`,
    `FULLNAME`,
    `GENDER`,
    `AGE`,
    `AGE_CATEGORY`,
    `SCAN`,
    `REFERER`,
    `INSTITUTION`,
    `PAYMENT_MODE`,
    `AMOUNT_PAID`,
    `DISCOUNT`,
    `STATE`,
    `HISTORY`,
    `COST`,
    `TRANSACTIONID`,
    `RESOLUTION`,
    `COMPLETED`,
    `REFID`
  )
VALUES (
    48,
    'TIIFU HAMZA KOJO BORONSON',
    'female',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    ' polyclicnic',
    'undefined',
    100,
    100,
    'in pains',
    'LAP\nLOWER ABDOMINAL PAIN',
    0,
    1636653255799,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    49,
    'TIIFU HAMZA KOJO BORONSON',
    'female',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    ' polyclicnic',
    'undefined',
    100,
    100,
    'in pains',
    'LAP\r\nLOWER ABDOMINAL PAIN,',
    0,
    1636653262266,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    50,
    'TIIFU HAMZA KOJO BORONSON',
    'female',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    ' polyclicnic',
    'undefined',
    100,
    100,
    'in pains',
    'LAP\nLOWER ABDOMINAL PAIN',
    0,
    1636653262447,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    51,
    'tiifu hamza',
    'male',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    ' polyclicnic',
    'cash',
    100,
    100,
    'in pains',
    'lap',
    0,
    1636653543795,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    52,
    'tiifu hamza kojo  boronson',
    'female',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    ' polyclicnic',
    'cash',
    200,
    20,
    'in pains',
    'lower abdominal pain with fever and costovertebral pain',
    0,
    1636868431322,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    53,
    'ibrahim sayida',
    'female',
    '26',
    'years',
    'pelvic scan',
    'Paul Issac',
    'kalpohin lowcost',
    'momo',
    20,
    5,
    'empty bladder',
    'amenorrhea for 6 days',
    0,
    1637475464941,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    54,
    'ibrahim sayida',
    'female',
    '26',
    'years',
    'pelvic scan',
    'Paul Issac',
    'kalpohin lowcost',
    'momo',
    20,
    5,
    'empty bladder',
    'amenorrhea for 6 days',
    0,
    1637475466955,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    55,
    'john adamu Tiifu',
    'female',
    '35',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    'kabsad institute',
    'momo',
    60,
    20,
    'empty bladder',
    'lower abdominal pain\n\ncoughing in cyesis\n\ncramping ',
    0,
    1637611365983,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    56,
    'dr augustine jacko',
    'female',
    '26',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    'sda',
    'momo',
    60,
    10,
    'empty bladder',
    'pain in the lower abdomen',
    60,
    1638265531057,
    'NULL',
    'FALSE',
    'NULL'
  ),
  (
    57,
    'mr prince abangiba',
    'male',
    '23',
    'years',
    'abdominal-pelvic scan',
    'Paul Issac',
    'kabsad',
    'momo',
    50,
    10,
    'in pains',
    'lower abdominal pains with dysuria',
    60,
    1638295907544,
    'NULL',
    'FALSE',
    'NULL'
  );
-- --------------------------------------------------------
--
-- Table structure for table `requestaccess`
--
CREATE TABLE `requestaccess` (
  `ID` int(255) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `STAFFID` int(255) NOT NULL,
  `YROLE` varchar(255) NOT NULL,
  `PROFESSTION` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `requestacess`
--
CREATE TABLE `requestacess` (
  `ID` int(255) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `STAFFID` int(255) NOT NULL,
  `ROLE` varchar(255) NOT NULL,
  `PROFESSTION` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `scan`
--
CREATE TABLE `scan` (
  `ID` int(255) NOT NULL,
  `SCANS` varchar(255) NOT NULL,
  `COST` int(255) NOT NULL,
  `SHORTNAME` varchar(255) NOT NULL,
  `SONOGRAPHER` varchar(255) NOT NULL,
  `DATEADDED` date NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `scan`
--
INSERT INTO `scan` (
    `ID`,
    `SCANS`,
    `COST`,
    `SHORTNAME`,
    `SONOGRAPHER`,
    `DATEADDED`
  )
VALUES (
    45,
    'abdominal-pelvic scan',
    60,
    'abd-pel',
    'amos ntedo',
    '2021-10-12'
  ),
  (
    46,
    'obstetrics scan',
    25,
    'obs',
    'Tiifu Hamza',
    '2021-11-23'
  ),
  (
    47,
    'urological scan ',
    80,
    'uro',
    'Besignie Agnes',
    '2021-11-23'
  ),
  (
    48,
    'breast scan',
    100,
    'BRE001',
    'Mr prince Abangiba',
    '2021-11-30'
  );
-- --------------------------------------------------------
--
-- Table structure for table `second_third`
--
CREATE TABLE `second_third` (
  `ID` int(255) NOT NULL,
  `FOESTUS` varchar(255) NOT NULL,
  `PLACENTA_LOCATION` varchar(255) NOT NULL,
  `PLACENTA_APPEAR` varchar(255) NOT NULL,
  `PLACENTA_GRADE` varchar(255) NOT NULL,
  `AMNIOTIC_ASSESMENT` varchar(255) NOT NULL,
  `AMNIOTIC_VOLUME` varchar(255) NOT NULL,
  `FL` int(255) NOT NULL,
  `FLW` varchar(255) NOT NULL,
  `FLD` varchar(255) NOT NULL,
  `BPDM` int(255) NOT NULL,
  `BPDW` varchar(255) NOT NULL,
  `BPDD` varchar(255) NOT NULL,
  `ACM` int(255) NOT NULL,
  `ACW` varchar(255) NOT NULL,
  `ACD` varchar(255) NOT NULL,
  `HCM` int(255) NOT NULL,
  `HCW` varchar(255) NOT NULL,
  `HCD` varchar(255) NOT NULL,
  `PRESENTATION` varchar(255) NOT NULL,
  `CARDIAC_ACTIVITY` varchar(255) NOT NULL,
  `FHR` int(255) NOT NULL,
  `EFW` int(255) NOT NULL,
  `CERVICAL_LENGTH` int(255) NOT NULL,
  `CERVIX` varchar(255) NOT NULL,
  `OTHER_FINDINGS` varchar(255) NOT NULL,
  `IMPRESSION` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Table structure for table `stafflogins`
--
CREATE TABLE `stafflogins` (
  `ID` int(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `DATE` datetime(6) DEFAULT current_timestamp(6),
  `FULLACCESS` varchar(255) DEFAULT NULL,
  `DELETITEM` varchar(255) DEFAULT NULL,
  `EDIT` varchar(255) DEFAULT NULL,
  `FAILEDATTEMPT` int(255) NOT NULL,
  `REGISTER` varchar(255) NOT NULL DEFAULT 'TRUE',
  `ROLE` varchar(255) NOT NULL DEFAULT 'STAFF'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `stafflogins`
--
INSERT INTO `stafflogins` (
    `ID`,
    `USERNAME`,
    `PASSWORD`,
    `DATE`,
    `FULLACCESS`,
    `DELETITEM`,
    `EDIT`,
    `FAILEDATTEMPT`,
    `REGISTER`,
    `ROLE`
  )
VALUES (
    16,
    'tiifu',
    '$2b$10$NTw..x2tOjxTSfXN2OwFDO62HJTmLcAzyykeCY96K2p748p4dfyYG',
    '2021-11-20 21:41:35.811690',
    'fullaccess',
    'false',
    'false',
    0,
    'false',
    'sonographer'
  ),
  (
    17,
    'lina',
    '$2b$10$08SL7.2sMLPO3a8ZKGsor.aoO9rDndo5UdLHwx8yo5JpWK0Hh8Ms6',
    '2021-11-20 21:42:47.601556',
    'fullaccess',
    'true',
    'true',
    0,
    'true',
    'customer_services_attendant'
  ),
  (
    19,
    'Prince Abangiba',
    '$2b$10$Gba2qEkXsUU73Nuan2FoY.DLXkQ2n2rlmxIDJta8PiCIDdwS8Q50e',
    '2021-11-30 18:27:06.175673',
    'scan room',
    'true',
    'true',
    0,
    'false',
    'sonographer'
  );
-- --------------------------------------------------------
--
-- Structure for view `abdominal_preview_template`
--
DROP TABLE IF EXISTS `abdominal_preview_template`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root` @`localhost` SQL SECURITY DEFINER VIEW `abdominal_preview_template` AS
SELECT `registration`.`UUID` AS `UUID`,
  `registration`.`ID` AS `ID`,
  `registration`.`FULLNAME` AS `FULLNAME`,
  `registration`.`GENDER` AS `GENDER`,
  `registration`.`AGE` AS `AGE`,
  `registration`.`AGE_CATEGORY` AS `AGE_CATEGORY`,
  `registration`.`SCAN` AS `SCAN`,
  `registration`.`REFERER` AS `REFERER`,
  `registration`.`INSTITUTION` AS `INSTITUTION`,
  `registration`.`PAYMENT_MODE` AS `PAYMENT_MODE`,
  `registration`.`AMOUNT_PAID` AS `AMOUNT_PAID`,
  `registration`.`DISCOUNT` AS `DISCOUNT`,
  `registration`.`STATE` AS `STATE`,
  `registration`.`TRANSACTIONID` AS `TRANSACTIONID`,
  `registration`.`HISTORY` AS `HISTORY`,
  `registration`.`COST` AS `COST`,
  `registration`.`RESOLUTION` AS `RESOLUTION`,
  `registration`.`COMPLETED` AS `COMPLETED`,
  `registration`.`REFID` AS `REFID`,
  `abdominalscan`.`LIVER` AS `LIVER`,
  `abdominalscan`.`KIDNEYS` AS `KIDNEYS`,
  `abdominalscan`.`SPLEEN` AS `SPLEEN`,
  `abdominalscan`.`ABDOMINAL_CAVITY` AS `ABDOMINAL_CAVITY`,
  `abdominalscan`.`PANCREAS` AS `PANCREAS`,
  `abdominalscan`.`LT_KIDNEY_SIZE` AS `LT_KIDNEY_SIZE`,
  `abdominalscan`.`RT_KIDNEY_SIZE` AS `RT_KIDNEY_SIZE`,
  `abdominalscan`.`SPLEEN_SIZE` AS `SPLEEN_SIZE`,
  `abdominalscan`.`LIVER_SIZE` AS `LIVER_SIZE`
FROM (
    `registration`
    join `abdominalscan` on(`registration`.`UUID` = `abdominalscan`.`UUID`)
  );
--
-- Indexes for dumped tables
--
--
-- Indexes for table `abdominalpelvic_preset`
--
ALTER TABLE `abdominalpelvic_preset`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `abdominalscan`
--
ALTER TABLE `abdominalscan`
ADD PRIMARY KEY (`id`);
--
-- Indexes for table `crl_preset`
--
ALTER TABLE `crl_preset`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `institutions`
--
ALTER TABLE `institutions`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `msd`
--
ALTER TABLE `msd`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `msd_preset`
--
ALTER TABLE `msd_preset`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `referer`
--
ALTER TABLE `referer`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `requestaccess`
--
ALTER TABLE `requestaccess`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `requestacess`
--
ALTER TABLE `requestacess`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `scan`
--
ALTER TABLE `scan`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `second_third`
--
ALTER TABLE `second_third`
ADD PRIMARY KEY (`ID`);
--
-- Indexes for table `stafflogins`
--
ALTER TABLE `stafflogins`
ADD PRIMARY KEY (`ID`);
--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `abdominalpelvic_preset`
--
ALTER TABLE `abdominalpelvic_preset`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `abdominalscan`
--
ALTER TABLE `abdominalscan`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 40;
--
-- AUTO_INCREMENT for table `crl_preset`
--
ALTER TABLE `crl_preset`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `institutions`
--
ALTER TABLE `institutions`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 28;
--
-- AUTO_INCREMENT for table `msd`
--
ALTER TABLE `msd`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 27;
--
-- AUTO_INCREMENT for table `msd_preset`
--
ALTER TABLE `msd_preset`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 32;
--
-- AUTO_INCREMENT for table `referer`
--
ALTER TABLE `referer`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 29;
--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 58;
--
-- AUTO_INCREMENT for table `requestaccess`
--
ALTER TABLE `requestaccess`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `requestacess`
--
ALTER TABLE `requestacess`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `scan`
--
ALTER TABLE `scan`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 49;
--
-- AUTO_INCREMENT for table `second_third`
--
ALTER TABLE `second_third`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `stafflogins`
--
ALTER TABLE `stafflogins`
MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 20;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;