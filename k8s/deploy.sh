#!/bin/bash
set -e
IMAGE="your-dockerhub/lms-app"
VERSION=${1:-"1.0"}

echo "==> 1. Docker build & push"
docker build -t $IMAGE:$VERSION .
docker push $IMAGE:$VERSION

echo "==> 2. Namespace"
kubectl apply -f k8s/00-namespace.yaml

echo "==> 3. ConfigMap & Secret"
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-secret.yaml

echo "==> 4. PostgreSQL"
kubectl apply -f k8s/03-postgres.yaml
kubectl rollout status deployment/postgres -n lms

echo "==> 5. Redis"
kubectl apply -f k8s/04-redis.yaml
kubectl rollout status deployment/redis -n lms

echo "==> 6. Prisma migrate"
kubectl run prisma-migrate --rm -it \
  --image=$IMAGE:$VERSION \
  --restart=Never \
  --namespace=lms \
  -- npx prisma migrate deploy

echo "==> 7. LMS App"
kubectl apply -f k8s/05-lms-app.yaml
kubectl rollout status deployment/lms-app -n lms

echo "==> 8. Ingress & HPA"
kubectl apply -f k8s/06-ingress.yaml
kubectl apply -f k8s/07-hpa.yaml

echo "==> Deploy амжилттай!"
kubectl get all -n lms
