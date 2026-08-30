<?php

namespace App\Controller;

use App\Security\Honeypot\HoneypotLogger;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HoneypotController
{
    public function __construct(
        private readonly HoneypotLogger $honeypotLogger,
    ) {
    }

    #[Route(
        '/wp-login.php',
        name: 'honeypot_wp_login',
        methods: ['GET', 'POST'],
        defaults: ['trap' => 'wp_login']
    )]
    #[Route(
        '/phpmyadmin',
        name: 'honeypot_phpmyadmin',
        methods: ['GET', 'POST'],
        defaults: ['trap' => 'phpmyadmin']
    )]
    #[Route(
        '/.env',
        name: 'honeypot_env',
        methods: ['GET'],
        defaults: ['trap' => 'env']
    )]
    #[Route(
        '/.git/config',
        name: 'honeypot_git_config',
        methods: ['GET'],
        defaults: ['trap' => 'git_config']
    )]
    public function trap(
        Request $request,
        string $trap,
    ): Response {
        $this->honeypotLogger->log($request, $trap);

        return new Response(
            '',
            Response::HTTP_NOT_FOUND
        );
    }
}