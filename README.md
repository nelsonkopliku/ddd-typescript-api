# Cluster Node API

## Getting started

### System requirements

-   git
-   docker
-   docker-compose

## Startup

A `Makefile` provides a couple of commands

```shell
$ make
Usage:
 make [target]

Available targets:
 help:            Help
 start:           starts platform
 recreate:        destroys containers and recreates platform
```
To startup the project just run `make start`.
Wait a bit for the containers to start and then browse [http://localhost:3000/api](http://localhost:3000/api) and you should see a Swagger UI

![Screenshot](./docs/assets/img.png)

## Authentication
```text
username: john.doe
password: password
```
```shell
curl --request POST 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "john.doe",
    "password": "password"
}'
```

it will give an access token that should be used to access other APIs

```shell
{
    "access_token": "<THE GENERATED TOKEN>"
}
```

```shell
curl --request GET 'http://localhost:3000/api/v1/<some endpoint>' \
--header 'Authorization: Bearer <THE GENERATED TOKEN>'
```

<details>
  <summary>What it does</summary>

A simple API to manage nodes of computing clusters.

There are two possible types of end users for this API: an unauthenticated one, and an authenticated one. 
"Anonymous user" and "Privileged user" respectively. 
The privileged user can implicitly also do everything the anonymous user can.

- As an anonymous user, I shall be able to access The API remotely.
- As an anonymous user, I shall be able to read a list of features The API offers.
- As an anonymous user, I shall be informed when trying to use a feature that is only available to privileged users.
- As a privileged user, I shall be able to search for nodes, either by node name or by cluster name.
- As a privileged user, I shall be able to create/read/update/delete nodes.
- As a privileged user, I shall be able to issue power-on/shutdown/reboot commands to a single node.

</details>