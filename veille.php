<!DOCTYPE html>
<!--[if IE 8 ]><html class="no-js oldie ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>

	<!--- basic page needs
   ================================================== -->
	<meta charset="utf-8">
	<title>Veille</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- mobile specific metas
   ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- CSS
   ================================================== -->
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/vendor.css">

	<style type="text/css" media="screen">
		#styles {
			background: white;
			padding-top: 12rem;
			padding-bottom: 12rem;
		}

		#styles .row {
			max-width: 1024px;
		}

		#styles .section-intro {
			max-width: 800px;
		}
	</style>

	<!-- script
   ================================================== -->
	<script src="js/modernizr.js"></script>
	<script src="js/pace.min.js"></script>

	<!-- favicons
	================================================== -->
	<link rel="icon" type="image/png" href="favicon.png">

</head>

<body id="top">

	<!-- header 
   ================================================== -->
	<header>
		<div class="row">

			<div class="top-bar">
				<a class="menu-toggle" href="#"><span>Menu</span></a>
				<div class="logo">
					<a href="index.html">KARDS</a>
				</div>

				<nav id="main-nav-wrap">
					<ul class="main-navigation">
						<li><a class="smoothscroll" href="veille.php#intro" title="">Accueil</a></li>
						<li><a class="smoothscroll" href="veille.php#styles" title="">Veille</a></li>
						<li><a class="smoothscroll" href="#contact" title="">Contact</a></li>
						<li><a href="index.html" title="">Retour Accueil</a></li>
					</ul>
				</nav>
			</div> <!-- /top-bar -->

		</div> <!-- /row -->
	</header> <!-- /header -->

	<!-- intro section
   ================================================== -->
   <section id="intro">

<div class="intro-overlay"></div>

<div class="intro-content">
	<div class="row">

		<div class="col-twelve">

			<h5>Hello, World.</h5>
			<h1>Nils Frodé de la Forêt</h1>

			<p class="intro-position">
				<span>Étudiant developpeur</span>
				<span>BTS SIO</span>
			</p>

			<a class="button stroke smoothscroll" href="#styles" title="">Veille Technologique</a>

		</div>

	</div>
</div> <!-- /intro-content -->

<ul class="intro-social">
	<li><a href="https://github.com/Frodenils" target="_blank"><i class="fa fa-github"></i></a></li>
</ul> <!-- /intro-social -->

</section> <!-- /intro -->


	<!-- Style Demo
   ================================================== -->
	<section id="styles">

		<div class="row section-intro">

			<div class="col-twelve">

				<h1>RGPD</h1>

				<p class="lead">Le règlement général sur la protection des données (RGPD) responsabilise 
					les organismes publics et privés qui traitent leurs données.</p>



				<p class="lead">Pour m'informer sur l'actualité en rapport avec le RGPD j'utilise le <b class="term">flux RSS de la CNIL</b>, 
				<b class="term">Google alert</b> par mail, la <b class="term">newsletter de la CNIL</b> (cnil.fr) et aussi des recherches Google.</p>

				</div>
		</div> <!-- /row -->

		<div class="row section-intro">

			<div class="col-twelve tab-full">

				<?php
				$url = "https://www.cnil.fr/fr/rss.xml";
				$rss = simplexml_load_file($url);
				$i = 280;
				foreach ($rss->channel->item as $item) {
					$datetime = date_create($item->pubDate);
					$date = date_format($datetime, 'd M Y, H\hi');
					$sort1 = date_format($datetime, 'd/m/Y');
					$sort2 = '01/01/2020';
					$i++;
					if (strtotime($sort1) > strtotime($sort2)) {
						echo '<div class="blog-wrap">
            <div class="blog-card">
              <div class="blog-image">
                <img src="https://source.unsplash.com/random/420x' . $i . '/?cybersecurity" alt="" />
              </div>
              <div class="blog-content">
                <div class="blog-info">
                  <h5 class="blog-date">' . $date . '</h5>
                </div>
                <h3 class="title-sm">' . $item->title . '</h3>
                <p class="blog-text">
                ' .
							$desc = $item->description
							. '</p>
                <a href="' . $item->link . '" class="button button-primary" target="_blank">Voir</a>
				
              </div>
			  <br>
            </div>
          </div>';
					}
				}
				?>

			</div>


		</div> <!-- /row -->



	</section>
	<!--styles -->


	<!-- contact
   ================================================== -->
	<section id="contact">
		<div class="row contact-info">

<div class="col-four tab-full">

	<div class="icon">
		<i class="icon-pin"></i>
	</div>

	<h5>Ville</h5>

	<p>Avranches</p>

</div>

<div class="col-four tab-full collapse">

	<div class="icon">
		<i class="icon-mail"></i>
	</div>

	<h5>Mail de contact</h5>

	<p>nils.frd@gmail.com</p>

</div>

<div class="col-four tab-full">

	<div class="icon">
		<i class="icon-phone"></i>
	</div>

	<h5>Téléphone</h5>

	<p>07 82 81 64 34</p>

</div>

</div> <!-- /contact-info -->

</section> <!-- /contact -->


<!-- footer
================================================== -->

<footer>
<div class="row">

	<div class="col-six tab-full pull-right social">

		<ul class="footer-social">
			<li><a href="https://github.com/Frodenils" target="_blank"><i class="fa fa-github"></i></a></li>
		</ul>

	</div>

	<div class="col-six tab-full">
		<div class="copyright">
			<span>© Copyright Kards 2016.</span>
		</div>
	</div>

	<div id="go-top">
		<a class="smoothscroll" title="Back to Top" href="#top"><i class="fa fa-long-arrow-up"></i></a>
	</div>

</div> <!-- /row -->
</footer>

	<div id="preloader">
		<div id="loader"></div>
	</div>

	<!-- Java Script
   ================================================== -->
	<script src="js/jquery-2.1.3.min.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/main.js"></script>

</body>

</html>