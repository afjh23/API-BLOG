-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2024 a las 09:44:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bloggingdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Technology'),
(2, 'Health'),
(3, 'Travel'),
(4, 'Food'),
(5, 'Lifestyle'),
(6, 'Education'),
(7, 'Assasin\'s Cats');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `content`, `created_date`, `user_id`, `post_id`) VALUES
(1, 'This is a fascinating article on AI in DPI!', '2024-06-01 10:00:00', 3, 1),
(2, 'Great tips for staying healthy. Thanks for sharing!', '2024-06-02 11:00:00', 4, 2),
(3, 'I would love to visit these places!', '2024-06-03 12:00:00', 5, 3),
(4, 'These recipes look amazing. Can’t wait to try them!', '2024-06-04 13:00:00', 6, 4),
(5, 'I have been trying to adopt a minimalist lifestyle, and this article is really helpful.', '2024-06-05 14:00:00', 7, 5),
(6, 'Education is indeed the foundation of progress.', '2024-06-06 15:00:00', 8, 6),
(7, 'AI is definitely the future. Exciting times ahead!', '2024-06-01 11:00:00', 9, 1),
(8, 'I learned a lot from this post. Thanks!', '2024-06-02 12:00:00', 10, 2),
(9, 'Adding these places to my bucket list!', '2024-06-03 13:00:00', 3, 3),
(10, 'I love vegan food. Thanks for the recipes!', '2024-06-04 14:00:00', 4, 4),
(11, 'Living minimally has changed my life for the better.', '2024-06-05 15:00:00', 5, 5),
(12, 'Every child deserves access to quality education.', '2024-06-06 16:00:00', 6, 6),
(13, 'This is a fascinating article on AI!', '2024-06-01 15:00:00', 3, 1),
(14, 'This is a fascinating article on AI!', '2024-06-01 15:00:00', 3, 1),
(19, 'Feisimo', '2024-06-28 00:00:00', 1, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `content`, `image`, `created_date`, `user_id`) VALUES
(1, 'The Future of AI', 'Exploring the advancements and potential of artificial intelligence in various fields.', 'ai_future.jpg', '2024-06-01', 1),
(2, 'Healthy Living Tip\'s', 'Simple and effective tips for maintaining a healthy lifestyle.', 'healthy_living.jpg', '2024-06-02', 2),
(3, 'Top Travel Destinations 2024', 'A list of must-visit travel destinations for 2024.', 'travel_2024.jpg', '2024-06-03', 3),
(4, 'Delicious Vegan Recipes', 'Tasty and easy-to-make vegan recipes for everyone.', 'vegan_recipes.jpg', '2024-06-04', 4),
(5, 'Minimalist Lifestyle', 'How to live a fulfilling life with less.', 'minimalist_lifestyle.jpg', '2024-06-05', 5),
(6, 'The Importance of Education', 'Understanding the critical role of education in personal and societal growth.', 'education_importance.jpg', '2024-06-06', 6),
(7, 'Assassin\'s Cats', 'Cats but they are assassins', 'Assasin\'s Cats.jpg', '2024-06-24', 1),
(9, 'The Future of AI', 'Exploring the advancements and potential of artificial intelligence in various fields.', 'ai_future.jpg', '2024-06-27', 1),
(24, 'The Future of AI', 'Exploring the advancements and potential of artificial intelligence in various fields.', 'ai_future.jpg', '2024-06-27', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts_categories`
--

CREATE TABLE `posts_categories` (
  `post_category_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts_categories`
--

INSERT INTO `posts_categories` (`post_category_id`, `post_id`, `category_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 2, 5),
(8, 4, 2),
(9, 24, 1),
(10, 24, 2),
(11, 24, 3),
(12, 25, 1),
(13, 25, 2),
(14, 25, 3),
(18, 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `fname`, `lname`, `phone`, `email`, `password`, `role`, `created_date`) VALUES
(1, 'Alice', 'Smith', '1234567890', 'alice@example.com', 'password1', 'admin', '2024-01-01'),
(2, 'Bob', 'Johnson', '0987654321', 'bob@example.com', 'password2', 'admin', '2024-01-01'),
(3, 'Carol', 'Williams', '1111111111', 'carol@example.com', 'password3', 'user', '2024-01-02'),
(4, 'David', 'Brown', '2222222222', 'david@example.com', 'password4', 'user', '2024-01-02'),
(5, 'Eva', 'Jones', '3333333333', 'eva@example.com', 'password5', 'user', '2024-01-02'),
(6, 'Frank', 'Garcia', '4444444444', 'frank@example.com', 'password6', 'user', '2024-01-02'),
(7, 'Grace', 'Miller', '5555555555', 'grace@example.com', 'password7', 'user', '2024-01-02'),
(8, 'Hank', 'Martinez', '6666666666', 'hank@example.com', 'password8', 'user', '2024-01-02'),
(9, 'Ivy', 'Davis', '7777777777', 'ivy@example.com', 'password9', 'user', '2024-01-02'),
(10, 'Jack', 'Rodriguez', '8888888888', 'jack@example.com', 'password10', 'user', '2024-01-02'),
(11, 'Daniela', 'Gonzales', '5555555555', 'daniela@example.com', 'password20', 'user', '2024-01-05'),
(12, 'Ardillita', 'Gonzales', '5555555555', 'daniela@example.com', 'password20', 'user', '2024-01-05'),
(13, 'Daniela', 'Gonzales', '5555555555', 'daniela@example.com', 'password20', 'user', '2024-01-05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `posts_categories`
--
ALTER TABLE `posts_categories`
  ADD PRIMARY KEY (`post_category_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `posts_categories`
--
ALTER TABLE `posts_categories`
  MODIFY `post_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `posts_categories`
--
ALTER TABLE `posts_categories`
  ADD CONSTRAINT `posts_categories_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `posts_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
