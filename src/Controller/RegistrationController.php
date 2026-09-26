<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // 1. On récupère les données JSON envoyées par React
        $data = json_decode($request->getContent(), true);

        // 2. On vérifie que les champs obligatoires sont présents
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['nom']) || !isset($data['prenom'])) {
            return new JsonResponse(['error' => 'Champs obligatoires manquants.'], Response::HTTP_BAD_REQUEST);
        }

        // 3. On vérifie que l'email n'est pas déjà utilisé
        $existingUser = $entityManager->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'Cet email est déjà utilisé.'], Response::HTTP_CONFLICT);
        }

        // 4. On crée le nouvel utilisateur
        $user = new Utilisateur();
        $user->setEmail($data['email']);
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setAdresse($data['adresse'] ?? null);
        $user->setVille($data['ville'] ?? null);
        $user->setRole('ROLE_USER'); // On force le rôle USER (sécurité)
        $user->setDateInscription(new \DateTime());

        // 5. On hash le mot de passe avec l'outil officiel de Symfony
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        // 6. On sauvegarde en base de données
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Utilisateur créé avec succès.',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
            ]
        ], Response::HTTP_CREATED);
    }
}