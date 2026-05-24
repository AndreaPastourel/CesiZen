<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class AuthControllerTest extends WebTestCase
{

//de D'inscription incomplete
   public function testRegisterWithMissingFieldsReturnsBadRequest(): void
{
    $client = static::createClient();

    $client->request(
        'POST',
        '/api/register',
        [],
        [],
        ['CONTENT_TYPE' => 'application/json'],
        json_encode([
            'email' => '',
            'pseudo' => '',
            'motDePasse' => '',
        ])
    );

    self::assertResponseStatusCodeSame(400);

    $content = json_decode($client->getResponse()->getContent(), true);

    self::assertSame('Champs obligatoires manquant', $content['message']);
}


//Test de connexion avec des identifiants invalides
public function testLoginWithInvalidCredentialsReturnsUnauthorized(): void
{
    $client = static::createClient();

    $client->request(
        'POST',
        '/api/login_check',
        [],
        [],
        ['CONTENT_TYPE' => 'application/json'],
        json_encode([
            'email' => 'inconnu@cesizen.fr',
            'motDePasse' => 'MauvaisMotDePasse123!',
        ])
    );

    self::assertResponseStatusCodeSame(401);

    $content = json_decode($client->getResponse()->getContent(), true);

    self::assertArrayHasKey('message', $content);
    self::assertArrayHasKey('data', $content);
}


//Test d'acces à l'endpoint /api/me sans token d'authentification
public function testMeWithoutTokenReturnsUnauthorized(): void
{
    $client = static::createClient();

    $client->request('GET', '/api/me');

    self::assertResponseStatusCodeSame(401);
}
}
