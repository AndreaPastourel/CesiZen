<?php

namespace App\Security\Honeypot;

use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;

final class HoneypotLogger
{
    public function __construct(
        #[Autowire(service: 'monolog.logger.honeypot')]
        private readonly LoggerInterface $logger,
    ) {
    }

    public function log(Request $request, string $trap): void
    {
        $this->logger->warning('Honeypot triggered', [
            'trap' => $trap,
            'path' => $request->getPathInfo(),
            'method' => $request->getMethod(),
        ]);
    }
}