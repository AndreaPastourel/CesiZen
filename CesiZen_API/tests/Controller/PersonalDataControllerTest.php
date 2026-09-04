<?php

namespace App\Tests\Controller;

use App\Entity\RefreshToken;
use App\Entity\UTILISATEURS;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class PersonalDataControllerTest extends WebTestCase
{
    private function loginAndGetToken(
        KernelBrowser $client,
        string $email,
        string $password
    ): string {
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
                'email' => $email,
                'motDePasse' => $password,
            ], JSON_THROW_ON_ERROR)
        );

        self::assertResponseIsSuccessful();

        $content = json_decode(
            $client->getResponse()->getContent(),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        self::assertArrayHasKey('data', $content);
        self::assertArrayHasKey('token', $content['data']);

        return $content['data']['token'];
    }

    private function authenticatedHeaders(string $token): array
    {
        return [
            'HTTP_AUTHORIZATION' => 'Bearer '.$token,
            'CONTENT_TYPE' => 'application/json',
            'HTTP_ACCEPT' => 'application/json',
        ];
    }

    public function testExportRequiresAuthentication(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/me/export');

        self::assertResponseStatusCodeSame(401);
    }

    public function testAuthenticatedUserCanExportPersonalData(): void
    {
        $client = static::createClient();

        $token = $this->loginAndGetToken(
            $client,
            'alice@cesizen.fr',
            'Password123!'
        );

        $client->request(
            'GET',
            '/api/me/export',
            [],
            [],
            $this->authenticatedHeaders($token)
        );

        self::assertResponseIsSuccessful();

        $response = $client->getResponse();

        self::assertStringContainsString(
            'application/json',
            (string) $response->headers->get('Content-Type')
        );

        self::assertStringContainsString(
            'attachment',
            (string) $response->headers->get('Content-Disposition')
        );

        self::assertStringContainsString(
            'no-store',
            (string) $response->headers->get('Cache-Control')
        );

        $content = json_decode(
            $response->getContent(),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        self::assertArrayHasKey('metadata', $content);
        self::assertArrayHasKey('profil', $content);
        self::assertArrayHasKey('journal_emotionnel', $content);

        self::assertSame(
            'alice@cesizen.fr',
            $content['profil']['email']
        );

        self::assertIsArray($content['journal_emotionnel']);

       
        self::assertArrayNotHasKey('motDePasse', $content['profil']);
        self::assertArrayNotHasKey('password', $content['profil']);
    }

    public function testAccountDeletionRequiresAuthentication(): void
    {
        $client = static::createClient();

        $client->request(
            'DELETE',
            '/api/me',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'motDePasse' => 'Password123!',
            ], JSON_THROW_ON_ERROR)
        );

        self::assertResponseStatusCodeSame(401);
    }

    public function testAuthenticatedUserCanDeleteAccount(): void
    {
        $client = static::createClient();

       
        $suffix = bin2hex(random_bytes(6));
        $email = sprintf('rgpd-%s@cesizen.test', $suffix);
        $pseudo = sprintf('rgpd-%s', $suffix);
        $password = 'Password123!';

        $client->request(
            'POST',
            '/api/register',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_ACCEPT' => 'application/json',
            ],
            json_encode([
                'email' => $email,
                'pseudo' => $pseudo,
                'motDePasse' => $password,
                'nom' => 'Test',
                'prenom' => 'RGPD',
                'telephone' => '0600000000',
            ], JSON_THROW_ON_ERROR)
        );

        self::assertResponseStatusCodeSame(201);

        $registration = json_decode(
            $client->getResponse()->getContent(),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        self::assertArrayHasKey('data', $registration);
        self::assertArrayHasKey('id', $registration['data']);

        $userId = $registration['data']['id'];

       
        $token = $this->loginAndGetToken(
            $client,
            $email,
            $password
        );

        $client->request(
            'DELETE',
            '/api/me',
            [],
            [],
            $this->authenticatedHeaders($token),
            json_encode([
                'motDePasse' => $password,
            ], JSON_THROW_ON_ERROR)
        );

        self::assertResponseIsSuccessful();

      
        $client->request(
            'GET',
            '/api/me',
            [],
            [],
            $this->authenticatedHeaders($token)
        );

        self::assertResponseStatusCodeSame(401);

        /** @var EntityManagerInterface $entityManager */
        $entityManager = static::getContainer()->get(
            EntityManagerInterface::class
        );

       
        $entityManager->clear();

        $userRepository = $entityManager->getRepository(
            UTILISATEURS::class
        );

        /** @var UTILISATEURS|null $anonymizedUser */
        $anonymizedUser = $userRepository->find($userId);

        self::assertNotNull($anonymizedUser);
        self::assertFalse($anonymizedUser->isEstActif());
        self::assertNotSame($email, $anonymizedUser->getEmail());
        self::assertNull($anonymizedUser->getNom());
        self::assertNull($anonymizedUser->getPrenom());
        self::assertNull($anonymizedUser->getTelephone());
        self::assertNull($anonymizedUser->getPhotoProfil());

       
        self::assertNull(
            $userRepository->findOneBy(['email' => $email])
        );

       
        $remainingRefreshTokens = $entityManager
            ->getRepository(RefreshToken::class)
            ->findBy(['username' => $email]);

        self::assertCount(0, $remainingRefreshTokens);

      
        $entityManager->remove($anonymizedUser);
        $entityManager->flush();
    }
}

