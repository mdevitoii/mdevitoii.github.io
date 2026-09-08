<!-- Michael DeVito II -->

<?php
	require 'vendor/autoload.php';

	$loader = new \Twig\Loader\FilesystemLoader('templates');
	$twig = new \Twig\Environment($loader);

	$posts = [
		[
			'title' => 'Hardening my first server',
			'date' => 'Sep 2026',
			'excerpt' => 'Locking down SSH and setting up fail2ban on a new Ubuntu box.',
			'slug' => 'hardening-my-first-server',
		],
		[
			'title' => 'Setting up my homelab',
			'date' => 'Aug 2026',
			'excerpt' => 'Windows Server and Linux side by side.',
			'slug' => 'setting-up-homelab',
		],
		];

	if (!is_dir('output')) {
		mkdir('output');
	}

	file_put_contents('output/index.html', $twig->render('index.twig', ['posts' => $posts]));

	echo "Built output/index.html\n";

?>
