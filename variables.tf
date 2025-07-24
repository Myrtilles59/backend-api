variable "aws_region" {
  default = "eu-north-1"
}

variable "key_name" {
  description = "Nom de la paire de clés SSH"
  type        = string
}

variable "public_key_path" {
  description = "Chemin vers la clé publique"
  type        = string
}

variable "instance_type" {
  default     = "t3.micro"
  description = "Type d'instance EC2"
}

variable "db_user" {
  type        = string
  description = "Nom d'utilisateur pour la base PostgreSQL"
}

variable "db_password" {
  type        = string
  description = "Mot de passe pour PostgreSQL"
  sensitive   = true
}

variable "db_name" {
  type        = string
  description = "Nom de la base de données"
}
