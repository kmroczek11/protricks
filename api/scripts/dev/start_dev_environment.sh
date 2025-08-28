#!/usr/bin/env bash

USER_GROUP_ID=$(id -u):$(id -g) env docker compose -f docker-compose-dev.yml --env-file .env build --no-cache && \
USER_GROUP_ID=$(id -u):$(id -g) env docker compose -f docker-compose-dev.yml --env-file .env up --force-recreate