<?php

namespace App\Entity;

use App\Repository\PieceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PieceRepository::class)]
class Piece
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $prix = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    #[ORM\Column(nullable: true)]
    private ?int $annee = null;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;

    #[ORM\ManyToOne(inversedBy: 'pieces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?marque $marque = null;

    #[ORM\ManyToOne(inversedBy: 'pieces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?modele $modele = null;

    #[ORM\ManyToOne(inversedBy: 'pieces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?categorie $categorie = null;

    #[ORM\ManyToOne(inversedBy: 'pieces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?utilisateur $vendeur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): static
    {
        $this->etat = $etat;

        return $this;
    }

    public function getAnnee(): ?int
    {
        return $this->annee;
    }

    public function setAnnee(?int $annee): static
    {
        $this->annee = $annee;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getMarque(): ?marque
    {
        return $this->marque;
    }

    public function setMarque(?marque $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getModele(): ?modele
    {
        return $this->modele;
    }

    public function setModele(?modele $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getCategorie(): ?categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getVendeur(): ?utilisateur
    {
        return $this->vendeur;
    }

    public function setVendeur(?utilisateur $vendeur): static
    {
        $this->vendeur = $vendeur;

        return $this;
    }
}
