<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class ApiFunctionalTest extends WebTestCase
{
    private function getUserToken(KernelBrowser $client): string
    {
        $client->request(
            'POST',
            '/api/login_check',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_ACCEPT' => 'application/json',
            ],
            json_encode([
                'email' => 'alice@cesizen.fr',
                'motDePasse' => 'Password123!',
            ])
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('data', $content);
        self::assertArrayHasKey('token', $content['data']);

        return $content['data']['token'];
    }

    private function getAuthenticatedHeaders(string $token): array
    {
        return [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
            'CONTENT_TYPE' => 'application/json',
            'HTTP_ACCEPT' => 'application/json',
        ];
    }

    public function testGetRessourcesReturnsData(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/api/ressources',
            [],
            [],
            [
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testGetTypesRessourcesReturnsData(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/api/types-ressources',
            [],
            [],
            [
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testGetCategoriesRessourcesReturnsData(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/api/categories-ressources',
            [],
            [],
            [
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testGetTypesEmotionsReturnsData(): void
    {
        $client = static::createClient();

        $token = $this->getUserToken($client);

        $client->request(
            'GET',
            '/api/types-emotions',
            [],
            [],
            $this->getAuthenticatedHeaders($token)
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testGetEmotionsReturnsData(): void
    {
        $client = static::createClient();

        $token = $this->getUserToken($client);

        $client->request(
            'GET',
            '/api/emotions',
            [],
            [],
            $this->getAuthenticatedHeaders($token)
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testJournalIsProtectedWithoutToken(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/api/journal',
            [],
            [],
            [
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        self::assertResponseStatusCodeSame(401);
    }

    public function testConnectedUserCanGetJournal(): void
    {
        $client = static::createClient();

        $token = $this->getUserToken($client);

        $client->request(
            'GET',
            '/api/journal',
            [],
            [],
            $this->getAuthenticatedHeaders($token)
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertIsArray($content['data']);
    }

    public function testConnectedUserCanGetMe(): void
    {
        $client = static::createClient();

        $token = $this->getUserToken($client);

        $client->request(
            'GET',
            '/api/me',
            [],
            [],
            $this->getAuthenticatedHeaders($token)
        );

        self::assertResponseIsSuccessful();

        $content = json_decode($client->getResponse()->getContent(), true);

        self::assertArrayHasKey('message', $content);
        self::assertArrayHasKey('data', $content);
        self::assertSame('alice@cesizen.fr', $content['data']['email']);
    }

    public function testMeWithoutTokenReturnsUnauthorized(): void
    {
        $client = static::createClient();

        $client->request(
            'GET',
            '/api/me',
            [],
            [],
            [
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        self::assertResponseStatusCodeSame(401);
    }

   
       
}