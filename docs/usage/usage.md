# **Usage**

After you cloned/forked our project from `Github`, please follow our step below:

## **Step 1 : Create custom external Docker network**

We declare default network name `iassdk` to communicate between service in Docker compose, you can create the network via command below:

```bash
$ docker network create iassdk
```

## **Step 2 : Start Docker compose with specific environment**

**Development environment**

```bash
# Stop current/previous service in docker compose file "docker-compose.dev.yml"
$ docker-compose -f docker-compose.dev.yml down -v

# Start service in docker compose file "docker-compose.dev.yml"
$ docker-compose -f docker-compose.dev.yml up --build -d
```

**Production environment**

```bash
# Stop current/previous service in docker compose file "docker-compose.prod.yml"
$ docker-compose -f docker-compose.prod.yml down -v

# Start service in docker compose file "docker-compose.prod.yml"
$ docker-compose -f docker-compose.prod.yml up --build -d
```

## **Alternative step**

Just run

```bash
# Development environment (calling "docker-compose.dev.yml")
$ sh run.sh dev

# Or 

# Production environment (calling "docker-compose.prod.yml")
$ sh run.sh prod
```

?> **note** : You can check running log via command: `$ docker-compose -f docker-compose.dev.yml logs`

## **Final step**

Enjoy with sample widget!

```http
http://localhost:3000/patient
```

?> **note** : port number `3000` is development environment
