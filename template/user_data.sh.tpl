#!/bin/bash
exec > /home/ubuntu/startup.log 2>&1
set -e

# Install Docker
apt update -y
apt install -y docker.io git curl

# Add ubuntu to docker group
usermod -aG docker ubuntu

# Clone repo
cd /home/ubuntu
sudo -u ubuntu git clone https://github.com/Myrtilles59/backend-api.git || true
cd backend-api

# Créer le fichier .env
cat <<EOF > .env
DB_HOST=${db_host}
DB_PORT=5432
DB_USER=${db_user}
DB_PASS=${db_password}
DB_NAME=${db_name}
JWT_SECRET=mysuperpassword
EOF

# Build and run Docker
sudo -u ubuntu docker build -t myrtilles-api .
sudo -u ubuntu docker run -d -p 3000:3000 --env-file .env myrtilles-api
