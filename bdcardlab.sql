-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2021 at 02:39 AM
-- Server version: 5.5.20
-- PHP Version: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bdcardlab`
--

-- --------------------------------------------------------

--
-- Table structure for table `estoque_vac`
--

CREATE TABLE IF NOT EXISTS `estoque_vac` (
  `CDMEDICAMENTO` int(3) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `DTFAB` date NOT NULL,
  `DTVAL` date NOT NULL,
  `LOTE` varchar(55) NOT NULL,
  `QNTVAC` bigint(20) NOT NULL,
  `CDPOSTO` int(2) unsigned zerofill NOT NULL,
  `CDVACINA` int(2) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`CDMEDICAMENTO`),
  KEY `CDVACINA` (`CDVACINA`),
  KEY `CDPOSTO` (`CDPOSTO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `estoque_vac`
--

INSERT INTO `estoque_vac` (`CDMEDICAMENTO`, `DTFAB`, `DTVAL`, `LOTE`, `QNTVAC`, `CDPOSTO`, `CDVACINA`) VALUES
(022, '2021-12-04', '2021-12-11', '21', 12, 01, 01),
(023, '2021-12-04', '2021-12-11', '21', 12, 01, 02),
(024, '2021-12-04', '2021-12-18', '22', 12, 01, 01);

-- --------------------------------------------------------

--
-- Table structure for table `tb_admin`
--

CREATE TABLE IF NOT EXISTS `tb_admin` (
  `CDADMIN` int(2) unsigned zerofill NOT NULL,
  `NMADMIN` varchar(100) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `SENHA` varchar(50) NOT NULL,
  `NIVEL` enum('1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`CDADMIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_admin`
--

INSERT INTO `tb_admin` (`CDADMIN`, `NMADMIN`, `CPF`, `SENHA`, `NIVEL`) VALUES
(01, 'MATHEUS', '12312312344', 'admin', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tb_bairro`
--

CREATE TABLE IF NOT EXISTS `tb_bairro` (
  `CDBAIRRO` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `NMBAIRRO` varchar(45) NOT NULL,
  `CDCIDADE` int(2) unsigned zerofill NOT NULL,
  PRIMARY KEY (`CDBAIRRO`),
  KEY `CDCIDADE` (`CDCIDADE`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `tb_bairro`
--

INSERT INTO `tb_bairro` (`CDBAIRRO`, `NMBAIRRO`, `CDCIDADE`) VALUES
(01, 'LOTY', 01),
(02, 'CENTRO', 01),
(03, 'SAVOY', 01),
(04, 'GRANDESP', 01),
(05, 'OASIS', 01),
(06, 'BELAS ARTES', 01),
(07, 'GUAPIRANGA', 01),
(08, 'SUARAO', 01),
(09, 'GAIVOTA', 01);

-- --------------------------------------------------------

--
-- Table structure for table `tb_carteira`
--

CREATE TABLE IF NOT EXISTS `tb_carteira` (
  `CDCARTEIRA` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `CDVACINA` int(2) unsigned zerofill NOT NULL,
  `DT_VAC_APLIC` date NOT NULL,
  `DT_PROX_DOSE` date DEFAULT NULL,
  `CDPOSTO` int(2) unsigned zerofill NOT NULL,
  `FK_PACIENTE` int(2) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`CDCARTEIRA`),
  KEY `CDVACINA` (`CDVACINA`),
  KEY `CDPOSTO` (`CDPOSTO`),
  KEY `PACIENTE_FK_CARTEIRA` (`FK_PACIENTE`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `tb_carteira`
--

INSERT INTO `tb_carteira` (`CDCARTEIRA`, `CDVACINA`, `DT_VAC_APLIC`, `DT_PROX_DOSE`, `CDPOSTO`, `FK_PACIENTE`) VALUES
(01, 01, '2022-01-05', NULL, 01, 02),
(02, 02, '2021-11-09', NULL, 05, 03),
(03, 04, '2021-11-02', NULL, 09, 06),
(06, 05, '2021-11-14', '2021-03-22', 05, 10),
(07, 01, '2019-01-05', '2021-03-22', 08, 11),
(08, 01, '2019-01-05', '2021-03-22', 08, 11),
(09, 05, '2021-11-20', '2021-03-22', 08, 11),
(10, 01, '2022-01-03', '2022-04-03', 08, 11);

-- --------------------------------------------------------

--
-- Table structure for table `tb_cidade`
--

CREATE TABLE IF NOT EXISTS `tb_cidade` (
  `CDCIDADE` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `NMCIDADE` varchar(45) NOT NULL,
  `SGESTADO` int(2) unsigned zerofill NOT NULL,
  PRIMARY KEY (`CDCIDADE`),
  KEY `SGESTADO` (`SGESTADO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tb_cidade`
--

INSERT INTO `tb_cidade` (`CDCIDADE`, `NMCIDADE`, `SGESTADO`) VALUES
(01, 'ITANHAEM', 01);

-- --------------------------------------------------------

--
-- Table structure for table `tb_estado`
--

CREATE TABLE IF NOT EXISTS `tb_estado` (
  `SGESTADO` int(2) unsigned zerofill NOT NULL,
  `NMESTADO` char(2) NOT NULL,
  PRIMARY KEY (`SGESTADO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_estado`
--

INSERT INTO `tb_estado` (`SGESTADO`, `NMESTADO`) VALUES
(01, 'SP');

-- --------------------------------------------------------

--
-- Table structure for table `tb_paciente`
--

CREATE TABLE IF NOT EXISTS `tb_paciente` (
  `CDPACIENTE` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(255) NOT NULL,
  `SENHA` varchar(55) NOT NULL,
  `TELEFONE` varchar(11) NOT NULL,
  `TELEFONE2` varchar(11) DEFAULT NULL,
  `SEXO` enum('M','F') NOT NULL,
  `NOME` varchar(255) NOT NULL,
  `ENDERECO` varchar(255) NOT NULL,
  `TPSANG` char(3) NOT NULL,
  `RG` varchar(11) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `DTNASC` date NOT NULL,
  `CDPOSTO` int(2) unsigned zerofill NOT NULL,
  `ATIVO` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`CDPACIENTE`),
  KEY `CDPOSTO` (`CDPOSTO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `tb_paciente`
--

INSERT INTO `tb_paciente` (`CDPACIENTE`, `EMAIL`, `SENHA`, `TELEFONE`, `TELEFONE2`, `SEXO`, `NOME`, `ENDERECO`, `TPSANG`, `RG`, `CPF`, `DTNASC`, `CDPOSTO`, `ATIVO`) VALUES
(01, 'paciente@email.com', 'Paciente_123', '13988776655', NULL, 'M', 'Paciente da silva', 'RUA JOSE MARIANO ALVES, 3344', 'A-', '112223334', '11122233344', '1995-01-21', 03, 1),
(02, 'jose@gmail', 'dsadsad', '12321321', '321321321', 'F', 'dasdsad', 'dsadsad', 'A+', '231213213', '32132131', '2021-11-23', 07, 1),
(03, 'jose@gmail', 'dsadsad', '12321321', '321321321', 'F', 'dasdsad', 'dsadsad', 'A+', '231213213', '321321545', '2021-11-23', 07, 1),
(04, 'jose@gmail', 'dsadsad', '12321321', '321321321', 'F', 'dasdsad', 'dsadsad', 'A+', '231213213', '3213215451', '2021-11-23', 07, 1),
(05, 'jose@gmail', '213213', '12321321', '213213', 'M', 'adsadsa', 'dsadsad', 'A+', '213213', '321321321', '2021-11-20', 06, 1),
(06, 'jose@gmail', '2132131', '213123', '3213213', 'F', 'dasdsad', 'dsadsad', 'O+', '213213', '3213213122', '2021-11-26', 01, 1),
(09, 'matheus@email', '123', '1321321321', '0', 'M', 'matheus', 'aushdaushd', 'O+', '1321321', '12312312355', '1515-01-21', 04, 1),
(10, 'adsad@sad', '123', '231213213', '0', 'M', 'qweqwe', 'ewqewqewq', 'A-', '213213123', '12312312300', '2021-11-20', 04, 1),
(11, 'deucerto@fe', '123', '13213213', '0', 'M', 'fe jose', 'aiushediusah', 'A+', '16231321', '12312312366', '1995-01-21', 08, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_posto`
--

CREATE TABLE IF NOT EXISTS `tb_posto` (
  `CDPOSTO` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `NMPOSTO` varchar(45) NOT NULL,
  `TELEFONE1` bigint(20) NOT NULL,
  `TELEFONE2` bigint(20) DEFAULT NULL,
  `ENDERECO` varchar(200) NOT NULL,
  `EMAIL` varchar(200) NOT NULL,
  `CDBAIRRO` int(2) unsigned zerofill NOT NULL,
  `CDADMIN` int(2) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`CDPOSTO`),
  KEY `CDBAIRRO` (`CDBAIRRO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `tb_posto`
--

INSERT INTO `tb_posto` (`CDPOSTO`, `NMPOSTO`, `TELEFONE1`, `TELEFONE2`, `ENDERECO`, `EMAIL`, `CDBAIRRO`, `CDADMIN`) VALUES
(01, 'USFLOTY', 1334243279, NULL, 'ALAMEDA GUARAÇAI, S/N', 'usf@loty.sp.gov.br', 01, 01),
(02, 'USFSAVOY', 1334261798, NULL, 'R. JAIME LINO DOS SANTOS, 290', 'usf@savoy.sp.gov.br', 03, 01),
(03, 'USFGUAPIRANGA', 1334265807, NULL, 'RUA VEREADOR JOAO BECHIR, 114-132', 'usf@guapiranga.sp.gov.br', 07, 01),
(04, 'USFCENTRO', 1334264685, NULL, 'AV. TIRADENTES, 97', 'usf@centro.sp.gov.br', 02, 01),
(05, 'USFGRANDESP', 1334253375, NULL, 'AV. ALEMANHA, 106', 'usf@grandesp.sp.gov.br', 04, 01),
(06, 'USFSUARAO', 1334261577, NULL, 'R. PADRE AFONSO MARIA RATISBONE, 921', 'usf@suarao.sp.gov.br', 08, 01),
(07, 'USFOASIS', 1334277533, NULL, 'R. ESTANISLEU GERONIMO, 418', 'usf@oasis.sp.gov.br', 05, 01),
(08, 'USFBELASARTES', 1334261402, NULL, 'R. ANA MARIA MARTINS RIVERA, 10', 'usf@belasartes.sp.gov.br', 06, 01),
(09, 'USFGAIVOTA', 1334291410, NULL, 'AV. FLACIDES FERREIRA, 500', 'usf@gaivota.sp.gov.br', 09, 01);

-- --------------------------------------------------------

--
-- Table structure for table `tb_vacina`
--

CREATE TABLE IF NOT EXISTS `tb_vacina` (
  `CDVACINA` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `NMVACINA` varchar(120) NOT NULL,
  `FABRICANTE` varchar(120) NOT NULL,
  `TEXTVAC` varchar(200) DEFAULT NULL,
  `CATEGVAC` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`CDVACINA`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tb_vacina`
--

INSERT INTO `tb_vacina` (`CDVACINA`, `NMVACINA`, `FABRICANTE`, `TEXTVAC`, `CATEGVAC`) VALUES
(01, 'CORONAVAC', 'SINOVAC/BUTANTAN', NULL, NULL),
(02, 'ASTRAZENECA', 'OXFORD/FIOCRUZ', NULL, NULL),
(03, 'PFIZER', 'PFIZER/BIONTECH', NULL, NULL),
(04, 'JANSSEN', 'JANSSEN-CILAG', NULL, NULL),
(05, 'SPUTNIK', 'GAMALEYA', NULL, NULL),
(06, 'COVAXIN', 'BHARAT BIOTECH', NULL, NULL),
(07, 'TESTE', 'etec', 'testando vac', 'Ao nascer');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `estoque_vac`
--
ALTER TABLE `estoque_vac`
  ADD CONSTRAINT `estoque_vac_ibfk_1` FOREIGN KEY (`CDVACINA`) REFERENCES `tb_vacina` (`CDVACINA`),
  ADD CONSTRAINT `estoque_vac_ibfk_2` FOREIGN KEY (`CDPOSTO`) REFERENCES `tb_posto` (`CDPOSTO`);

--
-- Constraints for table `tb_bairro`
--
ALTER TABLE `tb_bairro`
  ADD CONSTRAINT `tb_bairro_ibfk_1` FOREIGN KEY (`CDCIDADE`) REFERENCES `tb_cidade` (`CDCIDADE`);

--
-- Constraints for table `tb_carteira`
--
ALTER TABLE `tb_carteira`
  ADD CONSTRAINT `PACIENTE_FK_CARTEIRA` FOREIGN KEY (`FK_PACIENTE`) REFERENCES `tb_paciente` (`CDPACIENTE`),
  ADD CONSTRAINT `tb_carteira_ibfk_1` FOREIGN KEY (`CDVACINA`) REFERENCES `tb_vacina` (`CDVACINA`),
  ADD CONSTRAINT `tb_carteira_ibfk_2` FOREIGN KEY (`CDPOSTO`) REFERENCES `tb_posto` (`CDPOSTO`);

--
-- Constraints for table `tb_cidade`
--
ALTER TABLE `tb_cidade`
  ADD CONSTRAINT `tb_cidade_ibfk_1` FOREIGN KEY (`SGESTADO`) REFERENCES `tb_estado` (`SGESTADO`);

--
-- Constraints for table `tb_paciente`
--
ALTER TABLE `tb_paciente`
  ADD CONSTRAINT `tb_paciente_ibfk_1` FOREIGN KEY (`CDPOSTO`) REFERENCES `tb_posto` (`CDPOSTO`);

--
-- Constraints for table `tb_posto`
--
ALTER TABLE `tb_posto`
  ADD CONSTRAINT `tb_posto_ibfk_1` FOREIGN KEY (`CDBAIRRO`) REFERENCES `tb_bairro` (`CDBAIRRO`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
